package hu.progmasters.moovsmart.dto.outgoing;

import com.fasterxml.jackson.annotation.JsonFormat;
import hu.progmasters.moovsmart.domain.property.Booking;
import hu.progmasters.moovsmart.domain.property.OpenHouse;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.aspectj.apache.bcel.classfile.Module;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class MyOpenHouseListItem {

    private String propertyName;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime fromTime;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime toTime;
    private int maxParticipants;

    private int sumPlacesBooked;


    public MyOpenHouseListItem(OpenHouse openHouse, int sumPlacesBooked) {
        this.propertyName = openHouse.getProperty().getName();
        this.fromTime = openHouse.getFromTime();
        this.toTime = openHouse.getToTime();
        this.maxParticipants = openHouse.getMaxParticipants();
        this.sumPlacesBooked = sumPlacesBooked;

    }
}
