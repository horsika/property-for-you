package hu.progmasters.moovsmart.exception;

import org.springframework.transaction.UnexpectedRollbackException;

public class BookingFailedException extends UnexpectedRollbackException {


    public BookingFailedException(String msg) {
        super(msg);
    }


}
