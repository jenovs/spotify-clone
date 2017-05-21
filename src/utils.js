
// function checkToken() {
//   console.log('checkToken called');
//   let token = localStorage.getItem('token');
//
//   if (!token) return false;
//
//   token = JSON.parse(token);
//
//   if (token.expiry_time < getCurrentTime()) return false;
//
//   return true;
// }

export const fetchToken = () => {
  console.log('fetchToken called');
  return fetch('http://localhost:3001')
  .then(res => res.json())
  .then(json => {
    const updToken = setExpiryTime(json);
    localStorage.setItem('token', JSON.stringify(updToken));
    return updToken;
  })
  .catch(err => console.log(err));
}

export const fetchFeatured = token => {
  return fetch('https://api.spotify.com/v1/browse/featured-playlists', {
    headers: new Headers({
      Authorization: "Bearer " + token.access_token,
    })
  })
  .then(res => res.json())
  .then(json => {
    if (json.error) throw json.error.message;
    return json;
  })
  .catch(err => {
    // TODO refactor this
    console.log('Error in fetchFeatured', err);
    return false;
  })
}

function setExpiryTime(json) {
  const expiry_time = json.expires_in + getCurrentTime() - 10;
  return {...json, expiry_time}
}

function getCurrentTime() {
  return Math.floor(Date.now() / 1000);
}
