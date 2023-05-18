import axios from "axios";

axios.defaults.withCredentials = true; // even for get requests if demand session authentication
axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.xsrfHeaderName = "X-CSRFToken";

const API_BASE_URL = "http://localhost:8000/api/";

const UNSAFE_HTTP_METHODS = ["DELETE", "PATCH", "POST", "PUT"];

const getCookieValue = (cookieName) => {
  const cookie = document.cookie.match(
    "(^|;)\\s*" + cookieName + "\\s*=\\s*([^;]+)"
  );
  const cookieValue = cookie ? cookie.pop() : null;
  return cookieValue;
};

function performBackendRequest(path, method = "GET", data = {}, headers = {}) {
  if (UNSAFE_HTTP_METHODS.includes(method)) {
    const csrfToken = getCookieValue("csrftoken");
    headers["X-CSRFToken"] = csrfToken;
  }
  return axios({
    method,
    url: `${API_BASE_URL}${path}`,
    data,
    headers,
  });
}

export { performBackendRequest };
