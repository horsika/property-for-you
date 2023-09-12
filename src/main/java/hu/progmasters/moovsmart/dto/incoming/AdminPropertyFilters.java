package hu.progmasters.moovsmart.dto.incoming;

import lombok.Data;

@Data
public class AdminPropertyFilters {

    private String timePeriod;
    private String status;
    private String listingType; //sell, rent
    private String propertyType;
    private String city;
}
