 // validator class i function sprawdza poprawność konta i przekazuje null do formControll

import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable } from "rxjs";
import { HttpService } from "./http.service";

export class AccountValidator{

  static createValidator(httpService: HttpService) : AsyncValidatorFn{
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return httpService
      .checkAccountNumber(control.value)
      .pipe(
        map((result: boolean) =>
          !result ? {accountInvalid: true}: null
        )
      )
    }
  }
 }


