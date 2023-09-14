package hu.progmasters.moovsmart.repository;

import hu.progmasters.moovsmart.domain.property.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {



}
