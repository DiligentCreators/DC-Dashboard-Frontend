
export const $api = (url, options = {}, headers = {}) => {
  const config = useRuntimeConfig();
  const token = useCookie("XSRF-TOKEN");

  // Add CSRF token header if available
  if (token.value) {
    headers["X-XSRF-TOKEN"] = token.value;
  }

  const isFormData = options.body instanceof FormData;

  const allHeaders = {
    Accept: "application/json",
    ...headers,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  const apiFetch = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    headers: allHeaders,
    credentials: "include",
  });

  return apiFetch(url, {
    ...options,
  });
};
