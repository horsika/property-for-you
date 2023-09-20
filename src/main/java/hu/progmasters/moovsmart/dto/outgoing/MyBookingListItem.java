package hu.progmasters.moovsmart.dto.outgoing;

import com.fasterxml.jackson.annotation.JsonFormat;
import hu.progmasters.moovsmart.domain.property.Address;
import hu.progmasters.moovsmart.domain.property.OpenHouse;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class MyBookingListItem {

    private String propertyName;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime fromTime;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime toTime;

    private String propertyAddress;

    private int sumPlacesBooked;

    private double longitude;

    private double latitude;
    private Long propertyId;
    private String image;
    private Double price;
    private double floorArea;




    public MyBookingListItem(OpenHouse openHouse, int sumPlacesBooked) {
        this.propertyName = openHouse.getProperty().getName();
        this.fromTime = openHouse.getFromTime();
        this.toTime = openHouse.getToTime();

        Address address = openHouse.getProperty().getAddress();
        if (address != null) {
            this.propertyAddress = getAddressString(address);
        } else {
            this.propertyAddress = "";
        }

        this.sumPlacesBooked = sumPlacesBooked;
        this.longitude = openHouse.getProperty().getLongitude();
        this.latitude = openHouse.getProperty().getLatitude();
        this.propertyId = openHouse.getProperty().getPropertyId();
        this.image = openHouse.getProperty().getImages().get(0);
        this.price = openHouse.getProperty().getPrice();
        this.floorArea = openHouse.getProperty().getFloorArea();

    }

    private String getAddressString(Address address) {

        StringBuilder addressString = new StringBuilder();

        if (address.getPostcode() != null) {
            addressString.append(address.getPostcode()).append(" ");
        }
        if (address.getCity() != null) {
            addressString.append(address.getCity()).append(", ");
        }
        if (address.getCity() != null) {
            addressString.append(address.getRoad()).append(" ");
        }
        if (address.getHouseNumber() != null) {
            addressString.append(address.getHouseNumber()).append(". ");
        }
        if (address.getFloor() != null) {
            addressString.append(address.getFloor()).append("/");
        }
        if (address.getDoor() != null) {
            addressString.append(address.getDoor()).append(".");
        }

        return addressString.toString().trim();
    }
}
