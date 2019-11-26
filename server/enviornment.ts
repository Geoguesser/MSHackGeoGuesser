import { getGoogleCallbackUrl, getClientUrl } from "./utils/url-resolver";

const env = {
  enviornment: process.env.NODE_ENV || "development",
  database: {
    uri: process.env.HEROKU_POSTGRES_URI || "",
    password: process.env.HEROKU_POSTGRES_PASSWORD || "",
    port: process.env.HEROKU_POSTGRES_PORT || "",
    username: process.env.HEROKU_POSTGRES_USER || "",
    name: process.env.HEROKU_POSTGRES_DATABASE || "",
    host: process.env.HEROKU_POSTGRES_HOST || ""
  },
  authentication: {
    google: {
      clientId: process.env.GOOGLE_SIGN_IN_CLIENTID || "",
      clientSecret: process.env.GOOGLE_SIGN_IN_SECRET || "",
      redirectUrl: getGoogleCallbackUrl()
    }
  },
  clientURL: getClientUrl(),
  serverPort: process.env.PORT || 5000,
  expressSessionSecret: process.env.EXPRESS_SESSION_SECRET || ""
};

export { env };
