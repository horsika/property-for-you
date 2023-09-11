package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.dto.outgoing.AccountDetails;
import hu.progmasters.moovsmart.dto.outgoing.MyPropertyListItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminService {

    private final AuthenticationService authenticationService;
    private final PropertyService propertyService;

    public List<AccountDetails> getAllAccounts() {
        return authenticationService.getAccountList();
    }

    public List<AccountDetails> getEnabledAccounts() {
        return authenticationService.getEnabledAccountList();
    }

    public List<AccountDetails> getDisabledAccounts() {
        return authenticationService.getDisabledAccountList();
    }

    public List<MyPropertyListItem> getUsersCreatedProperties(Long id) {
        User user = authenticationService.findUserById(id);
        return user.getOwnedProperties().stream().map(MyPropertyListItem::new).collect(Collectors.toList());
    }

    public List<MyPropertyListItem> getAllProperties() {
        return propertyService.getAllProperties();
    }

}
