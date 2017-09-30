import axios from 'axios';

export default class Auth {
  private email: string
  private password: string

  constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }

  public save() {
    return axios.post('/auth', {
      email: this.email,
      password: this.password,
    })
  }
}
