package hu.progmasters.moovsmart.dto.incoming;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserForm {

    private String email;

    private String password;

    private String firstName;

    private String lastName;

    private String profilePicture;

}
