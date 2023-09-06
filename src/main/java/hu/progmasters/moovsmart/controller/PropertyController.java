package hu.progmasters.moovsmart.controller;

import hu.progmasters.moovsmart.dto.incoming.PropertyActiveToggle;
import hu.progmasters.moovsmart.dto.incoming.PropertyForm;
import hu.progmasters.moovsmart.dto.outgoing.FormOptions;
import hu.progmasters.moovsmart.dto.outgoing.MyPropertyListItem;
import hu.progmasters.moovsmart.dto.outgoing.PropertyDetails;
import hu.progmasters.moovsmart.dto.outgoing.PropertyListItem;
import hu.progmasters.moovsmart.service.PropertyService;
import hu.progmasters.moovsmart.validation.PropertyFormValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
public class PropertyController {

    private final PropertyService propertyService;
    private final PropertyFormValidator propertyFormValidator;

    @Autowired
    public PropertyController(PropertyService propertyService, PropertyFormValidator propertyFormValidator) {
        this.propertyService = propertyService;
        this.propertyFormValidator = propertyFormValidator;
    }

    @InitBinder("propertyDetails")
    protected void initBinder(WebDataBinder binder) {
        binder.addValidators(propertyFormValidator);
    }

    @GetMapping
    public ResponseEntity<List<PropertyListItem>> getPropertiesActivated() {
        return new ResponseEntity<>(propertyService.getPropertiesActivated(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PropertyDetails> getPropertyDetails(@PathVariable("id") Long id) {
        return new ResponseEntity<>(propertyService.getPropertyDetails(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity createProperty(@RequestBody @Valid PropertyForm propertyForm, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        propertyService.createProperty(propertyForm, token);
        return new ResponseEntity(HttpStatus.CREATED);
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
    public ResponseEntity<Void> changeActiveStatus(@RequestBody PropertyActiveToggle active){
        propertyService.changeActiveStatus(active);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
