package hu.progmasters.moovsmart.validation;

import hu.progmasters.moovsmart.dto.incoming.PropertyForm;
import hu.progmasters.moovsmart.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class PropertyFormValidator implements Validator {

    private PropertyRepository propertyRepository;

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
        if (property.getName() == null || property.getName().equals("")) {
            errors.rejectValue("name", "property.name.empty");
        }
        //TODO validate all
    }
}
