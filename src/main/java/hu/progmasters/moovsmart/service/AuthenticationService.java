package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.user.EmailToken;
import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.domain.user.UserRole;
import hu.progmasters.moovsmart.dto.incoming.AuthenticationRequest;
import hu.progmasters.moovsmart.dto.incoming.EmailChangeForm;
import hu.progmasters.moovsmart.dto.incoming.RegisterRequest;
import hu.progmasters.moovsmart.dto.outgoing.AccountDetails;
import hu.progmasters.moovsmart.dto.outgoing.AuthResponse;
import hu.progmasters.moovsmart.exception.ExpiredEmailVerificationTokenException;
import hu.progmasters.moovsmart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailTokenService emailTokenService;

    public void register(RegisterRequest registerRequest) {

        var user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .passwordHash(passwordEncoder.encode(registerRequest.getPassword()))
                .profilePicture(registerRequest.getProfilePicture())
                .role(UserRole.ROlE_USER)
                .isEnabled(false)
                .build();

        if(userRepository.findUserByEmail(user.getEmail()).isPresent()){
            throw new AuthenticationServiceException("User with given email already exists!");
        }

        userRepository.save(user);

        emailTokenService.sendVerificationEmail(user);
    }

    public AuthResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getLoginEmail(),
                        request.getLoginPassword()
                )
        );

        var user = userRepository.findUserByEmail(request.getLoginEmail()).orElseThrow();

        if(!user.isEnabled()) {
            throw new DisabledException("This account is currently disabled.");
        }
        var jwtToken = jwtService.generateToken(user);
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email).orElseThrow(EntityNotFoundException::new);
    }

    public void changeEmail(EmailChangeForm emailChangeForm, String token) {
        String processableToken = token.substring(7);
        if(userRepository.findUserByEmail(emailChangeForm.getEmail()).isEmpty()
        && userRepository.findUserByEmail(jwtService.extractEmail(processableToken)).isPresent()){
           User user =  userRepository.findUserByEmail(jwtService.extractEmail(processableToken)).orElseThrow();
           user.setEmail(emailChangeForm.getEmail());
           user.setEnabled(false);
           emailTokenService.sendVerificationEmail(user);
           userRepository.save(user);
        } else {
            throw new AuthenticationServiceException("User with given email already exists!");
        }
    }

    public AccountDetails getAccountDetails(String token) {
        String processableToken = token.substring(7);
        User user = userRepository.findUserByEmail(jwtService.extractEmail(processableToken)).orElseThrow();
        return new AccountDetails(user);
    }

    public void verifyEmail(String token) {
        EmailToken emailToken = emailTokenService.findToken(token);
        if(emailToken.getExpiryDateTime().isBefore(LocalDateTime.now())) {
            throw new ExpiredEmailVerificationTokenException("This email verification token is expired");
        }

        User userFromToken = emailToken.getUser();
        userFromToken.setEnabled(true);
    }
}
