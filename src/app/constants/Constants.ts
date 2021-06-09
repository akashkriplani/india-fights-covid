const Constants = {
  baseUrl: 'https://cdn-api.co-vin.in/api'
};

export const Url = {
  api: {
    districts: Constants.baseUrl + '/v2/admin/location/districts',
    generateOTP: Constants.baseUrl + '/v2/auth/public/generateOTP',
    states: Constants.baseUrl + '/v2/admin/location/states',
    findByDistrict: Constants.baseUrl + '/v2/appointment/sessions/public/findByDistrict',
    findByPin: Constants.baseUrl + '/v2/appointment/sessions/public/findByPin',
    verifyOTP: Constants.baseUrl + '/v2/auth/public/confirmOTP'
  }
};
