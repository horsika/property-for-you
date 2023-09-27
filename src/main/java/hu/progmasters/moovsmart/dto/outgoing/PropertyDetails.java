package hu.progmasters.moovsmart.dto.outgoing;

import com.fasterxml.jackson.annotation.JsonFormat;
import hu.progmasters.moovsmart.domain.property.Property;
import hu.progmasters.moovsmart.domain.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class PropertyDetails {

    private long id;
    private String name;
    private Integer numberOfBedrooms;
    private double numberOfBathrooms;
    private Double price;
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
    private boolean savedByUser;
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime activatedAt;


    public PropertyDetails(Property property, User user) {
        this.id = property.getPropertyId();
        this.name = property.getName();
        this.numberOfBedrooms = property.getNumberOfBedrooms();
        this.numberOfBathrooms = property.getNumberOfBathrooms();
        this.price = property.getPrice();
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
        this.savedByUser = property.getSaverUsers().contains(user);
        this.activatedAt = property.getActivatedAt();
    }

    public PropertyDetails(Property property) {
        this.id = property.getPropertyId();
        this.name = property.getName();
        this.numberOfBedrooms = property.getNumberOfBedrooms();
        this.numberOfBathrooms = property.getNumberOfBathrooms();
        this.price = property.getPrice();
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
        this.savedByUser = false;
        this.activatedAt = property.getActivatedAt();
    }
}
