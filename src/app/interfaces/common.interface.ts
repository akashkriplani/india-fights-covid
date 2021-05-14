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
    address: string;
    available_capacity: number;
    block_name: string;
    center_id: number;
    date: string;
    district_name: string;
    fee: string;
    fee_type: string;
    from: string;
    lat: number;
    long: number;
    min_age_limit: number;
    name: string;
    pincode: number;
    session_id: string;
    slots: string[];
    state_name: string;
    to: string;
    vaccine: string;
}
