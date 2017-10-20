import Vue from 'vue';

export default class Errors {
  any() {
    return !!this.data;
  }

  seed(data) {
    Vue.set(this, 'data', data);
  }

  clear(field) {
    debugger
    Vue.delete(this.data, field);
  }

  reset() {
    Vue.delete(this, 'data');
  }

  has(field) {
    return this.data && !!this.data[field];
  }

  get(field) {
    if (this.data) {
      return this.data[field];
    }
  }
}
