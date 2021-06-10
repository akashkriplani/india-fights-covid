import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DataService } from '../../../services/data.service';
import { take } from 'rxjs/operators';
import { IConfirmOTPPayload, IConfirmOTPResponse, IGenerateOTPResponse } from 'src/app/interfaces';

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

export class LoginComponent implements OnInit {
  public count: number = 0;
  public matcher = new MyErrorStateMatcher();
  public mobileNumberControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{10}$')
  ]);
  public txnId: string;
  public showOTPTemplate: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  generateOTP(): void {
    this.dataService.generateOTP(this.mobileNumberControl.value)
      .pipe(take(1)).subscribe((response: IGenerateOTPResponse) => {
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
      console.log(response);
    })
  }

  validateNumber(event): void {
    const keyCode = event.keyCode;

    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }

}
