package hu.progmasters.moovsmart.controller;

import hu.progmasters.moovsmart.dto.incoming.OpenHouseForm;
import hu.progmasters.moovsmart.dto.outgoing.OpenHouseListItem;
import hu.progmasters.moovsmart.service.OpenHouseService;
import hu.progmasters.moovsmart.service.PropertyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/openhouses")
@RequiredArgsConstructor
public class OpenHouseController {

    private final OpenHouseService openHouseService;
    private final PropertyService propertyService;

    @PostMapping
    public ResponseEntity<Void> createOpenHouse (@RequestBody OpenHouseForm openHouseForm,
                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        openHouseService.createOpenHouse(openHouseForm, token);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity <List<OpenHouseListItem>> getOpenHouseList() {
        return new ResponseEntity<>(openHouseService.getOpenHouseList(), HttpStatus.OK);
    }


}
