package hu.progmasters.moovsmart.repository;

import hu.progmasters.moovsmart.domain.property.OpenHouse;
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

    @Query("select o from OpenHouse o where o.isActive = true order by o.property.propertyId, o.fromTime asc")
    List<OpenHouse> findAllByActiveTrueGroupByPropertyIdOrderByFromTimeAsc();

    @Query("SELECT o FROM OpenHouse o WHERE o.isActive = true AND o.fromTime < :now")
    List<OpenHouse> findExpiredOpenHouses(@Param("now") LocalDateTime currentDateTime);

}
