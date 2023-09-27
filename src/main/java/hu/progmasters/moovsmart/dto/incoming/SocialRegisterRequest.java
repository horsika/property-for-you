package hu.progmasters.moovsmart.dto.incoming;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
public class SocialRegisterRequest {
    @NotNull
    String email;
    @NotNull
    String firstName;
    @NotNull
    String lastName;
    String photoUrl;
}
