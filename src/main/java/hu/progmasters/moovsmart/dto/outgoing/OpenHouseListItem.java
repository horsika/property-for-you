package hu.progmasters.moovsmart.dto.outgoing;

import com.fasterxml.jackson.annotation.JsonFormat;
import hu.progmasters.moovsmart.domain.property.OpenHouse;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class OpenHouseListItem {

    private Long openHouseId;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime fromTime;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime toTime;
    private int maxParticipants;
    private int currentParticipants;

    private Long propertyId;

    public OpenHouseListItem(OpenHouse openHouse) {
        this.openHouseId = openHouse.getOpenHouseId();
        this.fromTime = openHouse.getFromTime();
        this.toTime = openHouse.getToTime();
        this.maxParticipants = openHouse.getMaxParticipants();
        this.currentParticipants = openHouse.getCurrentParticipants();
        this.propertyId = openHouse.getProperty().getPropertyId();
    }
}
