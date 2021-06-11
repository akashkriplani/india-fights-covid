const Constants = {
  baseUrl: 'https://cdn-api.co-vin.in/api'
};

export const Url = {
  api: {
    calendarByCenter: Constants.baseUrl + '/v2/appointment/sessions/public/calendarByCenter',
    calendarByDistrict: Constants.baseUrl + '/v2/appointment/sessions/public/calendarByDistrict',
    calendarByPin: Constants.baseUrl + '/v2/appointment/sessions/public/calendarByPin',
    districts: Constants.baseUrl + '/v2/admin/location/districts',
    findByDistrict: Constants.baseUrl + '/v2/appointment/sessions/public/findByDistrict',
    findByPin: Constants.baseUrl + '/v2/appointment/sessions/public/findByPin',
    generateOTP: Constants.baseUrl + '/v2/auth/public/generateOTP',
    states: Constants.baseUrl + '/v2/admin/location/states',
    verifyOTP: Constants.baseUrl + '/v2/auth/public/confirmOTP'
  }
};
