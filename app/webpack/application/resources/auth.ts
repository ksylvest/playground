import axios from 'axios';

const PATH = '/api/auth';

export default class Auth {
  public static destroy() {
    return axios.delete(PATH);
  }

  private email?: string;
  private password?: string;

  constructor(email?: string, password?: string) {
    this.email = email;
    this.password = password;
  }

  public save() {
    return axios.post(PATH, {
      email: this.email || '',
      password: this.password || '',
    });
  }
}
