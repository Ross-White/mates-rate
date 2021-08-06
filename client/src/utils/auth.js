import { decode } from "jsonwebtoken";

const ID_TOKEN = "id_token";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem(ID_TOKEN);
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem(ID_TOKEN);
  }

  login(idToken) {
    localStorage.setItem(ID_TOKEN, idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem(ID_TOKEN);
    window.location.reload();
  }
}

export default new AuthService();
