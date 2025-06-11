
export const $api = (url, options = {}, headers = {}) => {
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
    baseURL: "http://localhost:8000",
    headers: allHeaders,
    credentials: "include",
  });

  return apiFetch(url, {
    ...options,
  });
};
