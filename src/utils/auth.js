function login(username, cb = () => {}) {
  const { REACT_APP_PLAYFAB_GAME_ID } = process.env;
  const { PlayFab, PlayFabClientSDK } = window;

  const settings = {
    TitleId: REACT_APP_PLAYFAB_GAME_ID,
    CustomId: username,
    CreateAccount: true
  };

  PlayFab.settings.titleId = REACT_APP_PLAYFAB_GAME_ID;

  PlayFabClientSDK.LoginWithCustomID(settings, (res, err) => {
    if (res !== null) {
      localStorage.setItem(`gs_sessionTicket`, res.data.SessionTicket);
      localStorage.setItem(`gs_playfabId`, res.data.PlayFabId);
      PlayFabClientSDK.UpdateUserTitleDisplayName({ DisplayName: username }, (res, err) => {
        if (res) {
          localStorage.setItem(`gs_username`, username);
          cb();
        } else {
          // log error here
          // handle duplicate user
          // cb({ error: err.error });
        }
      });
    } else {
      // log error here
    }
  });
}

export { login };
