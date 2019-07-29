const rad = function(x) {
  return (x * Math.PI) / 180;
};

const getDistance = function(p1, p2) {
  const R = 6378137; // Earth’s mean radius in meter
  const dLat = rad(p2.lat - p1.lat);
  const dLong = rad(p2.lng - p1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d; // returns the distance in meter
};

const getScore = (pt1, pt2) => {
  const distance = getDistance(pt1, pt2) / 1000;
  return Math.round(5000 * Math.exp(-distance / 1200)) + 1;
};

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function pickCity() {
  const json = require("../assets/cities.json");
  const item = json[Math.floor(Math.random() * json.length)];
  return item;
}

function getLat(lat) {
  const min = lat - 0.5;
  const max = lat + 0.5;
  const l = random(min, max);
  return l;
}

function getLng(lng) {
  const min = lng - 0.5;
  const max = lng + 0.5;
  const l = random(min, max);
  return l;
}

function playFabLogin(username, cb = () => {}) {
  const { REACT_APP_PLAYFAB_GAME_ID } = process.env;
  const { PlayFab, PlayFabClientSDK } = window;
  const loginSettings = {
    TitleId: REACT_APP_PLAYFAB_GAME_ID,
    CustomId: username,
    CreateAccount: true
  };

  if(!username || username.length < 3) {
    alert(`Your proposed username ${username} just isn't getting the job done. Try something unique with more than 2 letters!`);
    return;
  }

  PlayFab.settings.titleId = REACT_APP_PLAYFAB_GAME_ID;
  // Currently, you need to look up the correct format for this object in the API-docs:
  // https://api.playfab.com/Documentation/Client/method/LoginWithCustomID
  PlayFabClientSDK.LoginWithCustomID(loginSettings, (res, err) => {
    if (res !== null) {
      PlayFabClientSDK.UpdateUserTitleDisplayName({ DisplayName: username }, (res, err) => {
        if (res) {
          // TODO: data doesn't return SessionTicket for me
          document.cookie = `geoguessr_session_cookie=${res.data.SessionTicket}`;
          document.cookie = `geoguessr_initials=${username}`;
          cb();
        } else {
          // log error here

          // handle duplicate user
          cb({ error: err.error });
        }
      });
    } else {
      // log error here
    }
  });
}

function getUsernameCookie() {
  return document.cookie.replace(/(?:(?:^|.*;\s*)geoguessr_initials\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

export { getDistance, getScore, getLat, getLng, pickCity, playFabLogin, getUsernameCookie };
