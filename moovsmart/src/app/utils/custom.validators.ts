import {FormControl} from '@angular/forms';

export function validateNumberOfBathrooms(control: FormControl) {
  if (control.value && Number.parseFloat(control.value) % 0.5) {
    return {invalidNumberOfBathrooms: true};
  }
  return null;
}

export function validateFileExtension(control: FormControl) {
  const fileName = control.value;
  if (fileName != null) {
    const fileExtension = fileName.split('.').pop().toLowerCase().trim();
    const allowedExtensions = ['jpeg', 'jpg', 'png', 'heic', 'gif', 'tiff'];
    if (allowedExtensions.includes(fileExtension)) {
      return 'Invalid file extension';
    }
  }
  return null;
}
