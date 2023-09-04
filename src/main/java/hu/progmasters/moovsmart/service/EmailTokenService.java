package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.user.EmailToken;
import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.repository.EmailTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmailTokenService {

    @Value("${base-url}")
    private String BASE_URL;
    private static final int EXP_TIME = 86_400_000; // 24hrs
    private final EmailTokenRepository emailTokenRepository;
    private final JavaMailSender mailSender;

    public void sendVerificationEmail(User user) {
        String token = generateEmailToken();
        createVerificationToken(user, token);

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("Email verification");
        email.setText("Click here to verify your email: " + BASE_URL + "/verify-email/" + token);
        mailSender.send(email);
    }

    private void createVerificationToken(User user, String token) {
        EmailToken myToken = new EmailToken(token, user);
        myToken.setExpiryDateTime(LocalDateTime.now().plus(EXP_TIME, ChronoUnit.MILLIS));
        emailTokenRepository.save(myToken);
    }

    private String generateEmailToken() {
        return UUID.randomUUID().toString();
    }

    public EmailToken findToken(String token) {
        return emailTokenRepository.findEmailTokenByToken(token).orElseThrow();
    }

}
