import axios from "axios";

axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = "csrftoken";
// // If I don't set this axios can add a header for the csrf token automatically with name X-XSRF-TOKEN
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

const deleteCookie = (cookieName) => {
  document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

function performBackendRequest(path, method = "GET", data = {}, headers = {}) {
  // Setting the X-CSRFToken header may be redundant as axios seems to set it automatically
  // by getting the value from the token. The xsrfCookieName above is probably used for that.
  // if (UNSAFE_HTTP_METHODS.includes(method)) {
  //   const csrfToken = getCookieValue("csrftoken");
  //   headers["X-CSRFToken"] = csrfToken;
  // }
  return axios({
    method,
    url: `${API_BASE_URL}${path}`,
    data,
    headers,
  });
}

export { deleteCookie, performBackendRequest };
