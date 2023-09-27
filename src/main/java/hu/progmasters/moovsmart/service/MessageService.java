package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.premium.Message;
import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.dto.incoming.IncomingMessage;
import hu.progmasters.moovsmart.dto.outgoing.AccountDetails;
import hu.progmasters.moovsmart.dto.outgoing.ChatDetails;
import hu.progmasters.moovsmart.dto.outgoing.MessageDetails;
import hu.progmasters.moovsmart.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {

    private final AuthenticationService authenticationService;

    private final MessageRepository messageRepository;

    public List<AccountDetails> getUsersInContact(String token) {
        User user = authenticationService.findUserByToken(token);
        return messageRepository.getUsersWhoUserHasAChatWith(user)
                .stream()
                .map(AccountDetails::new)
                .collect(Collectors.toList());
    }

    public ChatDetails getChat(Long id, String token) {
        User me = authenticationService.findUserByToken(token);
        User partner = authenticationService.findUserById(id);
        List<MessageDetails> messages = messageRepository.getMessagesBetweenUsersOrderedByTime(me, partner)
                .stream()
                .map(MessageDetails::new)
                .collect(Collectors.toList());
        return new ChatDetails(partner, me, messages);
    }

    public void sendMessage(Long id, String token, IncomingMessage msg) {
        User me = authenticationService.findUserByToken(token);
        User partner = authenticationService.findUserById(id);
        Message message = new Message(me, partner, msg.getMessage());
        messageRepository.save(message);
    }

}
