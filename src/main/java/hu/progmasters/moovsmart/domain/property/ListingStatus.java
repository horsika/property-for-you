package hu.progmasters.moovsmart.domain.property;

public enum ListingStatus {
    INACTIVE("Inactive"),
    ACTIVE("Active"),
    ARCHIVED("Archived");

    private String displayName;

    ListingStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
