package hu.progmasters.moovsmart.dto.incoming;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@NoArgsConstructor
@Data
public class PropertyForm {

    @NotNull(message = "Property name cannot be empty!")
    @Size(min = 1, max = 200, message = "Property name must be between 1 and 200 characters!")
    private String name;

    private int numberOfBedrooms;

    private double numberOfBathrooms;

    private double price;

    private double floorArea;

    private boolean airConditioning;

    private String description;

    private double longitude;

    private double latitude;

    private String images;

    private String address;

    private String propertyType;

    private String heatingType;

    private String listingStatus;

    private String listingType;
}
