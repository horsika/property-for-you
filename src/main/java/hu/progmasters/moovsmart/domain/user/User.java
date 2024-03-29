package hu.progmasters.moovsmart.domain.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import hu.progmasters.moovsmart.domain.premium.Message;
import hu.progmasters.moovsmart.domain.property.Booking;
import hu.progmasters.moovsmart.domain.property.Property;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;

import java.util.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String passwordHash;

    private String firstName;

    private String lastName;

    private String profilePicture;

    @Enumerated(EnumType.STRING)
    @JoinTable(name = "account_role")
    private UserRole role;

    @ManyToMany(mappedBy = "saverUsers")
    @JsonIgnore
    private List<Property> savedProperties;

    @OneToMany(mappedBy = "ownerUser", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Property> ownedProperties;

    private boolean isEnabled;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Booking> bookings;

    @OneToMany(mappedBy = "sender")
    @JsonIgnore
    private List<Message> sentMessages;

    @OneToMany(mappedBy = "receiver")
    @JsonIgnore
    private List<Message> receivedMessages;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return this.passwordHash;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
