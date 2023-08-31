package hu.progmasters.moovsmart.domain.property;

import java.util.Arrays;
import java.util.NoSuchElementException;

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

    public static ListingType getNameFromDisplayName(String displayName) {
        return Arrays.stream(ListingType.values())
                .filter(v -> v.getDisplayName().equals(displayName))
                .findAny()
                .orElseThrow(NoSuchElementException::new);
    }
}
