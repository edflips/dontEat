import axios from 'axios'

export function getPlacesFromFSA(lat, long) {
  return (
    {
      baseURL: 'http://api.ratings.food.gov.uk/Establishments/',
      timeout: 10000,
      headers: {'x-api-version': '2', 'accept': 'application/json', 'content-type': 'application/json'},
      params: {
        latitude: lat,
        longitude: long,
        maxDistanceLimit: 1,
        sortOptionKey: 'distance',
        businessTypeId: 1,
        pageSize: 50,
      },
      validateStatus: status => status >= 200 && status < 300
    }
  )
}

// export const getPlacesFromFSA = (lat, long) => {
//   return (
//     'lat' + lat
//   )
// }