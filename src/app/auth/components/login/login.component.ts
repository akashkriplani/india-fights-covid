import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DataService } from '../../../services/data.service';
import { NotifierService } from 'angular-notifier';
import { IConfirmOTPPayload, IConfirmOTPResponse, IGenerateOTPResponse } from '../../../interfaces';
import { Constants } from '../../../constants/Constants';
import { Notify } from '../../../shared/enumerations';
import { take } from 'rxjs/operators';


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
  public count: number = 1;
  public matcher = new MyErrorStateMatcher();
  public mobileNumberControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
    Validators.pattern('^[0-9]{10}$')
  ]);
  public showCounter: boolean = false;
  public showOTPTemplate: boolean;
  public txnId: string;
  private token: string;

  constructor(
    private dataService: DataService,
    private router: Router,
    private notifyService: NotifierService
  ) { }

  generateOTP(): void {
    this.dataService.generateOTP(this.mobileNumberControl.value)
      .pipe(take(1)).subscribe((response: IGenerateOTPResponse) => {
        this.showCounter = true;
        this.txnId = response.txnId;
        this.showOTPTemplate = true;
      }, () => {
        this.notifyService.notify(Notify.ERROR, Constants.API_MESSAGE.SWW_ERROR);
      });
  }

  verifyOTP(encryptedOTP: string): void {
    const payload: IConfirmOTPPayload = {
      otp: encryptedOTP,
      txnId: this.txnId
    }
    this.dataService.confirmOTP(payload)
      .pipe(take(1)).subscribe((response: IConfirmOTPResponse) => {
        this.token = response.token;
        if (this.token) {
          this.dataService.authStatusListener.next(true);
          this.notifyService.notify(Notify.SUCCESS, Constants.API_MESSAGE.USER_LOGIN_SUCCESS);
          this.router.navigate(['/']);
        }
      }, () => {
        this.notifyService.notify(Notify.ERROR, Constants.API_MESSAGE.SWW_ERROR);
    })
  }

  validateNumber(event: any): void {
    this.dataService.validateNumber(event);
  }

}
