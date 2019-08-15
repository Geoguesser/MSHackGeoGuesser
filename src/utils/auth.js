const localStorageKeys = {
  sessionTicket: `gs_sessionTicket`,
  playFabId: `gs_playfabId`,
  username: `gs_username`
};

const { REACT_APP_PLAYFAB_GAME_ID } = process.env;
const { PlayFab, PlayFabClientSDK } = window;

function getUser() {
  if (
    localStorage.getItem(localStorageKeys.sessionTicket) &&
    localStorage.getItem(localStorageKeys.playFabId)
  ) {
    return localStorage.getItem(localStorageKeys.username);
  }
  return null;
}

function login(username, cb = () => {}) {
  const settings = {
    TitleId: REACT_APP_PLAYFAB_GAME_ID,
    CustomId: username,
    CreateAccount: true
  };
  PlayFab.settings.titleId = REACT_APP_PLAYFAB_GAME_ID;
  return new Promise(resolve => {
    PlayFabClientSDK.LoginWithCustomID(settings, (res, err) => {
      if (res !== null) {
        localStorage.setItem(localStorageKeys.sessionTicket, res.data.SessionTicket);
        localStorage.setItem(localStorageKeys.playFabId, res.data.PlayFabId);
        resolve(res);
      }
    });
  });
}

function updateUsername(username) {
  console.log(username);
  return new Promise(resolve => {
    PlayFabClientSDK.UpdateUserTitleDisplayName({ DisplayName: username }, (res, err) => {
      console.log(res, err);
      if (res) {
        localStorage.setItem(localStorageKeys.username, username);
        resolve(res);
      }
    });
  });
}

export { login, localStorageKeys, getUser, updateUsername };
