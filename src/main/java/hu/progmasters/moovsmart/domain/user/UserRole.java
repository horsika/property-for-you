package hu.progmasters.moovsmart.domain.user;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole{

    ROlE_USER("User"),
    ROLE_ADMIN("Admin");

    private String displayName;

    UserRole(String displayName) {
        this.displayName = displayName;
    }
}
