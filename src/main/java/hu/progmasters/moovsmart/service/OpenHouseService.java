package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.property.OpenHouse;
import hu.progmasters.moovsmart.domain.property.Property;
import hu.progmasters.moovsmart.dto.incoming.OpenHouseForm;
import hu.progmasters.moovsmart.repository.OpenHouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class OpenHouseService {


    private final OpenHouseRepository openHouseRepository;
    private final PropertyService propertyService;

    public void createOpenHouse(OpenHouseForm openHouseForm){
        Property property = this.propertyService.getPropertyById(openHouseForm.getPropertyId());
        OpenHouse openHouse = new OpenHouse(openHouseForm, property);
        openHouseRepository.save(openHouse);

    }


}
