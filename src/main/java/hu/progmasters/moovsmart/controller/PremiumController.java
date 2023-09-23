package hu.progmasters.moovsmart.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/premium")
public class PremiumController {

    @GetMapping
    public ResponseEntity<Void> testGet() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
