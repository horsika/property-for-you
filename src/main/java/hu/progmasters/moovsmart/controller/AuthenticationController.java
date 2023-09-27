package hu.progmasters.moovsmart.controller;

import hu.progmasters.moovsmart.dto.incoming.*;
import hu.progmasters.moovsmart.dto.outgoing.AccountDetails;
import hu.progmasters.moovsmart.dto.outgoing.AuthResponse;
import hu.progmasters.moovsmart.dto.outgoing.EmailVerificationResponse;
import hu.progmasters.moovsmart.service.AuthenticationService;
import hu.progmasters.moovsmart.validation.AuthValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final AuthValidator authValidator;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody @Valid RegisterRequest registerRequest) {
        authenticationService.register(registerRequest);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/authentication")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return new ResponseEntity<>(authenticationService.authenticate(request), HttpStatus.OK);
    }

    @PostMapping("/change-email")
    public ResponseEntity<Void> changeEmail(@RequestBody @Valid EmailChangeForm emailChangeForm,
                                            @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        authenticationService.changeEmail(emailChangeForm, token);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/account-details")
    public ResponseEntity<AccountDetails> sendAccountDetails(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return new ResponseEntity<>(authenticationService.getAccountDetails(token), HttpStatus.OK);
    }

    @GetMapping("/{token}")
    public ResponseEntity<EmailVerificationResponse> sendEmailVerificationMessage(@PathVariable String token) {
        authenticationService.verifyEmail(token);
        EmailVerificationResponse resp = new EmailVerificationResponse();
        resp.setMessage("Your email is now verified.");
        return new ResponseEntity<>(resp, HttpStatus.OK);
    }

    @PostMapping("/change-password")
    public ResponseEntity<Void> changePassword(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                                               @RequestBody @Valid PasswordChangeForm pass) {
        authenticationService.changePassword(token, pass);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/upload-profile-pic")
    public ResponseEntity<Void> uploadProfilePic(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                                                 @RequestParam("file") @NotBlank @NotNull CommonsMultipartFile file) {
        authenticationService.saveProfilePic(token, file);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/social-authentication")
    public ResponseEntity<AuthResponse> loginUserWithSocial(@RequestBody AuthenticationRequest request) {
        return new ResponseEntity<>(authenticationService.authenticateSocial(request), HttpStatus.OK);
    }

    @PostMapping("/register-social")
    public ResponseEntity<String> registerUserWithSocial(@RequestBody @Valid SocialRegisterRequest socialRegisterRequest) {
        RegisterRequest registerRequest = new RegisterRequest();
        registerRequest.setEmail(socialRegisterRequest.getEmail());
        registerRequest.setFirstName(socialRegisterRequest.getFirstName());
        registerRequest.setLastName(socialRegisterRequest.getLastName());
        registerRequest.setProfilePicture(socialRegisterRequest.getPhotoUrl());
        registerRequest.setPassword("");
        authenticationService.register(registerRequest);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/premium-purchase")
    public ResponseEntity<AuthResponse> premiumPurchase(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                                                @RequestBody String nullable) {
        return new ResponseEntity<>(authenticationService.premiumPurchase(token), HttpStatus.OK);
    }
}
