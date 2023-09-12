package hu.progmasters.moovsmart.service;

import hu.progmasters.moovsmart.domain.user.User;
import hu.progmasters.moovsmart.dto.incoming.AdminPropertyFilters;
import hu.progmasters.moovsmart.dto.outgoing.AccountDetails;
import hu.progmasters.moovsmart.dto.outgoing.MyPropertyListItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
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

    public List<MyPropertyListItem> getAllProperties(AdminPropertyFilters filters) {
        List<MyPropertyListItem> properties = propertyService.getAllProperties();
        List<MyPropertyListItem> filteredProperties = new ArrayList<>();
        for (MyPropertyListItem property : properties) {
            if(property.getCreatedAt().isAfter(decideTimePeriod(filters.getTimePeriod()).atStartOfDay())
            && (property.getIsActiveDisplayName().equals(filters.getStatus()) || filters.getStatus().equals("ALL")) //Active, Inactive, Archived
            && (property.getListingTypeDisplayName().equals(filters.getListingType()) || filters.getListingType().equals("ALL")) //For sale, For rent
            && (property.getPropertyTypeDisplayName().equals(filters.getPropertyType()) || filters.getPropertyType().equals("ALL")) //House, Multi-family house, Apartment, Condo, Row house, Summer house
            ) {
                filteredProperties.add(property);
            }
        }
        return filteredProperties;
    }

    private LocalDate decideTimePeriod(String timePeriod) {
        switch (timePeriod) {
            case "WEEK":
                return LocalDate.now().minusWeeks(1);
            case "MONTH":
                return LocalDate.now().minusMonths(1);
            case "YEAR":
                return LocalDate.now().minusYears(1);
            default:
                return LocalDate.EPOCH;
        }
    }

}
