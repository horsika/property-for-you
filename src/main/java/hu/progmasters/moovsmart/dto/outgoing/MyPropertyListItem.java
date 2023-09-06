package hu.progmasters.moovsmart.dto.outgoing;

import hu.progmasters.moovsmart.domain.property.Property;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MyPropertyListItem {

    private long propertyId;

    private String name;

    private String propertyTypeDisplayName;

    private String firstImage;

    private String city;

    private String listingTypeDisplayName;

    private double price;

    private String isActiveDisplayName;

    public MyPropertyListItem(Property property) {
        this.propertyId = property.getPropertyId();
        this.name = property.getName();
        this.propertyTypeDisplayName = property.getPropertyType().getDisplayName();
        this.firstImage = property.getImages().get(0);
        this.city = property.getAddress().getCity();
        this.listingTypeDisplayName = property.getListingType().getDisplayName();
        this.price = property.getPriceHistory().get(0);
        this.isActiveDisplayName = property.getListingStatus().getDisplayName();
    }
}
