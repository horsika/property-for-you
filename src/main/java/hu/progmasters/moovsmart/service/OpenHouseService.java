package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.property.Booking;
import hu.progmasters.moovsmart.domain.property.OpenHouse;
import hu.progmasters.moovsmart.domain.property.Property;
import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.dto.incoming.OpenHouseForm;
import hu.progmasters.moovsmart.dto.outgoing.MyBookingListItem;
import hu.progmasters.moovsmart.dto.outgoing.MyOpenHouseListItem;
import hu.progmasters.moovsmart.dto.outgoing.OpenHouseListItem;
import hu.progmasters.moovsmart.repository.OpenHouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

    public List<OpenHouseListItem> getOpenHouseList() {
        return openHouseRepository.findAllByActiveTrueOrderByFromTimeAsc().stream().map(OpenHouseListItem::new).collect(Collectors.toList());
    }

    public List<OpenHouseListItem> getOpenHouseListGroupedByPropertyId() {
        return openHouseRepository.findAllByActiveTrueGroupByPropertyIdOrderByFromTimeAsc().stream().map(OpenHouseListItem::new).collect(Collectors.toList());
    }

    public OpenHouse getOpenHouseById(Long openHouseId) {
        Optional<OpenHouse> openHouse = openHouseRepository.findById(openHouseId);
        return openHouse.isPresent() ? openHouse.get() : null;
    }

    public void expireOpenHouses() {
        LocalDateTime now = LocalDateTime.now();
        List<OpenHouse> expiredOpenHouses = openHouseRepository.findExpiredOpenHouses(now);

        for (OpenHouse expiredOpenHouse : expiredOpenHouses) {
            expiredOpenHouse.setIsActive(false);
        }

        openHouseRepository.saveAll(expiredOpenHouses);
    }

    public List<MyOpenHouseListItem> getMyOpenHouseList(String token) {
        User user = authenticationService.findUserByToken(token);
        List<OpenHouse> openHouses = openHouseRepository.findAllMyOpenHouses(user);

        List<MyOpenHouseListItem> myOpenHouseList = new ArrayList<>();

        for (OpenHouse openHouse : openHouses){
            int sumPlacesBooked = calculateSumPlacesBooked(openHouse);
            MyOpenHouseListItem myOpenHouseListItem = new MyOpenHouseListItem(openHouse, sumPlacesBooked);
            myOpenHouseList.add(myOpenHouseListItem);
        }

        return myOpenHouseList;
    }

    private int calculateSumPlacesBooked(OpenHouse openHouse) {
        int sum = 0;
        for (Booking booking : openHouse.getBookings()){
            sum+= booking.getPlacesToBook();
        }
        return sum;
    }

    public List<MyBookingListItem> getMyBookingList(String token) {
        User user = authenticationService.findUserByToken(token);
        List<OpenHouse> openHouses = openHouseRepository.findAllMyBookings(user);

        List<MyBookingListItem> myBookingList = new ArrayList<>();

        for (OpenHouse openHouse : openHouses){

            MyBookingListItem myBookingListItem = new MyBookingListItem(openHouse);
            myBookingList.add(myBookingListItem);
        }

        return myBookingList;

    }

}
