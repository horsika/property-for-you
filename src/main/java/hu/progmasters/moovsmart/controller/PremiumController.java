package hu.progmasters.moovsmart.controller;

import hu.progmasters.moovsmart.dto.incoming.NewPropertyFilters;
import hu.progmasters.moovsmart.dto.outgoing.AccountDetails;
import hu.progmasters.moovsmart.dto.outgoing.PropertyListItem;
import hu.progmasters.moovsmart.service.PremiumService;
import hu.progmasters.moovsmart.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/premium")
@RequiredArgsConstructor
public class PremiumController {

    private final PremiumService premiumService;
    private final PropertyService propertyService;

    @GetMapping("/{id}")
    public ResponseEntity<AccountDetails> getOwner(@PathVariable("id") Long propertyId) {
        return new ResponseEntity<>(premiumService.getOwner(propertyId), HttpStatus.OK);
    }

    @PostMapping("/new-properties")
    public ResponseEntity<List<PropertyListItem>> viewPropertiesActiveNew(@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String token,
                                                                          @RequestBody NewPropertyFilters filters) {

        if (token != null) {
            return new ResponseEntity<>(propertyService.getPropertiesActiveNew(token, filters), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

}
