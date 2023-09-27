package hu.progmasters.moovsmart.controller;

import hu.progmasters.moovsmart.dto.incoming.AdminPropertyFilters;
import hu.progmasters.moovsmart.dto.incoming.NewPropertyFilters;
import hu.progmasters.moovsmart.dto.outgoing.PropertyListItem;
import hu.progmasters.moovsmart.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/premium")
public class PremiumController {

    private final PropertyService propertyService;

    @Autowired
    public PremiumController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public ResponseEntity<Void> testGet() {
        return new ResponseEntity<>(HttpStatus.OK);
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
