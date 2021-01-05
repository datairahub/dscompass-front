/* eslint-disable class-methods-use-this */

/**
 * ApiService class
 */
class ApiService {
  token = null;

  /**
   * Get final endpoint url
   */
  get(model) {
    const base = process.env.VUE_APP_API_URL;
    const api = 'api/';

    switch (model) {
      /* eslint-disable no-multi-spaces */
      case 'base':           return `${base}`;
      case 'media':          return `${base}media/`;
      case 'forms':          return `${base}${api}forms/`;
      case 'form':           return `${base}${api}forms/`;
      case 'formanswers':    return `${base}${api}form_answers/`;
      case 'formanswer':     return `${base}${api}form_answers/`;
      case 'login':          return `${base}token/access/`;
      case 'refreshToken':   return `${base}token/refresh/`;
      case 'logout':         return `${base}token/logout/`;
      case 'users':          return `${base}${api}users/`;
      case 'locales':        return `${base}${api}languages/`;
      default: break;
      /* eslint-enable no-multi-spaces */
    }
    return '/';
  }

  /**
   * Get headers for requests
   * - If the access token exists, return Auth Bearer,
   *   else send cookies with the request
   */
  getHeaders() {
    return this.token
      ? { headers: { Authorization: `Bearer ${this.token}` } }
      : { headers: {}, withCredentials: true };
  }

  clearToken() {
    this.token = null;
  }

  setToken(data) {
    this.token = data;
  }

  getToken() {
    return this.token;
  }
}

const API = new ApiService();

export default API;
