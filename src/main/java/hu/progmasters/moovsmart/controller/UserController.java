package hu.progmasters.moovsmart.controller;

import hu.progmasters.moovsmart.dto.incoming.UserForm;
import hu.progmasters.moovsmart.service.UserService;
import hu.progmasters.moovsmart.validation.UserFormValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserFormValidator userFormValidator;

    public UserController(UserService userService, UserFormValidator userFormValidator) {
        this.userService = userService;
        this.userFormValidator = userFormValidator;
    }

    @InitBinder("userForm")
    public void initBinder(WebDataBinder binder) {
        binder.addValidators(userFormValidator);
    }

    @PostMapping("/register")
    public ResponseEntity<String> receiveRegistration(@RequestBody @Valid UserForm userForm) {
        userService.registerUser(userForm);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<String> login() {
        return new ResponseEntity<>("Now, you are logged in. :-)", HttpStatus.OK);
    }
}
