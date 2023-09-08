import {HttpErrorResponse} from '@angular/common/http';
import {FormGroup} from '@angular/forms';

export function validationHandler(error: Error, form: FormGroup) {
  if (error instanceof HttpErrorResponse && error.status === 400) {
    for (const errorFromServer of error.error.fieldErrors) {
      const formControl = form.get(errorFromServer.field);
      if (formControl) {
        formControl.setErrors({serverError: errorFromServer.message});
      }
    }
  }
}

export function errorHandler(error: Error) {
  if (error instanceof HttpErrorResponse) {
    return error.error.details;
  } else {
    return null;
  }
}


