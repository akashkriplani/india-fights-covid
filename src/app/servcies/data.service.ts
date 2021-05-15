import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Url } from '../constants/Constants';
import { IDistrictsResponse, IDistrictWiseInfo, IStatesResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  public getStates(): Observable<IStatesResponse> {
    return this._http.get<IStatesResponse>(Url.api.states);
  }

  public getDistricts(stateId: number): Observable<IDistrictsResponse> {
    return this._http.get<IDistrictsResponse>(Url.api.districts + `/${stateId}`);
  }

  public findByPin(pincode: number): Observable<any> {
    const payload = {
      pincode: pincode.toString(),
      date: this.getCurrentDate()
    }
    return this._http.get<any>(Url.api.findByPin, { params: payload });
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
