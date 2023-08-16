package hu.progmasters.moovsmart.domain.property;

public enum PropertyType {
    HOUSE("House"),
    MULTI_FAMILY("Multi-family house"),
    APARTMENT("Apartment"),
    CONDO("Condo"),
    ROW_HOUSE("Row house"),
    SUMMER_HOUSE("Summer house");

    private String displayName;

    PropertyType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

}
