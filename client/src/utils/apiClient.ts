import { urlResolver } from "./url-resolver";

function ryokoApi(endpoint: string): Promise<any> {
  const options: RequestInit = {
    credentials: "include"
  };

  return fetch(`${urlResolver()}${endpoint}`, options).then(response => {
    return response.json();
  });
}

export { ryokoApi };
