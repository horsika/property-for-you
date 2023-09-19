package hu.progmasters.moovsmart.dto.outgoing;

import hu.progmasters.moovsmart.domain.property.Property;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
public class PropertyEditDetails {

   private Long id;
    private String name;
    private int numberOfBedrooms;
    private double numberOfBathrooms;
    private double price;
    private double floorArea;
    private boolean airConditioning;
    private String description;
    private double longitude;
    private double latitude;
    private List<String> images;
    private Integer postcode;
    private String city;
    private String road;
    private String house_number;
    private Integer floor;
    private String door;
    private String propertyType;
    private String heatingType;
    private String listingType;

    public PropertyEditDetails(Property p) {
        this.id = p.getPropertyId();
        this.name = p.getName();
        this.numberOfBedrooms = p.getNumberOfBedrooms();
        this.numberOfBathrooms = p.getNumberOfBathrooms();
        this.price = p.getPrice();
        this.floorArea = p.getFloorArea();
        this.airConditioning = p.isAirConditioning();
        this.description = p.getDescription();
        this.longitude = p.getLongitude();
        this.latitude = p.getLatitude();
        this.images = p.getImages();
        this.postcode = p.getAddress().getPostcode();
        this.city = p.getAddress().getCity();
        this.road = p.getAddress().getRoad();
        this.house_number = p.getAddress().getHouseNumber();
        this.floor = p.getAddress().getFloor();
        this.door = p.getAddress().getDoor();
        this.propertyType = String.valueOf(p.getPropertyType());
        this.heatingType = String.valueOf(p.getHeatingType());
        this.listingType = p.getListingType().getDisplayName();
    }
}
