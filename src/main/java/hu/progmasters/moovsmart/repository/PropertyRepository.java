package hu.progmasters.moovsmart.repository;

import hu.progmasters.moovsmart.domain.property.Property;
import hu.progmasters.moovsmart.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findAllByOrderByActivatedAtDesc();

    @Query("select p from Property p where p.listingStatus = 'ACTIVE' order by p.activatedAt desc")
    List<Property> findAllWhereListingStatusLikeActiveOrderByActivatedAtDesc();

    List<Property> findByOwnerUserOrderByListingStatus(User user);


    @Query("select p from Property p where p.listingStatus = 'ACTIVE' and p.activatedAt <= :pastDateTime order by p.activatedAt desc")
    List<Property> findAllActiveForFiveDaysOrMore(@Param("pastDateTime") LocalDateTime pastDateTime);

}
