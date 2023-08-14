package hu.progmasters.moovsmart.dto.incoming;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.UniqueElements;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @NotNull(message = "Please enter a valid email!")
    @Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$",
            message = "The given email is invalid!")
    private String email;


    @NotNull(message = "Please enter a password!")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$",
            message = "Password must contain an uppercase character, a lowercase character, a digit, and must consist of 6-20 characters!")
    private String password;
    @NotNull(message = "Please enter your first name!")
    private String firstName;

    @NotNull(message = "Please enter your last name!")
    private String lastName;

    private String profilePicture;
}
