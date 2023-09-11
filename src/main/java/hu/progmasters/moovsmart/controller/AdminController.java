package hu.progmasters.moovsmart.controller;

import hu.progmasters.moovsmart.dto.outgoing.AccountDetails;
import hu.progmasters.moovsmart.dto.outgoing.MyPropertyListItem;
import hu.progmasters.moovsmart.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/all-users")
    public ResponseEntity<List<AccountDetails>> getAllAccounts() {
        return new ResponseEntity<>(adminService.getAllAccounts(), HttpStatus.OK);
    }

    @GetMapping("/enabled-users")
    public ResponseEntity<List<AccountDetails>> getEnabledAccounts() {
        return new ResponseEntity<>(adminService.getEnabledAccounts(), HttpStatus.OK);
    }

    @GetMapping("/disabled-users")
    public ResponseEntity<List<AccountDetails>> getDisabledAccounts() {
        return new ResponseEntity<>(adminService.getDisabledAccounts(), HttpStatus.OK);
    }

    @GetMapping("/created-properties/{id}")
    public ResponseEntity<List<MyPropertyListItem>> viewUsersCreatedProperties(@PathVariable("id") Long id) {
        return new ResponseEntity<>(adminService.getUsersCreatedProperties(id), HttpStatus.OK);
    }

    @GetMapping("/all-properties")
    public ResponseEntity<List<MyPropertyListItem>> viewAllProperties() {
        return new ResponseEntity<>(adminService.getAllProperties(), HttpStatus.OK);
    }

}
