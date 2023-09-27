package hu.progmasters.moovsmart.repository;

import hu.progmasters.moovsmart.domain.premium.Message;
import hu.progmasters.moovsmart.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT DISTINCT u " +
            "FROM User u " +
            "WHERE u.id IN (" +
            "    SELECT DISTINCT m.sender.id " +
            "    FROM Message m " +
            "    WHERE m.receiver = :user" +
            ") OR u.id IN (" +
            "    SELECT DISTINCT m.receiver.id " +
            "    FROM Message m " +
            "    WHERE m.sender = :user" +
            ")")
    List<User> getUsersWhoUserHasAChatWith(@Param("user") User user);

    @Query("SELECT m " +
            "FROM Message m " +
            "WHERE (m.sender = :user1 AND m.receiver = :user2) OR (m.sender = :user2 AND m.receiver = :user1) " +
            "ORDER BY m.timestamp DESC")
    List<Message> getMessagesBetweenUsersOrderedByTime(@Param("user1") User user1, @Param("user2") User user2);


}
