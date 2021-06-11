export interface IDistrictsResponse {
    districts: IDistricts[];
}

export interface IDistricts {
    district_id: number;
    district_name: string;
}

export interface IStatesResponse {
    states: IStates[];
}

export interface IStates {
    state_id: number;
    state_name: string;
}

export interface IDistrictWiseInfo {
    sessions: ISessions[];
}

export interface ISessions {
  address?: string;
  available_capacity: number;
  available_capacity_dose1: number;
  available_capacity_dose2: number;
  block_name?: string;
  center_id?: number;
  date: string;
  district_name?: string;
  fee?: string;
  fee_type?: string;
  from?: string;
  lat?: number;
  long?: number;
  min_age_limit: number;
  name?: string;
  pincode?: number;
  session_id: string;
  slots: string[];
  state_name?: string;
  to?: string;
  vaccine: string;
}

export interface IGenerateOTPPayload {
  mobile: string;
}

export interface IGenerateOTPResponse {
  txnId: string;
}

export interface IConfirmOTPPayload {
  otp: string;
  txnId: string;
}

export interface IConfirmOTPResponse {
  token: string;
}

export interface ICalendarResponse {
  centers: ICenters[];
}

export interface ICenters {
  address: string;
  block_name: string;
  center_id: number;
  district_name: string;
  fee_type: string;
  from: string;
  lat: number;
  long: number;
  name: string;
  pincode: number;
  sessions: ISessions[];
  state_name: string;
  to: string;
}
