package hu.progmasters.moovsmart.domain.property;

import java.util.Arrays;
import java.util.NoSuchElementException;

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

    public static PropertyType getNameFromDisplayName(String displayName) {
        return Arrays.stream(PropertyType.values())
                .filter(v -> v.getDisplayName().equals(displayName))
                .findFirst()
                .orElseThrow(NoSuchElementException::new);
    }
}
