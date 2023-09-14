package hu.progmasters.moovsmart.domain.property;

import hu.progmasters.moovsmart.domain.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Data
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "user_id")
    private Long userId;
    @Column(name = "openHouse_id")
    private Long openHouseId;

    public Booking(User user, OpenHouse openHouse) {
        this.userId = user.getId();
        this.openHouseId = openHouse.getOpenHouseId();
    }
}
