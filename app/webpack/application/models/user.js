import axios from 'axios';

export default class User {
  constructor(name, email, password) {
    this.email = email;
    this.name = name;
    this.password = password;
  }

  save() {
    return axios.post('/user', {
      email: this.email, name: this.name, password: this.password,
    });
  }
}
