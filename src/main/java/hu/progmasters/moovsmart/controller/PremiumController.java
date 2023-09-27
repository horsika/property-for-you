package hu.progmasters.moovsmart.controller;

import hu.progmasters.moovsmart.dto.outgoing.AccountDetails;
import hu.progmasters.moovsmart.service.PremiumService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/premium")
@RequiredArgsConstructor
public class PremiumController {

    private final PremiumService premiumService;

    @GetMapping("/{id}")
    public ResponseEntity<AccountDetails> getOwner(@PathVariable("id") Long propertyId) {
        return new ResponseEntity<>(premiumService.getOwner(propertyId), HttpStatus.OK);
    }

}
