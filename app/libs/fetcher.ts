export const fetcher = async <T>(url: string): Promise<T> => {
  const resp = await fetch(url);
  if (!resp.ok) throw new Error("Failed to fetch");
  return resp.json() as Promise<T>;
};