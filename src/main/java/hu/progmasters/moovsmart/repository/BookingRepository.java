package hu.progmasters.moovsmart.repository;

import hu.progmasters.moovsmart.domain.property.Booking;
import hu.progmasters.moovsmart.domain.property.OpenHouse;
import hu.progmasters.moovsmart.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {


}
