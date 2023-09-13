package hu.progmasters.moovsmart.dto.incoming;

import lombok.Data;

@Data
public class UserActiveStatus {
    private Long userId;
    private boolean userStatus;
}
