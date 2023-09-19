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




    public MyBookingListItem(OpenHouse openHouse) {
        this.propertyName = openHouse.getProperty().getName();
        this.fromTime = openHouse.getFromTime();
        this.toTime = openHouse.getToTime();

        Address address = openHouse.getProperty().getAddress();
        if (address != null) {
            this.propertyAddress = getAddressString(address);
        } else {
            this.propertyAddress = "";
        }

    }

    private String getAddressString(Address address) {
        return address.getPostcode() + " " +
                address.getCity() + ", " +
                address.getRoad() + " " +
                address.getHouseNumber() + ", " +
                address.getFloor() + ", " +
                address.getDoor();
    }
}
