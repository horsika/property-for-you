package hu.progmasters.moovsmart.domain.user;

public enum UserRole{

    ROlE_USER("User"),
    ROLE_ADMIN("Admin");

    private String displayName;

    UserRole(String displayName) {
        this.displayName = displayName;
    }
}
