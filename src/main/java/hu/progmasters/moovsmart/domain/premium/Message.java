package hu.progmasters.moovsmart.domain.premium;

import hu.progmasters.moovsmart.domain.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;
    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;
    @Column(columnDefinition = "TEXT")
    private String message;
    @Column(name = "timestamp")
    private LocalDateTime timestamp;

    public Message(User meSender, User partnerReceiver, String message) {
        this.sender = meSender;
        this.receiver = partnerReceiver;
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }

}
