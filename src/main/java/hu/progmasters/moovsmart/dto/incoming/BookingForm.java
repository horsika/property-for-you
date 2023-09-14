package hu.progmasters.moovsmart.dto.incoming;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class BookingForm {

    private Long bookingId;
    private Long userId;
    private Long openHouseId;


}
