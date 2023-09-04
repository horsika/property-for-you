package hu.progmasters.moovsmart.exception;

import org.springframework.security.authentication.AuthenticationServiceException;

public class ExpiredEmailVerificationTokenException extends AuthenticationServiceException {
    public ExpiredEmailVerificationTokenException(String msg) {
        super(msg);
    }
}
