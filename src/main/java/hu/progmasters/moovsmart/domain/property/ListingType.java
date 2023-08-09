package hu.progmasters.moovsmart.domain.property;

public enum ListingType {
    SELL("For Sale"),
    RENT("To Rent");

    private String displayName;

    ListingType(String displayName) {
        this.displayName = displayName;
    }
}
