package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.property.Property;
import hu.progmasters.moovsmart.dto.PropertyDetails;
import hu.progmasters.moovsmart.dto.PropertyForm;
import hu.progmasters.moovsmart.dto.PropertyListItem;
import hu.progmasters.moovsmart.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PropertyService {

    private final PropertyRepository propertyRepository;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public List<PropertyListItem> getProperties() {
        List<Property> properties = propertyRepository.findAll();
        return properties.stream().map(PropertyListItem::new).collect(Collectors.toList());
    }

    public PropertyDetails getPropertyDetails(Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(EntityNotFoundException::new);

        return new PropertyDetails(property);
    }

    public void createProperty(PropertyForm propertyForm) {
//        propertyRepository.save(new Property(propertyForm));
    }
}
