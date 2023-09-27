package hu.progmasters.moovsmart.dto.outgoing;

import hu.progmasters.moovsmart.domain.premium.Message;

public class MessageDetails {

    private Long senderId;
    private String message;

    public MessageDetails(Message message) {
        this.senderId = message.getSender().getId();
        this.message = message.getMessage();
    }
}
