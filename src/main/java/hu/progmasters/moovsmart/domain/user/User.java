package hu.progmasters.moovsmart.domain.user;

import hu.progmasters.moovsmart.domain.property.Property;

import javax.persistence.*;

import java.util.List;

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

    private UserRole role;

    @OneToMany(mappedBy = "saverUser")
    private List<Property> savedProperties;

    @OneToMany(mappedBy = "ownerUser")
    private List<Property> ownedProperties;


}
