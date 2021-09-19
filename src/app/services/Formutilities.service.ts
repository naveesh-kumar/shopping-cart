import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilitiesService {
  validationMessages: any = {
    username: {
      required: 'Username is required',
      minlength: 'Minimum of 3 characters required',
      maxlength: 'Maximum length reached',
    },
    password: {
      required: 'Password is required',
      minlength: 'Minimum of 8 characters required',
      maxlength: 'Maximum length reached',
      specialCharacterError: 'Require special character',
    },
  };
  constructor() {}

  shouldHaveOneSpecialCharacter(
    input: AbstractControl
  ): ValidationErrors | null {
    let symbol = new RegExp('[!@#$%^&*()<>?/*-+_~]');
    if (input.value.length > 7 && !symbol.test(input.value)) {
      return {
        specialCharacterError: true,
      };
    } else {
      return null;
    }
  }

  updateValidationMessages(form:FormGroup, formErrors:any) {
    let controls = Object.keys(form.controls);
    controls.forEach((x) => {
      //get the errors
      let errorObj: any = form.get(x)?.errors;
      formErrors[x] = '';
      if (errorObj) {
        let messageObj = this.validationMessages[x];
        for (let error of Object.keys(errorObj)) {
          formErrors[x] += messageObj[error];
          break;
        }
      }
    });
    return formErrors;
  }
}
