package hu.progmasters.moovsmart.dto.incoming;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@NoArgsConstructor
@Data
public class PropertyForm {

    @NotNull(message = "Property name cannot be empty!")
    @Size(min = 1, max = 200, message = "Property name must be between 1 and 200 characters!")
    private String name;

    @Min(value = 1, message = "Number of rooms must be between 1 and 12!")
    @Max(value = 12, message = "Number of rooms must be between 1 and 12!")
    private int numberOfBedrooms;

    private double numberOfBathrooms;

    private int price;

    private double floorArea;

    private boolean airConditioning;

    private String description;

    private double longitude;

    private double latitude;

    private List<String> images;

    private String address;

    private String propertyType;

    private String heatingType;

    private String listingStatus;

    private String listingType;
}
