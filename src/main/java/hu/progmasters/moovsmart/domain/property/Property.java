package hu.progmasters.moovsmart.domain.property;

import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.dto.incoming.PropertyForm;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "property_id")
    private Long propertyId;

    @NotNull
    @Size(min = 1, max = 200)
    private String name;

    @Min(value = 1)
    @Max(value = 12)
    @Column(name = "number_of_bedrooms")
    private Integer numberOfBedrooms;

    @ElementCollection
    @CollectionTable(name = "price_history")
    private List<Double> priceHistory;

    @Column(name = "floor_area")
    private double floorArea;

    @Column(name = "number_of_bathrooms")
    private double numberOfBathrooms;

    @Column(name = "air_conditioning")
    private boolean airConditioning;

    @ElementCollection
    @CollectionTable
    private List<String> images;

    private double longitude;

    private double latitude;

    @Column(name = "property_uuid")
    private String propertyUUID;


    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @Enumerated(EnumType.STRING)
    @Column(name = "property_type")
    private PropertyType propertyType;

    @Enumerated(EnumType.STRING)
    @Column(name = "heating_type")
    private HeatingType heatingType;

    @Enumerated(EnumType.STRING)
    @Column(name = "listing_status")
    private ListingStatus listingStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "listing_type")
    private ListingType listingType;

    @ManyToOne
    @JoinColumn(name = "saver_user_id")
    private User saverUser;

    @ManyToOne
    @JoinColumn(name = "owner_user_id")
    private User ownerUser;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column
    private LocalDateTime activatedAt = LocalDateTime.now();
    @Column
    private LocalDateTime archivedAt;


    public Property(PropertyForm propertyForm) {
        this.name = propertyForm.getName();
        this.numberOfBathrooms = propertyForm.getNumberOfBathrooms();
        this.numberOfBedrooms = propertyForm.getNumberOfBedrooms();
        this.priceHistory = List.of(propertyForm.getPrice());
        this.floorArea = propertyForm.getFloorArea();
        this.airConditioning = propertyForm.isAirConditioning();
        this.images = List.of(propertyForm.getImages().replace(" ", "").split(";"));
        this.description = propertyForm.getDescription();
        this.address = new Address(propertyForm.getAddress());
        this.propertyType = PropertyType.valueOf(propertyForm.getPropertyType());
        this.heatingType = HeatingType.valueOf(propertyForm.getHeatingType());
        this.listingStatus = ListingStatus.ACTIVE;
        this.listingType = ListingType.getNameFromDisplayName(propertyForm.getListingType());
    }
}
