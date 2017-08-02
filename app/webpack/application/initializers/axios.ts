import axios from 'axios';
import { each } from 'lodash';

import { CSRF_TOKEN } from '../config/constants';

const DEFAULTS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-CSRF-Token': CSRF_TOKEN,
};

each(DEFAULTS, (value, key) => {
  axios.defaults.headers.common[key] = value;
});
