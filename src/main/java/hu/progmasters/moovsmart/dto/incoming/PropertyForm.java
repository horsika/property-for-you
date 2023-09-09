package hu.progmasters.moovsmart.dto.incoming;

import hu.progmasters.moovsmart.validation.DivisibleByHalf;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.validation.constraints.*;
import java.util.List;

@NoArgsConstructor
@Data
public class PropertyForm {
    @NotNull(message = "Please enter a valid property name.")
    @Size(min = 3, max = 30, message = "Please enter a valid property name.")
    private String name;

    @NotNull(message = "Please enter a valid number of bedrooms.")
    @Min(value = 1, message = "The number of bedrooms must be at least 1.")
    @Max(value = 12, message = "The number of bedrooms must be less than 13.")
    private int numberOfBedrooms;

    @NotNull(message = "Please enter a valid number of bathrooms.")
    @Min(value = 1, message = "The number of bathrooms must be at least 1.")
    @Max(value = 12, message = "The number of bathrooms must be less than 13.")
    @DivisibleByHalf(message = "Please enter the number of bathrooms divisible by 0.5.")
    private double numberOfBathrooms;

    @NotNull(message = "Please enter a valid price.")
    @DecimalMin(value = "0.1", message = "Please enter a valid property price.")
    private double price;

    @NotNull(message = "Please enter a valid floor area.")
    @Min(value = 5, message = "Please enter a valid floor area.")
    private double floorArea;

    @NotNull(message = "Please enter if there's air conditioning in the property.")
    private boolean airConditioning;

    @NotNull(message = "Please enter a valid property description.")
    private String description;

    private double longitude;

    private double latitude;

    private List<CommonsMultipartFile> images;

    @NotNull(message = "Please enter a valid property address.")
    private String address;

    @NotNull(message = "Please enter a valid property type.")
    @Size(min = 1, message = "Please enter a valid property type.")
    private String propertyType;

    @NotNull(message = "Please enter a valid heating type.")
    private String heatingType;

    @NotNull(message = "Please enter a valid listing status.")
    private String listingStatus;

    @NotNull(message = "Please enter a valid listing type.")
    private String listingType;

    @Override
    public String toString() {
        return "PropertyForm{" +
                "name='" + name + '\'' +
                ", numberOfBedrooms=" + numberOfBedrooms +
                ", numberOfBathrooms=" + numberOfBathrooms +
                ", price=" + price +
                ", floorArea=" + floorArea +
                ", airConditioning=" + airConditioning +
                ", description='" + description + '\'' +
                ", longitude=" + longitude +
                ", latitude=" + latitude +
                ", images=" + images +
                ", address='" + address + '\'' +
                ", propertyType='" + propertyType + '\'' +
                ", heatingType='" + heatingType + '\'' +
                ", listingStatus='" + listingStatus + '\'' +
                ", listingType='" + listingType + '\'' +
                '}';
    }
}
