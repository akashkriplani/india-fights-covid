const Api = {
  baseUrl: 'https://cdn-api.co-vin.in/api'
};

export const Constants = {
  API_MESSAGE: {
    GET_DETAILS_SUCCESS: 'Details fetched successfully',
    GET_DISTRICT_SUCCESS: 'Districts fetched successfully.',
    GET_STATES_SUCCESS: 'States fetched successfully.',
    SWW_ERROR: 'Something went wrong! Please try again in some time.',
    USER_LOGIN_SUCCESS: 'User logged in successfully.',
    USER_LOGOUT_SUCCESS: 'User logged out successfully.'
  },
  BOOKED: 'Booked',
  FILTER_OPTIONS: [
    {
      DISPLAYNAME: 'Age 18+',
      VALUE: 18
    },
    {
      DISPLAYNAME: 'Age 45+',
      VALUE: 45
    },
    {
      DISPLAYNAME: 'Covidshield',
      VALUE: 'covishield'
    },
    {
      DISPLAYNAME: 'Covaxin',
      VALUE: 'covaxin'
    },
    {
      DISPLAYNAME: 'Sputnik V',
      VALUE: 'sputnik'
    },
    {
      DISPLAYNAME: 'Free',
      VALUE: 'free'
    },
    {
      DISPLAYNAME: 'Paid',
      VALUE: 'paid',
    }
  ],
  NO_OF_DAYS: 7,
  NOT_AVAILABLE: 'NA',
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100],
  PAGE_SIZE: 10,
  STARTING_TAB_INDEX: 0
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
