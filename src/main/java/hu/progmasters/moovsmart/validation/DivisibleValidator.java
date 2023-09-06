package hu.progmasters.moovsmart.validation;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.constraints.PastOrPresent;
import java.lang.annotation.Annotation;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;


public class DivisibleValidator implements ConstraintValidator<DivisibleByHalf, Double> {
    @Override
    public boolean isValid(Double aDouble, ConstraintValidatorContext constraintValidatorContext) {
        if (aDouble == null) {
            return false;
        }

        return aDouble % 0.5 == 0;
    }
}
