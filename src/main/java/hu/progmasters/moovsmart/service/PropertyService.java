package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.property.*;
import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.domain.user.UserRole;
import hu.progmasters.moovsmart.dto.incoming.AddToFavs;
import hu.progmasters.moovsmart.dto.incoming.PropertyActiveToggle;
import hu.progmasters.moovsmart.dto.incoming.UploadResponse;
import hu.progmasters.moovsmart.dto.outgoing.*;
import hu.progmasters.moovsmart.dto.incoming.PropertyForm;
import hu.progmasters.moovsmart.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;
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

    //Non-logged-in users
    public List<PropertyListItem> getPropertiesActiveForFiveDaysOrMore() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime pastDateTime = currentDateTime.minusDays(5);
        List<Property> properties = propertyRepository.findAllActiveForFiveDaysOrMore(pastDateTime);
        return properties.stream().map(PropertyListItem::new).collect(Collectors.toList());
    }

    //Logged-in users
    public List<PropertyListItem> getPropertiesActive(String token) {
        User user = authenticationService.findUserByToken(token);
        List<Property> properties = new ArrayList<>();

        if (user.getRole() == UserRole.ROLE_PREMIUM){
            properties = propertyRepository.findAllWhereListingStatusLikeActiveOrderByActivatedAtDesc();
        } else {
            LocalDateTime currentDateTime = LocalDateTime.now();
            LocalDateTime pastDateTime = currentDateTime.minusDays(5);
            properties = propertyRepository.findAllActiveForFiveDaysOrMore(pastDateTime);
        }
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
        propertyToSave.setCreatedAt(LocalDateTime.now());


        List<String> images = processImages(propertyForm, propertyToSave);
        propertyToSave.setImages(images);

        propertyRepository.save(propertyToSave);
    }

    private List<String> processImages(PropertyForm propertyForm, Property property) {
        List<CommonsMultipartFile> imgs = propertyForm.getImages();
        if ((imgs == null || imgs.isEmpty()) && property.getImages().isEmpty()) {
            //default image if none is present
            return List.of("http://res.cloudinary.com/dai5h04h9/image/authenticated/s--Y_6dyawG--/v1694286325/property/P_F_Y_1_jei6e3.png");
        } else if (imgs == null || imgs.isEmpty()) {
            return new ArrayList<>();
        } else {
            List<String> imgUrls = new ArrayList<>();
            for (CommonsMultipartFile img : imgs) {
                UploadResponse response = authenticationService.storeImage(img, "property");
                imgUrls.add(response.getUrl());
            }
            return imgUrls;
        }
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
        if (addToFavs.isAdded()) {
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

    public List<MyPropertyListItem> getAllProperties() {
        return propertyRepository.findAllByOrderByActivatedAtDesc().stream().map(MyPropertyListItem::new).collect(Collectors.toList());
    }

    public Property getPropertyById(Long propertyId) {
        Optional<Property> property = propertyRepository.findById(propertyId);
        return property.isPresent() ? property.get() : null;
    }

    public PropertyEditDetails getEditablePropertyInfo(Long id) {
        Property property = propertyRepository.findById(id).orElseThrow();
        return new PropertyEditDetails(property);
    }

    public void editProperty(Long id, PropertyForm propertyForm) {
        Property p = propertyRepository.findById(id).orElseThrow();

        p.setName(propertyForm.getName());
        p.setNumberOfBathrooms(propertyForm.getNumberOfBathrooms());
        p.setNumberOfBedrooms(propertyForm.getNumberOfBedrooms());
        p.setPrice(propertyForm.getPrice());
        p.setFloorArea(propertyForm.getFloorArea());
        p.setAirConditioning(propertyForm.isAirConditioning());
        p.setDescription(propertyForm.getDescription());

        Address address = p.getAddress();
        address.setPostcode(propertyForm.getPostcode());
        address.setCity(propertyForm.getCity());
        address.setRoad(propertyForm.getRoad());
        address.setHouseNumber(propertyForm.getHouse_number());
        address.setFloor(propertyForm.getFloor());
        address.setDoor(propertyForm.getDoor());


        List<String> newImages = processImages(propertyForm, p);
        p.getImages().addAll(newImages);

        p.setPropertyType(PropertyType.valueOf(propertyForm.getPropertyType()));
        p.setHeatingType(HeatingType.valueOf(propertyForm.getHeatingType()));
        p.setListingType(ListingType.getNameFromDisplayName(propertyForm.getListingType()));
        p.setLatitude(propertyForm.getLatitude());
        p.setLongitude(propertyForm.getLongitude());

        propertyRepository.save(p);
    }

}
