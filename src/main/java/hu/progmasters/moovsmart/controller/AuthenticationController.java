package hu.progmasters.moovsmart.controller;

import hu.progmasters.moovsmart.dto.incoming.AuthenticationRequest;
import hu.progmasters.moovsmart.dto.incoming.RegisterRequest;
import hu.progmasters.moovsmart.dto.outgoing.AuthResponse;
import hu.progmasters.moovsmart.service.AuthenticationService;
import hu.progmasters.moovsmart.validation.AuthValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final AuthValidator authValidator;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid RegisterRequest registerRequest) {
        return new ResponseEntity<>(authenticationService.register(registerRequest), HttpStatus.OK);
    }

    @PostMapping("/authentication")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return new ResponseEntity<>(authenticationService.authenticate(request), HttpStatus.OK);
    }
}
