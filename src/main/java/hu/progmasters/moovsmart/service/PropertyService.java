package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.property.*;
import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.dto.incoming.AddToFavs;
import hu.progmasters.moovsmart.dto.incoming.PropertyActiveToggle;
import hu.progmasters.moovsmart.dto.outgoing.*;
import hu.progmasters.moovsmart.dto.incoming.PropertyForm;
import hu.progmasters.moovsmart.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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

    public List<PropertyListItem> getPropertiesActivated() {
        List<Property> properties = propertyRepository.findAllByActivatedAtIsNotNullOrderByActivatedAtDesc();
        return properties.stream().map(PropertyListItem::new).collect(Collectors.toList());
    }

    // as a logged-in user
    public PropertyDetails getPropertyDetails(Long id, String token) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);
        User user = authenticationService.findUserByToken(token);

        return new PropertyDetails(property, user);
    }

    // as a non-logged-in user
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

    public List<MyPropertyListItem> getMyProperties(String token) {
        User user = authenticationService.findUserByToken(token);
        List<Property> properties = propertyRepository.findByOwnerUserOrderByListingStatus(user);
        return properties.stream().map(MyPropertyListItem::new).collect(Collectors.toList());
    }

    public void changeActiveStatus(PropertyActiveToggle active) {
        Property property = propertyRepository.getById(active.getPropertyId());
        property.setListingStatus(ListingStatus.valueOf(active.getListingStatus()));
        propertyRepository.save(property);
    }

    public void saveToFavourites(AddToFavs addToFavs, String token) {
        User user = this.authenticationService.findUserByToken(token);
        Property property = this.propertyRepository.getById(addToFavs.getPropertyId());
        if(addToFavs.isAdded()) {
            property.addToSaverUsers(user);
        } else {
            property.removeFromSaverUsers(user);
        }

        this.propertyRepository.save(property);
    }

    public List<MyPropertyListItem> getMySavedProperties(String token) {
        User user = authenticationService.findUserByToken(token);
        return user.getSavedProperties().stream().map(MyPropertyListItem::new).collect(Collectors.toList());
    }
}
