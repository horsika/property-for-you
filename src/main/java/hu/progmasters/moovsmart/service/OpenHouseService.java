package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.property.OpenHouse;
import hu.progmasters.moovsmart.domain.property.Property;
import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.dto.incoming.OpenHouseForm;
import hu.progmasters.moovsmart.dto.outgoing.OpenHouseListItem;
import hu.progmasters.moovsmart.repository.OpenHouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
@RequiredArgsConstructor
public class OpenHouseService {


    private final OpenHouseRepository openHouseRepository;
    private final PropertyService propertyService;
    private final EmailTokenService emailTokenService;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final JavaMailSender mailSender;

    public void createOpenHouse(OpenHouseForm openHouseForm, String token) {
        Property property = this.propertyService.getPropertyById(openHouseForm.getPropertyId());
        OpenHouse openHouse = new OpenHouse(openHouseForm, property);
        String processableToken = token.substring(7);
        String userEmail = jwtService.extractEmail(processableToken);
        User user = authenticationService.findUserByEmail(userEmail);

        openHouseRepository.save(openHouse);
        sendConfirmationEmail(user, openHouseForm.getFromTime(), openHouseForm.getToTime(), property.getName());

    }

    private void sendConfirmationEmail(User user,
                                       LocalDateTime fromTime, LocalDateTime toTime,
                                       String propertyName) {

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("Email confirmation");
        email.setText("An Open House event at your " + propertyName + " from " + fromTime + " to " + toTime + " has been created!");
        mailSender.send(email);
    }

    public List<OpenHouseListItem> getOpenHouseList(){
        return openHouseRepository.findAllByActiveTrueOrderByFromTimeAsc().stream().map(OpenHouseListItem::new).collect(Collectors.toList());
    }



}