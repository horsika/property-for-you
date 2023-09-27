package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.property.Booking;
import hu.progmasters.moovsmart.domain.property.OpenHouse;
import hu.progmasters.moovsmart.domain.property.Property;
import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.dto.incoming.OpenHouseForm;
import hu.progmasters.moovsmart.dto.outgoing.MyBookingListItem;
import hu.progmasters.moovsmart.dto.outgoing.MyOpenHouseListItem;
import hu.progmasters.moovsmart.dto.outgoing.MyParticipantListItem;
import hu.progmasters.moovsmart.dto.outgoing.OpenHouseListItem;
import hu.progmasters.moovsmart.repository.OpenHouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.time.LocalDateTime;
import java.util.*;
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

        for (OpenHouse openHouse : openHouses) {
            int sumPlacesBooked = calculateSumPlacesBooked(openHouse);
            MyOpenHouseListItem myOpenHouseListItem = new MyOpenHouseListItem(openHouse, sumPlacesBooked);
            myOpenHouseList.add(myOpenHouseListItem);
        }

        return myOpenHouseList;
    }

    private int calculateSumPlacesBooked(OpenHouse openHouse) {
        int sum = 0;
        for (Booking booking : openHouse.getBookings()) {
            sum += booking.getPlacesToBook();
        }
        return sum;
    }


    public List<MyBookingListItem> getMyBookingList(String token) {
        User user = authenticationService.findUserByToken(token);
        List<OpenHouse> openHouses = openHouseRepository.findAllMyBookings(user);

        List<MyBookingListItem> myBookingList = new ArrayList<>();

        for (OpenHouse openHouse : openHouses) {
            int sumPlacesBooked = calculateSumPlacesBooked(openHouse);
            MyBookingListItem myBookingListItem = new MyBookingListItem(openHouse, sumPlacesBooked);
            myBookingList.add(myBookingListItem);
        }

        return myBookingList;

    }

    public List<MyParticipantListItem> getMyParticipantList(String token) {
        User user = authenticationService.findUserByToken(token);
        List<OpenHouse> openHouses = openHouseRepository.findAllMyOpenHouses(user);

        List<MyParticipantListItem> myParticipantList = new ArrayList<>();

        for (OpenHouse openHouse : openHouses) {
            int sumPlacesBooked = calculateSumPlacesBooked(openHouse);

            MyParticipantListItem myParticipantListItem = new MyParticipantListItem(openHouse, sumPlacesBooked);
            myParticipantList.add(myParticipantListItem);
        }

        return myParticipantList;
    }

    public void sendDailyOpenHouseStatusEmail() {

        List<Object[]> ownerUsersWithOpenHouses = openHouseRepository.findAllOpenHousesWithOwners();

        Map<User, List<OpenHouse>> ownerUserOpenHousesMap = new HashMap<>();

        for (Object[] result : ownerUsersWithOpenHouses) {
            User ownerUser = (User) result[1];
            OpenHouse openHouse = (OpenHouse) result[0];

            if (!ownerUserOpenHousesMap.containsKey(ownerUser)) {
                ownerUserOpenHousesMap.put(ownerUser, new ArrayList<>());
            }

            ownerUserOpenHousesMap.get(ownerUser).add(openHouse);
        }

        Long userIdToSendEmailTo1 = 10L;
        Long userIdToSendEmailTo2 = 11L;

        // Iterate through owner users and their open houses
        for (Map.Entry<User, List<OpenHouse>> entry : ownerUserOpenHousesMap.entrySet()) {
            User ownerUser = entry.getKey();
            List<OpenHouse> openHousesForOwner = entry.getValue();

            if (userIdToSendEmailTo1.equals(ownerUser.getId()) || userIdToSendEmailTo2.equals(ownerUser.getId())) {
                // Build the email content using ownerUser and openHousesForOwner
                String emailContent = buildEmailContent(ownerUser, openHousesForOwner);

                // Send the email to the owner
                sendHtmlEmail(ownerUser.getEmail(), "Daily Open House Status", emailContent);
            }
        }

    }

    private String buildEmailContent(User ownerUser, List<OpenHouse> openHousesForOwner) {

        StringBuilder emailContent = new StringBuilder();
        emailContent.append("<html>");
        emailContent.append("<body>");
        emailContent.append("<h2>Owner: ").append(ownerUser.getFirstName()).append(" ").append(ownerUser.getLastName()).append("</h2>");

        emailContent.append("<table border='1'>");

        // Add table headers
        emailContent.append("<tr>");
        emailContent.append("<th>Property Name</th>");
        emailContent.append("<th>From Date</th>");
        emailContent.append("<th>To Date</th>");
        emailContent.append("<th>Max Participants</th>");
//        emailContent.append("<th>Places Booked</th>");
        emailContent.append("</tr>");

        // Add table rows for each open house
        for (OpenHouse openHouse : openHousesForOwner) {
            emailContent.append("<tr>");
            emailContent.append("<td>").append(openHouse.getProperty().getName()).append("</td>");
            emailContent.append("<td>").append(openHouse.getFromTime()).append("</td>");
            emailContent.append("<td>").append(openHouse.getToTime()).append("</td>");
            emailContent.append("<td>").append(openHouse.getMaxParticipants()).append("</td>");
//            emailContent.append("<td>").append(myOpenHouse.getSumPlacesBooked()).append("</td>");
            emailContent.append("</tr>");
        }
        emailContent.append("</table>");
        emailContent.append("</body>");
        emailContent.append("</html>");
        return emailContent.toString();

    }

    private void sendHtmlEmail(String to, String subject, String content) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper;

        try {
            helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setSubject(subject);
            helper.setTo(to);
            helper.setText(content, true); // true indicates HTML content
            mailSender.send(message);
        } catch (MessagingException e) {
            // Handle the exception
            e.printStackTrace();
        }
    }


}
