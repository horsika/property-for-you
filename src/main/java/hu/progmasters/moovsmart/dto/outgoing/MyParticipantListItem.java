package hu.progmasters.moovsmart.dto.outgoing;

import com.fasterxml.jackson.annotation.JsonFormat;
import hu.progmasters.moovsmart.domain.property.OpenHouse;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class MyParticipantListItem {

    private String propertyName;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime fromTime;

    private int sumPlacesBooked;
    private String firstName;
    private String lastName;
    private String email;



    public MyParticipantListItem(OpenHouse openHouse, int sumPlacesBooked) {
        this.propertyName = openHouse.getProperty().getName();
        this.fromTime = openHouse.getFromTime();
        this.sumPlacesBooked = sumPlacesBooked;

    }
}
