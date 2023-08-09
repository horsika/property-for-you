package hu.progmasters.moovsmart.validation;

import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.dto.incoming.UserForm;
import hu.progmasters.moovsmart.repository.UserRepository;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
@Component
public class UserFormValidator implements Validator {

    private final UserRepository userRepository;

    public UserFormValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return UserForm.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        UserForm userForm = (UserForm) target;
        User user = userRepository.findUserByEmail(userForm.getEmail()).orElse(null);
        if(user != null){
            errors.rejectValue("email", "user.already.exists");
        }

    }
}
