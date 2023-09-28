package hu.progmasters.moovsmart.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class OpenHouseStatusEmailTask {

    private final OpenHouseService openHouseService;

    public OpenHouseStatusEmailTask(OpenHouseService openHouseService) {
        this.openHouseService = openHouseService;
    }

    @Scheduled(cron = "0 0 15 * * ?") // Run daily at 3 pm
//    @Scheduled(cron = "0 0/5 * * * ?") // Run every 5 minutes for testing
    public void sendDailyOpenHouseStatusEmail() {
        openHouseService.sendDailyOpenHouseStatusEmail();
    }
}


