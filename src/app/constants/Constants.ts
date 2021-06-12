const Api = {
  baseUrl: 'https://cdn-api.co-vin.in/api'
};

export const Constants = {
  NO_OF_DAYS: 7
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
    calendarByDistrict: Api.baseUrl + '/v2/appointment/sessions/public/calendarByDistrict',
    calendarByPin: Api.baseUrl + '/v2/appointment/sessions/public/calendarByPin',
    districts: Api.baseUrl + '/v2/admin/location/districts',
    findByDistrict: Api.baseUrl + '/v2/appointment/sessions/public/findByDistrict',
    findByPin: Api.baseUrl + '/v2/appointment/sessions/public/findByPin',
    generateOTP: Api.baseUrl + '/v2/auth/public/generateOTP',
    states: Api.baseUrl + '/v2/admin/location/states',
    verifyOTP: Api.baseUrl + '/v2/auth/public/confirmOTP'
  }
};
