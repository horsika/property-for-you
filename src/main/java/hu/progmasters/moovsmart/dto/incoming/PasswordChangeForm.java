package hu.progmasters.moovsmart.dto.incoming;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
public class PasswordChangeForm {
    @NotNull(message = "Please enter a password!")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$",
            message = "Password must contain an uppercase character, a lowercase character, a digit, and must consist of 6-20 characters!")
    private String password;
}
