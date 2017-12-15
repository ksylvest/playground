import _ from 'lodash';

const parse = (name, attribute = 'content') =>
  _.head(document.getElementsByName(name)).getAttribute(attribute);

export const ACTION_CABLE_URL = parse('action-cable-url');
export const CSRF_TOKEN = parse('csrf-token');
