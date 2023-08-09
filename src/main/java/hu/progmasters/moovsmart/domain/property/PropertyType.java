package hu.progmasters.moovsmart.domain.property;

public enum PropertyType {
    HOUSE("House"),
    MULTI_FAMILY("Multi Family Home"),
    APARTMENT("Apartment"),
    CONDO("Condo"),
    ROW_HOUSE("Row House"),
    SUMMER_HOUSE("Summer House");

    private String displayName;

    PropertyType(String displayName) {
        this.displayName = displayName;
    }
}
