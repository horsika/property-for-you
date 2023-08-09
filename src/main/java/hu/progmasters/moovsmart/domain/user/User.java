package hu.progmasters.moovsmart.domain.user;

import hu.progmasters.moovsmart.domain.property.Property;
import hu.progmasters.moovsmart.dto.incoming.UserForm;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.List;

@NoArgsConstructor
@Data
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String passwordHash;

    private String firstName;

    private String lastName;

    private String profilePicture;

    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.EAGER)
    @JoinTable(name = "account_role")
    private List<UserRole> roles;

    @OneToMany(mappedBy = "saverUser")
    private List<Property> savedProperties;

    @OneToMany(mappedBy = "ownerUser")
    private List<Property> ownedProperties;

    public User(UserForm userForm) {
        this.email = userForm.getEmail();
        this.firstName = userForm.getFirstName();
        this.lastName = userForm.getLastName();
        this.profilePicture = userForm.getProfilePicture();
        this.roles = List.of(UserRole.ROlE_USER);
    }


}
