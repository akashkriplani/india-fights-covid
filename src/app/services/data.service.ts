import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConfirmOTPPayload, IConfirmOTPResponse, IDistrictsResponse, IDistrictWiseInfo, IGenerateOTPPayload, IGenerateOTPResponse, IStatesResponse } from '../interfaces';
import { Observable } from 'rxjs';
import { Url } from '../constants/Constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  public confirmOTP(payload: IConfirmOTPPayload): Observable<IConfirmOTPResponse> {
    return this._http.post<IConfirmOTPResponse>(Url.api.verifyOTP, payload);
  }

  public generateOTP(mobile: string): Observable<IGenerateOTPResponse> {
    const requestPayload: IGenerateOTPPayload = { mobile };
    return this._http.post<IGenerateOTPResponse>(Url.api.generateOTP, requestPayload);
  }

  public getStates(): Observable<IStatesResponse> {
    return this._http.get<IStatesResponse>(Url.api.states);
  }

  public getDistricts(stateId: number): Observable<IDistrictsResponse> {
    return this._http.get<IDistrictsResponse>(Url.api.districts + `/${stateId}`);
  }

  public findByPin(pincode: number): Observable<IDistrictWiseInfo> {
    const payload = {
      pincode: pincode.toString(),
      date: this.getCurrentDate()
    }
    return this._http.get<IDistrictWiseInfo>(Url.api.findByPin, { params: payload });
  }

  public findByDistrict(districtId: number): Observable<IDistrictWiseInfo> {
    const payload = {
      district_id: districtId.toString(),
      date: this.getCurrentDate()
    }

    return this._http.get<IDistrictWiseInfo>(Url.api.findByDistrict, { params: payload });
  }

  private getCurrentDate(separator: string = '-'): string {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    return date + separator + month + separator + year;

  }
}