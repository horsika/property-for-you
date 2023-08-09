package hu.progmasters.moovsmart.domain.property;

public enum HeatingType {
    GAS("Gas"),
    ELECTRIC("Electric"),
    CENTRAL_HEATING("Central Heating");

    private String displayName;

    HeatingType(String displayName) {
        this.displayName = displayName;
    }
}
