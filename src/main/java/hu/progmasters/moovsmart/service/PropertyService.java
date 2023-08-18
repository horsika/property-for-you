package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.property.Property;
import hu.progmasters.moovsmart.dto.outgoing.PropertyDetails;
import hu.progmasters.moovsmart.dto.incoming.PropertyForm;
import hu.progmasters.moovsmart.dto.outgoing.PropertyListItem;
import hu.progmasters.moovsmart.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PropertyService {

    private PropertyRepository propertyRepository;

    @Autowired
    public PropertyService(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    public List<PropertyListItem> getProperties() {
        List<Property> properties = propertyRepository.findAllByOrderByActivatedAtDesc();
        return properties.stream().map(PropertyListItem::new).collect(Collectors.toList());
    }

    public PropertyDetails getPropertyDetails(Long id) {
//        Property property = propertyRepository.getOne(id);
//        return new PropertyDetails(property);
        return null;
    }

    public void createProperty(PropertyForm propertyForm) {
//        propertyRepository.save(new Property(propertyForm));
    }
}
