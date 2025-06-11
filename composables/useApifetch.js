export default function (url, options = {}) {
  options.headers = options.headers || {};

  const token = useCookie("XSRF-TOKEN");
  const accessToken = useCookie("access_token"); // or localStorage, Pinia store, etc.

  if (token.value) {
    options.headers["X-XSRF-TOKEN"] = token.value;
  }
  if (accessToken.value) {
    options.headers["Authorization"] = `Bearer ${accessToken.value}`;
  }

  return useFetch("http://localhost:8000" + url, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...useRequestHeaders(["cookie"]),
      referer: "http://localhost:3000",
    },
  });
}
