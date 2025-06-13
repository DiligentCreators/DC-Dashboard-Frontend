export default function (url, options = {}) {
  options.headers = options.headers || {};

  const config = useRuntimeConfig();
  const token = useCookie("XSRF-TOKEN");
  const accessToken = useCookie("access_token");

  if (token.value) {
    options.headers["X-XSRF-TOKEN"] = token.value;
  }
  if (accessToken.value) {
    options.headers["Authorization"] = `Bearer ${accessToken.value}`;
  }

  return useFetch(config.public.apiBaseUrl + url, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...useRequestHeaders(["cookie"]),

    },
  });
}
