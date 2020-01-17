import { urlResolver } from "./url-resolver";

function ryokoApi<T>(endpoint: string): Promise<T> {
  const options: RequestInit = {
    credentials: "include"
  };

  return fetch(`${urlResolver()}${endpoint}`, options).then(response => {
    return response.json();
  });
}

export { ryokoApi };
