package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.property.Booking;
import hu.progmasters.moovsmart.domain.property.OpenHouse;
import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.dto.incoming.BookingForm;
import hu.progmasters.moovsmart.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;



@Service
@Transactional
@RequiredArgsConstructor
public class BookingService {


    private final BookingRepository bookingRepository;
    private final OpenHouseService openHouseService;
    private final EmailTokenService emailTokenService;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final JavaMailSender mailSender;

    public void createBooking(BookingForm bookingForm, String token) {
        OpenHouse openHouse = this.openHouseService.getOpenHouseById(bookingForm.getOpenHouseId());

        String processableToken = token.substring(7);
        String userEmail = jwtService.extractEmail(processableToken);
        User user = authenticationService.findUserByEmail(userEmail);

        Booking booking = new Booking(user, openHouse);

        bookingRepository.save(booking);
        sendConfirmationEmail(user, openHouse.getFromTime(), openHouse.getToTime(), openHouse.getProperty().getName());

    }

    private void sendConfirmationEmail(User user,
                                       LocalDateTime fromTime, LocalDateTime toTime,
                                       String propertyName) {

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("Email confirmation");
        email.setText("You have successfully booked a tour at " + propertyName + " from " + fromTime + " to " + toTime + "!");
        mailSender.send(email);
    }




}
