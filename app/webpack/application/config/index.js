import './fontawesome';

import { CSRF_TOKEN } from './constants';

import axios from 'axios';
import _ from 'lodash';

const defaults = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

_.each(defaults, (value, key) => {
  axios.defaults.headers.common[key] = value;
});

axios.defaults.headers.common['X-CSRF-Token'] = CSRF_TOKEN;
