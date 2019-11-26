export function getClientUrl() {
  if (process.env.NODE_ENV === "production") {
    return "https://ryoko.gg";
  }
  return "http://localhost:3000";
}

export function getGoogleCallbackUrl() {
  if (process.env.NODE_ENV === "production") {
    return "https://ryoko.gg/auth/google/redirect";
  }
  return "http://localhost:5000/auth/google/redirect";
}
