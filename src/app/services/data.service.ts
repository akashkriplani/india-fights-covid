import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICalendarByPinPayload, ICalendarByPinResponse, IConfirmOTPPayload, IConfirmOTPResponse, IDistrictsResponse, IDistrictWiseInfo, IGenerateOTPPayload, IGenerateOTPResponse, IStatesResponse } from '../interfaces';
import { Observable } from 'rxjs';
import { Url } from '../constants/Constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  public calendarByPin(pincode: string): Observable<ICalendarByPinResponse> {
    const payload = {
      date: this.getCurrentDate(),
      pincode: pincode
    }
    return this._http.get<ICalendarByPinResponse>(Url.api.calendarByPin, { params: payload });
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

  public getDistricts(stateId: number): Observable<IDistrictsResponse> {
    return this._http.get<IDistrictsResponse>(Url.api.districts + `/${stateId}`);
  }

  public getStates(): Observable<IStatesResponse> {
    return this._http.get<IStatesResponse>(Url.api.states);
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

  private getCurrentDate(separator: string = '-'): string {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    return date + separator + month + separator + year;
  }
}
