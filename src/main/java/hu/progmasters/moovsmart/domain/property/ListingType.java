package hu.progmasters.moovsmart.domain.property;

public enum ListingType {
    SELL("For sale"),
    RENT("For rent");

    private String displayName;

    ListingType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
