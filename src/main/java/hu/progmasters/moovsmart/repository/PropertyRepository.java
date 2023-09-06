package hu.progmasters.moovsmart.repository;

import hu.progmasters.moovsmart.domain.property.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findAllByOrderByActivatedAtDesc();
    List<Property> findAllByActivatedAtIsNotNullOrderByActivatedAtDesc();

}
