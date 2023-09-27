package hu.progmasters.moovsmart.dto.outgoing;

import hu.progmasters.moovsmart.domain.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class ChatDetails {

    private Long partnerId;
    private String partnerName;
    private String partnerProfilePic;
    private String ownProfilePic;
    private List<MessageDetails> messages;

    public ChatDetails(User partner, User me, List<MessageDetails> messages) {
        this.partnerId = partner.getId();
        this.partnerName = partner.getFirstName() + " " + partner.getLastName();
        this.partnerProfilePic = partner.getProfilePicture();
        this.ownProfilePic = me.getProfilePicture();
        this.messages = messages;
    }
}
