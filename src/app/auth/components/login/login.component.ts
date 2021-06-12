import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DataService } from '../../../services/data.service';
import { take } from 'rxjs/operators';
import { IConfirmOTPPayload, IConfirmOTPResponse, IGenerateOTPResponse } from '../../../interfaces';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'ifc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  public count: number = 15;
  public matcher = new MyErrorStateMatcher();
  public mobileNumberControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
    Validators.pattern('^[0-9]{10}$')
  ]);
  public showCounter: boolean = false;
  public showOTPTemplate: boolean;
  public txnId: string;

  constructor(private dataService: DataService, private router: Router) { }

  generateOTP(): void {
    this.dataService.generateOTP(this.mobileNumberControl.value)
      .pipe(take(1)).subscribe((response: IGenerateOTPResponse) => {
        this.showCounter = true;
        this.txnId = response.txnId;
        this.showOTPTemplate = true;
      });
  }

  verifyOTP(encryptedOTP: string): void {
    const payload: IConfirmOTPPayload = {
      otp: encryptedOTP,
      txnId: this.txnId
    }
    this.dataService.confirmOTP(payload)
      .pipe(take(1)).subscribe((response: IConfirmOTPResponse) => {
        this.router.navigate(['/']);
    })
  }

  validateNumber(event): void {
    this.dataService.validateNumber(event);
  }

}
