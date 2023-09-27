package hu.progmasters.moovsmart.repository;

import hu.progmasters.moovsmart.domain.property.OpenHouse;
import hu.progmasters.moovsmart.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OpenHouseRepository extends JpaRepository<OpenHouse, Long> {


    @Query("select o from OpenHouse o where o.isActive = true order by o.fromTime asc")
    List<OpenHouse> findAllByActiveTrueOrderByFromTimeAsc();

    @Query("select o from OpenHouse o where o.isActive = true and o.maxParticipants > o.currentParticipants order by o.property.propertyId, o.fromTime asc")
    List<OpenHouse> findAllByActiveTrueGroupByPropertyIdOrderByFromTimeAsc();

    @Query("SELECT o FROM OpenHouse o WHERE o.isActive = true AND o.fromTime < :now")
    List<OpenHouse> findExpiredOpenHouses(@Param("now") LocalDateTime currentDateTime);

    @Query("SELECT o FROM OpenHouse o " +
            "INNER JOIN Property p ON o.property.propertyId = p.propertyId " +
            "LEFT JOIN Booking b ON o.openHouseId = b.openHouse.openHouseId " +
            "WHERE o.isActive = true AND p.ownerUser = :user " +
            "GROUP BY o " +
            "ORDER BY p.name asc, o.fromTime asc")
    List<OpenHouse> findAllMyOpenHouses(@Param("user") User user);

    @Query("SELECT o FROM OpenHouse o " +
            "INNER JOIN o.property p " +
            "INNER JOIN o.bookings b " +
            "WHERE o.isActive = true AND b.user = :user " +
            "GROUP BY o " +
            "ORDER BY o.fromTime asc")
    List<OpenHouse> findAllMyBookings(@Param("user") User user);

    @Query("SELECT o, u FROM OpenHouse o " +
            "INNER JOIN Property p ON o.property.propertyId = p.propertyId " +
            "LEFT JOIN Booking b ON o.openHouseId = b.openHouse.openHouseId " +
            "LEFT JOIN User u ON b.user.id = u.id " +
            "WHERE o.isActive = true AND p.ownerUser = :user " +
            "GROUP BY o, u " +
            "ORDER BY p.name asc, o.fromTime asc")
    List<OpenHouse> findAllMyParticipants(@Param("user") User user);


    @Query("SELECT o, p.ownerUser FROM OpenHouse o " +
            "INNER JOIN o.property p " +
            "WHERE o.isActive = true")
    List<Object[]> findAllOpenHousesWithOwners();


}
