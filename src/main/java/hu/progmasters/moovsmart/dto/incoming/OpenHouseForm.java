package hu.progmasters.moovsmart.dto.incoming;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class OpenHouseForm {

    private Long propertyId;

    private LocalDateTime fromTime;

    private LocalDateTime toTime;
    private int maxParticipants;
    private int currentParticipants;

}
