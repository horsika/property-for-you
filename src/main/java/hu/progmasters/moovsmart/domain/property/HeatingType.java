package hu.progmasters.moovsmart.domain.property;

import java.util.Arrays;
import java.util.NoSuchElementException;

public enum HeatingType {
    GAS("Gas"),
    ELECTRIC("Electric"),
    CENTRAL_HEATING("Central Heating");

    private String displayName;

    HeatingType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static HeatingType getNameFromDisplayName(String displayName) {
        return Arrays.stream(HeatingType.values())
                .filter(v -> v.getDisplayName().equals(displayName))
                .findAny()
                .orElseThrow(NoSuchElementException::new);
    }
}
