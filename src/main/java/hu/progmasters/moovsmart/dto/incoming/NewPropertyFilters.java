package hu.progmasters.moovsmart.dto.incoming;

import lombok.Data;

@Data
public class NewPropertyFilters {

    private String listingType; //sell, rent
    private String propertyType;
    private String city;
}
