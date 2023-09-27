package hu.progmasters.moovsmart.controller;

import hu.progmasters.moovsmart.dto.incoming.IncomingMessage;
import hu.progmasters.moovsmart.dto.outgoing.AccountDetails;
import hu.progmasters.moovsmart.dto.outgoing.ChatDetails;
import hu.progmasters.moovsmart.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @GetMapping("/contacts")
    public ResponseEntity<List<AccountDetails>> getContacts(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return new ResponseEntity<>(messageService.getUsersInContact(token), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ChatDetails> getChat(@RequestHeader(HttpHeaders.AUTHORIZATION) String token, @PathVariable("id") Long id) {
        return new ResponseEntity<>(messageService.getChat(id, token), HttpStatus.OK);
    }

    @PostMapping("/{id}")
    public ResponseEntity<Void> sendMessage(@RequestHeader(HttpHeaders.AUTHORIZATION) String token,
                                            @PathVariable("id") Long id,
                                            @RequestBody IncomingMessage msg) {
        messageService.sendMessage(id, token, msg);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
