package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.user.UserRole;
import hu.progmasters.moovsmart.dto.incoming.AuthenticationRequest;
import hu.progmasters.moovsmart.dto.incoming.EmailChangeForm;
import hu.progmasters.moovsmart.dto.incoming.RegisterRequest;
import hu.progmasters.moovsmart.dto.outgoing.AuthResponse;
import hu.progmasters.moovsmart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import hu.progmasters.moovsmart.domain.user.User;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public void register(RegisterRequest registerRequest) {

        var user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .passwordHash(passwordEncoder.encode(registerRequest.getPassword()))
                .profilePicture(registerRequest.getProfilePicture())
                .role(UserRole.ROlE_USER)
                .build();
        if(userRepository.findUserByEmail(user.getEmail()).isPresent()){
            throw new AuthenticationServiceException("User with given email already exists!");
        }
        userRepository.save(user);
    }

    public AuthResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getLoginEmail(),
                        request.getLoginPassword()
                )
        );

        var user = userRepository.findUserByEmail(request.getLoginEmail()).orElseThrow();

        var jwtToken = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .build();

    }

    public void changeEmail(EmailChangeForm emailChangeForm, String token) {
        if(userRepository.findUserByEmail(emailChangeForm.getEmail()).isEmpty()
        && userRepository.findUserByEmail(jwtService.extractEmail(token)).isPresent()){
           User user =  userRepository.findUserByEmail(jwtService.extractEmail(token)).orElseThrow();
           user.setEmail(emailChangeForm.getEmail());
           userRepository.save(user);
        }
    }
}
