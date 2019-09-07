import { MsalAuthProvider, LoginType } from "react-aad-msal";
const { REACT_APP_CLIENT_ID } = process.env;

const config = {
  auth: {
    authority: "https://login.microsoftonline.com/common",
    clientId: REACT_APP_CLIENT_ID
    //redirectUri: '<OPTIONAL REDIRECT URI'
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true
  }
};

const authenticationParameters = {
  scopes: [
    "user.read"
    //'https://<your-tenant-name>.onmicrosoft.com/<your-application-name>/<scope (i.e. demo.read)>'
  ]
};

export const authProvider = new MsalAuthProvider(config, authenticationParameters, LoginType.Popup);
