package hu.progmasters.moovsmart.exception;

import org.springframework.web.multipart.MultipartException;

public class ExtensionNotAllowedException extends MultipartException {
    public ExtensionNotAllowedException(String msg) {
        super(msg);
    }
}
