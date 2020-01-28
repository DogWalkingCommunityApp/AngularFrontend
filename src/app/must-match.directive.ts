import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';

// custom validator to check that two fields match
const MustMatch = (matchers: string[][]) => {
    return (formGroup: FormGroup) => {
      matchers.forEach(matchersArray => {
        if (matchersArray.length === 2) {
          const controlName = matchersArray[0]
          const matchingControlName = matchersArray[1]

          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];
        
          // return null if controls haven't initialised yet
          if (!control || !matchingControl) {
            return null;
          }

          // return null if another validator has already found an error on the matchingControl
          if (matchingControl.errors && !matchingControl.errors.mustMatch) {
              return null;
          }

          // set error on matchingControl if validation fails
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ mustMatch: true });
          } else {
              matchingControl.setErrors(null);
          }
        } else {
          const checkbox = formGroup.controls[matchersArray[0]];

          if(!checkbox) {
            return null;
          }

          if (!checkbox.value) {
            checkbox.setErrors({ mustMatch: true });
          } else {
            checkbox.setErrors(null);
          }
        }
      })
    }
}

@Directive({
    selector: '[mustMatch]',
    providers: [{ provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true }]
})
export class MustMatchDirective implements Validator {
    @Input('mustMatch') mustMatch: string[][] = [];

    validate(formGroup: FormGroup): ValidationErrors {
        return (MustMatch(this.mustMatch)(formGroup) as unknown as ValidationErrors); // TODO: This is dirty, we need to return the expected types
    }
}
