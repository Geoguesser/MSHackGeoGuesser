const localStorageKeys = {
  sessionTicket: `gs_sessionTicket`,
  playFabId: `gs_playfabId`,
  username: `gs_username`
};

const { REACT_APP_PLAYFAB_GAME_ID } = process.env;
const { PlayFab, PlayFabClientSDK } = window;

function getUser(): string | null {
  if (
    localStorage.getItem(localStorageKeys.sessionTicket) &&
    localStorage.getItem(localStorageKeys.playFabId)
  ) {
    return localStorage.getItem(localStorageKeys.username);
  }
  return null;
}

function login(
  username: string
): Promise<{ data: { SessionTicket: string; PlayFabId: string } } | null> {
  const settings = {
    TitleId: REACT_APP_PLAYFAB_GAME_ID,
    CustomId: username,
    CreateAccount: true
  };
  PlayFab.settings.titleId = REACT_APP_PLAYFAB_GAME_ID;
  return new Promise(resolve => {
    PlayFabClientSDK.LoginWithCustomID(
      settings,
      (res: { data: { SessionTicket: string; PlayFabId: string } } | null, err: any) => {
        if (res !== null) {
          localStorage.setItem(localStorageKeys.sessionTicket, res.data.SessionTicket);
          localStorage.setItem(localStorageKeys.playFabId, res.data.PlayFabId);
          resolve(res);
        } else {
          console.log("loginwithcustomid error", err);
        }
      }
    );
  });
}

function updateUsername(username: string): Promise<any> {
  return new Promise(resolve => {
    PlayFabClientSDK.UpdateUserTitleDisplayName({ DisplayName: username }, (res: any, err: any) => {
      if (res) {
        localStorage.setItem(localStorageKeys.username, username);
        resolve(res);
      } else {
        console.log("updateusertitledisplayname error", err);
      }
    });
  });
}

export { login, localStorageKeys, getUser, updateUsername };
