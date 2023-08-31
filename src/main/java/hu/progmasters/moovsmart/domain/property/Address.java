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

    public Address(String address) {
        String[] split = address.split(" ");
        this.postalCode = Integer.parseInt(split[0]);
        this.city = split[1];
        if (split[1].equalsIgnoreCase("Budapest") || split[1].equalsIgnoreCase("bp")) {
            this.budapestDistrict = Integer.parseInt(split[0].substring(1, 3));
        }

        StringBuilder sb = new StringBuilder();
        int i = 2;
        while (!split[i].equals("utca") && !split[i].equals("út") && !split[i].equals("tér") && !split[i].equals("köz")) {
            sb.append(split[i]).append(" ");
            i++;
        }
        sb.append(split[i++]);
        this.streetName = sb.toString();

        this.houseNumber = Integer.parseInt(split[i]);
    }

    @Override
    public String toString() {
        return postalCode + " " +
                city + " " +
                budapestDistrict + " " +
                streetName + " " +
                houseNumber + " " +
                floor + " " +
                door;
    }
}
