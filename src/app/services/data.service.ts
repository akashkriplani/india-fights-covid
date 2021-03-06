import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ICalendarResponse, IConfirmOTPPayload, IConfirmOTPResponse, IDistrictsResponse, IDistrictWiseInfo, IGenerateOTPPayload, IGenerateOTPResponse, IStatesResponse } from '../interfaces';
import { DateSeparator } from '../shared/enumerations';
import { Url } from '../constants/Constants';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public authStatusListener = new Subject<boolean>();

  constructor(private _http: HttpClient, private router: Router) { }

  public calendarByDistrict(districtId: number): Observable<ICalendarResponse> {
    const payload = {
      district_id: districtId.toString(),
      date: this.getCurrentDate()
    };
    return this._http.get<ICalendarResponse>(Url.api.calendarByDistrict, { params: payload });
  }

  public calendarByPin(pincode: string): Observable<ICalendarResponse> {
    const payload = {
      date: this.getCurrentDate(),
      pincode: pincode
    };
    return this._http.get<ICalendarResponse>(Url.api.calendarByPin, { params: payload });
  }

  public confirmOTP(payload: IConfirmOTPPayload): Observable<IConfirmOTPResponse> {
    return this._http.post<IConfirmOTPResponse>(Url.api.verifyOTP, payload);
  }

  public findByDistrict(districtId: number): Observable<IDistrictWiseInfo> {
    const payload = {
      district_id: districtId.toString(),
      date: this.getCurrentDate()
    }

    return this._http.get<IDistrictWiseInfo>(Url.api.findByDistrict, { params: payload });
  }

  public findByPin(pincode: number): Observable<IDistrictWiseInfo> {
    const payload = {
      pincode: pincode.toString(),
      date: this.getCurrentDate()
    }
    return this._http.get<IDistrictWiseInfo>(Url.api.findByPin, { params: payload });
  }

  public generateOTP(mobile: string): Observable<IGenerateOTPResponse> {
    const requestPayload: IGenerateOTPPayload = { mobile };
    return this._http.post<IGenerateOTPResponse>(Url.api.generateOTP, requestPayload);
  }

  public getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  public getCurrentDate(currentDate: Date = null, nameOfMonth: boolean = false, separator: DateSeparator = DateSeparator.HYPHEN): string {
    const dateObj = currentDate ? currentDate : new Date();
    const date = dateObj.getDate();
    const monthOfYear = dateObj.getMonth() + 1;
    const monthNumber = monthOfYear < 10 ? '0' + monthOfYear : monthOfYear;
    const monthName = dateObj.toLocaleString('default', { month: 'short' });
    const month = nameOfMonth ? monthName : monthNumber;
    const year = dateObj.getFullYear();

    return date + separator + month + separator + year;
  }

  public getDistricts(stateId: number): Observable<IDistrictsResponse> {
    return this._http.get<IDistrictsResponse>(Url.api.districts + `/${stateId}`);
  }

  public getStates(): Observable<IStatesResponse> {
    return this._http.get<IStatesResponse>(Url.api.states);
  }

  public logout(): void {
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

  public validateNumber(event: any): void {
    const keyCode = event.keyCode;
    const excludedKeys = [8, 37, 39, 46];

    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }
}
