package hu.progmasters.moovsmart.domain.user;

public enum UserRole{

    ROLE_USER("User"),
    ROLE_ADMIN("Admin"),
    ROLE_PREMIUM("Premium");

    private String displayName;

    UserRole(String displayName) {
        this.displayName = displayName;
    }
}
