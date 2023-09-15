package hu.progmasters.moovsmart.domain.property;

import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.service.OpenHouseService;
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

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;


    @ManyToOne
    @JoinColumn(name="openHouse_id")
    private OpenHouse openHouse;

    @Column
    private int placesToBook;

    public Booking(User user, OpenHouse openHouse, int placesToBook) {
        this.user = user;
        this.openHouse = openHouse;
        this.placesToBook = placesToBook;
    }
}
