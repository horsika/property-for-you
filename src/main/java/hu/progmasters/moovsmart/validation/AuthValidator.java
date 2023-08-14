package hu.progmasters.moovsmart.validation;

import hu.progmasters.moovsmart.dto.incoming.RegisterRequest;
import hu.progmasters.moovsmart.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
@RequiredArgsConstructor
public class AuthValidator implements Validator {

    private final UserRepository userRepository;

    @Override
    public boolean supports(Class<?> clazz) {
        return RegisterRequest.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        RegisterRequest register = (RegisterRequest) target;
        if (register.getEmail() == null) {
            errors.rejectValue("email", "email.empty");
        }
        if (!register.getEmail().matches("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\\\.[A-Za-z0-9-]+)*(\\\\.[A-Za-z]{2,})$")) {
            errors.rejectValue("email", "email.invalid");
        }
        if (userRepository.findUserByEmail(register.getEmail()).isPresent()) {
            errors.rejectValue("email", "email.already.exists");
        }
        if (!register.getPassword().matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$")) {
            errors.rejectValue("password", "password.invalid");
        }
    }
}
