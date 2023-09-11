package hu.progmasters.moovsmart.repository;

import hu.progmasters.moovsmart.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByEmail(String email);

    Optional<User> findUserById(Long id);

    List<User> findAllBy();

    List<User> findUsersByEnabledIsTrue();

    List<User> findUsersByEnabledIsFalse();
}
