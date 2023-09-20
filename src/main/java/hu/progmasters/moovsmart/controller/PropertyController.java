package hu.progmasters.moovsmart.controller;

import hu.progmasters.moovsmart.dto.incoming.AddToFavs;
import hu.progmasters.moovsmart.dto.incoming.PropertyActiveToggle;
import hu.progmasters.moovsmart.dto.incoming.PropertyForm;
import hu.progmasters.moovsmart.dto.outgoing.*;
import hu.progmasters.moovsmart.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;

    @Autowired
    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    @GetMapping
    public ResponseEntity<List<PropertyListItem>> getPropertiesActivated() {
        return new ResponseEntity<>(propertyService.getPropertiesActivated(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyDetails> getPropertyDetails(@PathVariable("id") Long id,
                                                              @RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String token) {
        if (token != null) {
            return new ResponseEntity<>(propertyService.getPropertyDetails(id, token), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(propertyService.getPropertyDetails(id), HttpStatus.OK);
        }
    }

    @PostMapping
    public ResponseEntity<Void> createProperty(@ModelAttribute PropertyForm propertyForm,
                                               @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        propertyService.createProperty(propertyForm, token);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/form-options")
    public ResponseEntity<FormOptions> getPropertyTypes() {
        return new ResponseEntity<>(propertyService.getFormOptions(), HttpStatus.OK);
    }

    @GetMapping("/my-properties")
    public ResponseEntity<List<MyPropertyListItem>> getMyProperties(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return new ResponseEntity<>(propertyService.getMyProperties(token), HttpStatus.OK);
    }

    @PostMapping("/change-active-status")
    public ResponseEntity<Void> changeActiveStatus(@RequestBody PropertyActiveToggle active) {
        propertyService.changeActiveStatus(active);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/save-to-favourites")
    public ResponseEntity<Void> saveToFavourites(@RequestBody AddToFavs addToFavs,
                                                 @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        this.propertyService.saveToFavourites(addToFavs, token);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/my-saved-properties")
    public ResponseEntity<List<MyPropertyListItem>> getMySavedProperties(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        return new ResponseEntity<>(propertyService.getMySavedProperties(token), HttpStatus.OK);
    }

    @GetMapping("/edit/{id}")
    public ResponseEntity<PropertyEditDetails> sendEditablePropertyInfo(@PathVariable("id") Long id) {
        return new ResponseEntity<>(propertyService.getEditablePropertyInfo(id), HttpStatus.OK);
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<Void> editProperty(@PathVariable("id") Long id, @ModelAttribute PropertyForm propertyForm) {
        propertyService.editProperty(id, propertyForm);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
