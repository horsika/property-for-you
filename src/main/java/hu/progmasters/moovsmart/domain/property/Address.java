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

    private String city;

    @Column(name = "budapest_district")
    private Integer budapestDistrict;

    @Column(name = "postal_code")
    private Integer postalCode;

    @Column(name = "street_name")
    private String streetName;

    @Column(name = "house_number")
    private Integer houseNumber;

    private Integer floor;

    private String door;

    @OneToOne(mappedBy = "address")
    private Property property;

}
