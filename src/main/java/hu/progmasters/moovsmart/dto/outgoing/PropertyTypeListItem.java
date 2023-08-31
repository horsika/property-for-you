package hu.progmasters.moovsmart.dto.outgoing;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PropertyTypeListItem {
    private String name;
    private String displayName;

    public PropertyTypeListItem(String name, String displayName) {
        this.name = name;
        this.displayName = displayName;
    }
}
