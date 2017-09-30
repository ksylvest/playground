import axios from 'axios';

export default class User {
  private name: string
  private email: string
  private password: string

  constructor(name: string, email: string, password: string) {
    this.name = name
    this.email = email
    this.password = password
  }

  public save() {
    return axios.post('/user', {
      name: this.name,
      email: this.email,
      password: this.password,
    })
  }
}
