package hu.progmasters.moovsmart.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class OpenHouseExpirationTask {

    private final OpenHouseService openHouseService;

    public OpenHouseExpirationTask(OpenHouseService openHouseService) {
        this.openHouseService = openHouseService;
    }

    @Scheduled(cron = "0 * * * * ?") // Run daily at midnight
    public void expireOpenHouses() {
        openHouseService.expireOpenHouses();
    }
}


