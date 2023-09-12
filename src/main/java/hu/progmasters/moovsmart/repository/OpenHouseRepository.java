package hu.progmasters.moovsmart.repository;

import hu.progmasters.moovsmart.domain.property.OpenHouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpenHouseRepository extends JpaRepository<OpenHouse, Long> {


}
