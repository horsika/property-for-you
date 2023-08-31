package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.property.HeatingType;
import hu.progmasters.moovsmart.domain.property.Property;
import hu.progmasters.moovsmart.domain.property.PropertyType;
import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.dto.outgoing.*;
import hu.progmasters.moovsmart.dto.incoming.PropertyForm;
import hu.progmasters.moovsmart.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository, JwtService jwtService, AuthenticationService authenticationService) {
        this.propertyRepository = propertyRepository;
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    public List<PropertyListItem> getProperties() {
        List<Property> properties = propertyRepository.findAllByOrderByActivatedAtDesc();
        return properties.stream().map(PropertyListItem::new).collect(Collectors.toList());
    }

    public PropertyDetails getPropertyDetails(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        return new PropertyDetails(property);
    }

    public void createProperty(PropertyForm propertyForm, String token) {
        String processableToken = token.substring(7);
        String userEmail = jwtService.extractEmail(processableToken);
        User author = authenticationService.findUserByEmail(userEmail);
        Property propertyToSave = new Property(propertyForm);

        propertyToSave.setOwnerUser(author);

        propertyRepository.save(propertyToSave);
    }

    public List<PropertyTypeListItem> getPropertyTypes() {
        return Arrays.stream(PropertyType.values())
                .map(value -> new PropertyTypeListItem(value.name(), value.getDisplayName()))
                .collect(Collectors.toList());
    }

    public List<HeatingTypeListItem> getHeatingTypes() {
        return Arrays.stream(HeatingType.values())
                .map(value -> new HeatingTypeListItem(value.name(), value.getDisplayName()))
                .collect(Collectors.toList());
    }

    public FormOptions getFormOptions() {
        return new FormOptions(getPropertyTypes(), getHeatingTypes());
    }
}
