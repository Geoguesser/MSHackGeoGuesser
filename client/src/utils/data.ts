export async function getData<T>(endpoint: string): Promise<T> {
  const data = await (await fetch(endpoint)).json();
  return data;
}
