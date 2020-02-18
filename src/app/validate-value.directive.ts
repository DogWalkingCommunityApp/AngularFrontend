import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';

const validateEmail = (email: string): boolean => {
  return email.length > 5 && email.indexOf('@') !== -1;
}

const validateNames = (name: string) => {
  return name.length >= 3;
}

const validatePassword = (password: string) => {
  return password.length >= 8;
}

const validateBirthday = (birthdate: string) => {
  if(!birthdate) {
    return false;
  }

  const birthTime: number = new Date(birthdate).getTime();
  const currentTime: number = new Date().getTime();
  const birthYear: number = (currentTime - birthTime) / 1000 / 60 / 60 / 24 / 365;

  return birthYear >= 18;
}

const validationFunctions = {
  validateEmail,
  validateNames,
  validatePassword,
  validateBirthday
}

// custom validator to check that two fields match
const ValidateValue = (matchers: string[][]) => {
    return (formGroup: FormGroup) => {
      matchers.forEach(matchersArray => {
        const validationFunction: string = matchersArray[0];
        const validationField: string = matchersArray[1];

        const control = formGroup.controls[validationField];

        if (!control) {
          return null;
        }

        // return null if another validator has already found an error on the matchingControl
        if (control.errors && !control.errors.validateValue) {
            return null;
        }



        if (!validationFunctions[validationFunction] || !validationFunctions[validationFunction](control.value)) {
            control.setErrors({ validateValue: true });
        } else {
            control.setErrors(null);
        }
      })
    }
}

@Directive({
    selector: '[validateValue]',
    providers: [{ provide: NG_VALIDATORS, useExisting: ValidateValueDirective, multi: true }]
})
export class ValidateValueDirective implements Validator {
    @Input('validateValue') validateValue: string[][] = [];

    validate(formGroup: FormGroup): ValidationErrors {
        return (ValidateValue(this.validateValue)(formGroup) as unknown as ValidationErrors); // TODO: This is dirty, we need to return the expected types
    }
}