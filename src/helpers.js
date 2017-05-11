function getToken() {
  console.log('getToken called');
  // TODO Add token expiry time
  fetch('http://localhost:3001')
  .then(res => res.json())
  .then(json => localStorage.setItem('token', JSON.stringify(json)))
  .catch(err => console.log(err));
}

module.exports = {
  getToken,
}
