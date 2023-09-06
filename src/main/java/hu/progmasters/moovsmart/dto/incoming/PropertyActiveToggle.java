package hu.progmasters.moovsmart.dto.incoming;

import lombok.Data;

@Data
public class PropertyActiveToggle {
    private Long propertyId;
    private String listingStatus;
}
