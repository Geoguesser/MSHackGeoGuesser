const localStorageKeys = {
  sessionTicket: `gs_sessionTicket`,
  playFabId: `gs_playfabId`,
  username: `gs_username`,
  jwtAccessToken: `gs_jwtAccessToken`,
  jwtIdToken: `gs_jwtIdToken`
};

const { REACT_APP_PLAYFAB_GAME_ID } = process.env;
const { PlayFab, PlayFabClientSDK } = window;

function getUser() {
  if (localStorage.getItem(localStorageKeys.username)) {
    return localStorage.getItem(localStorageKeys.username);
  }
  return null;
}

function setUser(user) {
  localStorage.setItem(localStorageKeys.username, user.account.name);
  localStorage.setItem(localStorageKeys.jwtAccessToken, user.jwtAccessToken);
  localStorage.setItem(localStorageKeys.jwtIdToken, user.jwtIdToken);
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
      } else {
        console.log("loginwithcustomid error", err);
      }
    });
  });
}

function updateUsername(username) {
  return new Promise(resolve => {
    PlayFabClientSDK.UpdateUserTitleDisplayName({ DisplayName: username }, (res, err) => {
      if (res) {
        localStorage.setItem(localStorageKeys.username, username);
        resolve(res);
      } else {
        console.log("updateusertitledisplayname error", err);
      }
    });
  });
}

export { login, localStorageKeys, getUser, updateUsername, setUser };
