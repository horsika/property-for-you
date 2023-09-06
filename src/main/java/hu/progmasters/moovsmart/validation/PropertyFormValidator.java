package hu.progmasters.moovsmart.validation;

import hu.progmasters.moovsmart.dto.incoming.PropertyForm;
import hu.progmasters.moovsmart.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class PropertyFormValidator implements Validator {

    private final PropertyRepository propertyRepository;

    @Autowired
    public PropertyFormValidator(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return PropertyForm.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        PropertyForm property = (PropertyForm) o;
        if (property.getName() == null || property.getName().isBlank()) {
            errors.rejectValue("name", "property.name.empty");
        }
        if (property.getDescription() == null || property.getName().isBlank()) {
            errors.rejectValue("description", "property.description.empty");
        }
        if (property.getAddress() == null || property.getAddress().isBlank()) {
            errors.rejectValue("address", "property.address.empty");
        }
        if (property.getPropertyType() == null || property.getPropertyType().isBlank()) {
            errors.rejectValue("propertyType", "property.propertyType.empty");
        }
        if (property.getHeatingType() == null || property.getHeatingType().isBlank()) {
            errors.rejectValue("heatingType", "property.heatingType.empty");
        }
        if (property.getListingStatus() == null || property.getListingStatus().isBlank()) {
            errors.rejectValue("listingStatus", "property.listingStatus.empty");
        }
        if (property.getListingType() == null || property.getListingType().isBlank()) {
            errors.rejectValue("listingType", "property.listingType.empty");
        }
        if (property.getPrice() < 0.1) {
            errors.rejectValue("price", "property.price.invalid");
        }
        if (property.getFloorArea() < 5) {
            errors.rejectValue("floorArea", "property.floorArea.invalid");
        }
        if (property.getNumberOfBedrooms() < 1) {
            errors.rejectValue("numberOfBedrooms", "property.numberOfBedrooms.invalid");
        }
        if (property.getNumberOfBathrooms() < 1 || property.getNumberOfBathrooms() % 0.5 != 0) {
            errors.rejectValue("numberOfBathrooms", "property.numberOfBathrooms.invalid");
        }
    }
}
