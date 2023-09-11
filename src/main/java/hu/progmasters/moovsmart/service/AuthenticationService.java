package hu.progmasters.moovsmart.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import hu.progmasters.moovsmart.domain.user.EmailToken;
import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.domain.user.UserRole;
import hu.progmasters.moovsmart.dto.incoming.*;
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
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.persistence.EntityNotFoundException;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmailTokenService emailTokenService;
    private final Cloudinary cloudinary;

    public void register(RegisterRequest registerRequest) {

        var user = User.builder()
                .firstName(registerRequest.getFirstName())
                .lastName(registerRequest.getLastName())
                .email(registerRequest.getEmail())
                .passwordHash(passwordEncoder.encode(registerRequest.getPassword()))
                .profilePicture(registerRequest.getProfilePicture())
                .role(UserRole.ROLE_USER) // you can only register as a user
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

    public User findUserById(Long id) {
        return userRepository.findUserById(id).orElseThrow(EntityNotFoundException::new);
    }

    public void changeEmail(EmailChangeForm emailChangeForm, String token) {
        String processableToken = token.substring(7);
        if(userRepository.findUserByEmail(emailChangeForm.getEmail()).isEmpty()
        && userRepository.findUserByEmail(jwtService.extractEmail(processableToken)).isPresent()){
           User user =  userRepository.findUserByEmail(jwtService.extractEmail(processableToken)).orElseThrow(EntityNotFoundException::new);
           user.setEmail(emailChangeForm.getEmail());
           user.setEnabled(false);
           user.setProfilePicture("http://res.cloudinary.com/dai5h04h9/image/authenticated/s--psq7ZxMs--/v1694451032/profile_pic/nopic_rpcebm.jpg");
           emailTokenService.sendVerificationEmail(user);
           userRepository.save(user);
        } else {
            throw new AuthenticationServiceException("User with given email already exists!");
        }
    }

    public AccountDetails getAccountDetails(String token) {
        String processableToken = token.substring(7);
        User user = userRepository.findUserByEmail(jwtService.extractEmail(processableToken)).orElseThrow(EntityNotFoundException::new);
        return new AccountDetails(user);
    }

    public User findUserByToken(String token) {
        String processableToken = token.substring(7);
        return userRepository.findUserByEmail(jwtService.extractEmail(processableToken)).orElseThrow(EntityNotFoundException::new);
    }

    public void verifyEmail(String token) {
        EmailToken emailToken = emailTokenService.findToken(token);
        if(emailToken.getExpiryDateTime().isBefore(LocalDateTime.now())) {
            throw new ExpiredEmailVerificationTokenException("This email verification token is expired");
        }

        User userFromToken = emailToken.getUser();
        userFromToken.setEnabled(true);
    }

    public void changePassword(String token, PasswordChangeForm pass) {
        String processableToken = token.substring(7);
        User user = userRepository.findUserByEmail(jwtService.extractEmail(processableToken)).orElseThrow(EntityNotFoundException::new);
        user.setPasswordHash(passwordEncoder.encode(pass.getPassword()));
        userRepository.save(user);
    }

    public UploadResponse storeImage(CommonsMultipartFile file, String category) {
        Map params = ObjectUtils.asMap(
                "folder", category,
                "access_mode", "authenticated",
//                "access_type", "token",
                "overwrite", false,
                "type", "authenticated",
                "resource_type", "auto",
                "use_filename", true);
        UploadResponse uploadResponse;
        File fileToUpload = new File(System.getProperty("java.io.tmpdir") + '/' + file.getOriginalFilename());
        try {
            file.transferTo(fileToUpload);
            uploadResponse = new ObjectMapper()
                    .convertValue(cloudinary.uploader().upload(fileToUpload, params), UploadResponse.class);
        } catch (IOException e) {
            throw new RuntimeException();
        }

        return uploadResponse;
    }

    public void saveProfilePic(String token, CommonsMultipartFile file) {
        //ID user from token
        String processableToken = token.substring(7);
        User user = userRepository.findUserByEmail(jwtService.extractEmail(processableToken)).orElseThrow();
        //get cloudinary's response after uploading the pic
        UploadResponse response = storeImage(file, "profile_pic");
        //set into user and save
        user.setProfilePicture(response.getUrl());
        userRepository.save(user);
    }

    public List<AccountDetails> getAccountList() {
        return userRepository.findAllBy().stream().map(AccountDetails::new).collect(Collectors.toList());
    }

    public List<AccountDetails> getEnabledAccountList() {
        return userRepository.findUsersByEnabledIsTrue().stream().map(AccountDetails::new).collect(Collectors.toList());
    }

    public List<AccountDetails> getDisabledAccountList() {
        return userRepository.findUsersByEnabledIsFalse().stream().map(AccountDetails::new).collect(Collectors.toList());
    }

}
