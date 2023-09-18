package hu.progmasters.moovsmart.domain.property;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Long addressId;

    private Integer postcode;

    private String city;

    private String road;

    @Column(name = "house_number")
    private String houseNumber;

    private Integer floor;

    private String door;

    public Address(Integer postcode, String city, String road, String houseNumber, Integer floor, String door) {
        this.postcode = postcode;
        this.city = city;
        this.road = road;
        this.houseNumber = houseNumber;
        this.floor = floor;
        this.door = door;
    }
}
