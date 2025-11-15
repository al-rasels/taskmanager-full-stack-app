class SessionHelper {
  setToken(token) {
    localStorage.setItem("token", token);
  }
  getToken() {
    return localStorage.getItem("token");
  }
  removeToken() {
    localStorage.removeItem("token");
  }
  setUserData(userData) {
    localStorage.setItem("userData", JSON.stringify(userData));
  }
  getUserData() {
    return JSON.parse(localStorage.getItem("userData"));
  }
  removeUserData() {
    localStorage.clear();
    window.location.href = "/login";
  }
}
export const {
  getUserData,
  setUserData,
  removeUserData,
  getToken,
  setToken,
  removeToken,
} = new SessionHelper();
export default SessionHelper;
