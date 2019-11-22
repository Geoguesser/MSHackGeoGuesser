export function urlResolver(): string {
  if (process.env.NODE_ENV === "production") {
    return "https://ryoko-dev.herokuapp.com";
  } else {
    return "";
  }
}
