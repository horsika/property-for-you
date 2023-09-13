package hu.progmasters.moovsmart.repository;

import hu.progmasters.moovsmart.domain.property.OpenHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OpenHouseRepository extends JpaRepository<OpenHouse, Long> {


    @Query("select o from OpenHouse o where o.isActive = true order by o.fromTime asc")
    List<OpenHouse> findAllByActiveTrueOrderByFromTimeAsc();

}
