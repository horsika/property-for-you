package hu.progmasters.moovsmart.domain.property;


import hu.progmasters.moovsmart.dto.incoming.OpenHouseForm;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class OpenHouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "openHouse_id")
    private Long openHouseId;

    @ManyToOne
    @JoinColumn(name = "property_id")
    private Property property;

    @Column
    private LocalDateTime fromTime;

    @Column
    private LocalDateTime toTime;

    @Column
    private int maxParticipants;

    @Column
    private int currentParticipants;

    @Column
    private LocalDateTime createdAt;
    private Boolean isActive;


    public OpenHouse(OpenHouseForm openHouseForm, Property property) {
        this.property = property;
        this.fromTime = openHouseForm.getFromTime();
        this.toTime = openHouseForm.getToTime();
        this.maxParticipants = openHouseForm.getMaxParticipants();
        this.currentParticipants = 0;
        this.createdAt = LocalDateTime.now();
        this.isActive = true;
    }
}
