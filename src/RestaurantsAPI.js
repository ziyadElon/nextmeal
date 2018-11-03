const api_key = "6083160931d5a0435f2b1d23acb6d81a";
const api = "https://developers.zomato.com/api/v2.1";

const headers = {
  "Accept": "application/json",
  "user-key": api_key
}

const myLocation = {
  lat : 12.97,
  lon : 77.64
}

let requestUrl = `${api}/search?lat=${myLocation.lat}&lon=${myLocation.lon}&sort=rating&order=desc`;

export const getNearbyRes = () => 
  fetch(requestUrl, { headers })
    .then(response => response.json())
    .then(data => data.restaurants, 
          error => console.log("There was an error: " + error.message)
    )