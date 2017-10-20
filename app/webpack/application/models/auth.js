import axios from 'axios';

export default class Auth {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  save() {
    return axios.post('/auth', {
      email: this.email, password: this.password,
    });
  }
}
