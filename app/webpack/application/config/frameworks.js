import axios from 'axios';
import _ from 'lodash';

const defaults = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

_.each(defaults, (value, key) => {
  axios.defaults.headers.common[key] = value;
});

document.addEventListener('DOMContentLoaded', () => {
  const token = _.head(document.getElementsByName('csrf-token')).getAttribute('content');
  axios.defaults.headers.common['X-CSRF-Token'] = token;
});
