package hu.progmasters.moovsmart.dto.incoming;

import lombok.Data;

@Data
public class AddToFavs {
    private Long propertyId;
    private boolean added;
}
