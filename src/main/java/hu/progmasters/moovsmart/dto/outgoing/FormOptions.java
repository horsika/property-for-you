package hu.progmasters.moovsmart.dto.outgoing;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class FormOptions {
    private List<PropertyTypeListItem> propertyTypes;
    private List<HeatingTypeListItem> heatingTypes;

    public FormOptions(List<PropertyTypeListItem> propertyTypes, List<HeatingTypeListItem> heatingTypes) {
        this.propertyTypes = propertyTypes;
        this.heatingTypes = heatingTypes;
    }
}
