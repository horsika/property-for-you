package hu.progmasters.moovsmart.dto.outgoing;

import hu.progmasters.moovsmart.domain.property.Property;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PropertyDetails {

    private long id;
    private String name;
    private Integer numberOfBedrooms;
    private double numberOfBathrooms;
    private List<Double> priceHistory;
    private double floorArea;
    private boolean airConditioning;
    private List<String> images;
    private String description;
    private String propertyType;
    private String heatingType;
    private String listingStatus;
    private String listingType;
    private String address;
    private Double latitude;
    private Double longitude;

    public PropertyDetails(Property property) {
        this.id = property.getPropertyId();
        this.name = property.getName();
        this.numberOfBedrooms = property.getNumberOfBedrooms();
        this.numberOfBathrooms = property.getNumberOfBathrooms();
        this.priceHistory = property.getPriceHistory();
        this.floorArea = property.getFloorArea();
        this.airConditioning = property.isAirConditioning();
        this.images = property.getImages();
        this.description = property.getDescription();
        this.propertyType = property.getPropertyType().getDisplayName();
        this.heatingType = property.getHeatingType().getDisplayName();
        this.listingStatus = property.getListingStatus().getDisplayName();
        this.listingType = property.getListingType().getDisplayName();
        this.address = property.getAddress().toString();
        this.latitude = property.getLatitude();
        this.longitude = property.getLongitude();
    }
}
