import {FormControl} from '@angular/forms';

export function validateNumberOfBathrooms(control: FormControl) {
    if (control.value && Number.parseFloat(control.value) % 0.5) {
        return {invalidNumberOfBathrooms: true};
    }
    return null;
}
