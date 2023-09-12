package hu.progmasters.moovsmart.dto.outgoing;

import hu.progmasters.moovsmart.domain.property.Property;
import hu.progmasters.moovsmart.domain.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

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

    private User owner;
    private LocalDateTime createdAt;

    public MyPropertyListItem(Property property) {
        this.propertyId = property.getPropertyId();
        this.name = property.getName();
        this.propertyTypeDisplayName = property.getPropertyType().getDisplayName();
        this.firstImage = property.getImages().get(0);
        this.city = property.getAddress().getCity();
        this.listingTypeDisplayName = property.getListingType().getDisplayName();
        this.price = property.getPriceHistory().get(0);
        this.isActiveDisplayName = property.getListingStatus().getDisplayName();
        this.owner = property.getOwnerUser();
        this.createdAt = property.getCreatedAt();
    }
}
