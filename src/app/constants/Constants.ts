const Constants = {
  baseUrl: 'https://cdn-api.co-vin.in/api'
};

export const SocialMediaLinks = {
  facebook: 'https://www.facebook.com/akashkriplani25/',
  github: 'https://github.com/akashkriplani',
  instagram: 'https://www.instagram.com/kripstagram25/',
  linkedin: 'https://www.linkedin.com/in/akashkriplani25/',
  medium: 'https://akashkriplani.medium.com/',
  twitter: 'https://twitter.com/kriptweets',
  stackOverflow: 'https://stackoverflow.com/story/akashkriplani'
};

export const Url = {
  api: {
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
