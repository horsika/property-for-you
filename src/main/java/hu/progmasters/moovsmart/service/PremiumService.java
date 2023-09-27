package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.property.Property;
import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.dto.outgoing.AccountDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PremiumService {

    private final AuthenticationService authenticationService;
    private final PropertyService propertyService;

    public AccountDetails getOwner(Long propertyId) {
        Property property = propertyService.getPropertyById(propertyId);
        User user = property.getOwnerUser();
        return new AccountDetails(user);
    }
}
