package hu.progmasters.moovsmart.repository;

import hu.progmasters.moovsmart.domain.user.EmailToken;
import hu.progmasters.moovsmart.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailTokenRepository extends JpaRepository<EmailToken, Long> {

    Optional<EmailToken> findEmailTokenByToken(String token);
}
