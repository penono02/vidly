var refresh = require('google-token-refresh');
const googleClientId='228705790040-5fole74207dnlej1rq5a4b3dcvcq579e.apps.googleusercontent.com';
const googleClientSecret='dVCkZH2fRjHsQWluyOdxFt8o';
const refreshToken='4/gwAjWDsR-BurK4eyToFCDNVBOBus6jdTd5l9hJwvl9b2eXjX0mbvRy6CSnJD5zM9BAL5_b27SdIc47raori9V00';


refresh(refreshToken, googleClientId, googleClientSecret, function (err, json, res) {
  if (err) return handleError(err);
  if (json.error) return handleError(new Error(res.statusCode + ': ' + json.error));

  var newAccessToken = json.accessToken;
  if (! accessToken) {
    return handleError(new Error(res.statusCode + ': refreshToken error'));
  }
  var expireAt = new Date(+new Date + parseInt(json.expiresIn, 10));
  handleRefreshedData(newAccessToken, expireAt);
});



module.exports =  function handleRefreshedData(newAccessToken, expireAt){
    console.log(newAccessToken + '  ' + expireAt);
  }

function handleError(err){
  for (field in err.errors){
    console.log (err.errors[field].message);
  }
}
