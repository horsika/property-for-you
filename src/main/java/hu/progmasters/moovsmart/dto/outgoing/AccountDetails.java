package hu.progmasters.moovsmart.dto.outgoing;

import hu.progmasters.moovsmart.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AccountDetails {
    private String email;
    private String firstName;
    private String lastName;
    private String profilePicture;

    public AccountDetails(User user) {
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.profilePicture = user.getProfilePicture();
    }

}
