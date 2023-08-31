package hu.progmasters.moovsmart.dto.outgoing;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HeatingTypeListItem {
    private String name;
    private String displayName;

    public HeatingTypeListItem(String name, String displayName) {
        this.name = name;
        this.displayName = displayName;
    }
}
