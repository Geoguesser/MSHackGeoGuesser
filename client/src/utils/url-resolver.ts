const isProd = process.env.NODE_ENV === "production";

export function urlResolver(): string {
  if (isProd) {
    return "https://ryoko-dev.herokuapp.com";
  } else {
    return "http://localhost:5000";
  }
}

export const serverUrl = isProd ? "https://ryoko-dev.herokuapp.com" : "http://localhost:5000";
