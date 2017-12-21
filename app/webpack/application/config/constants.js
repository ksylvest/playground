import _ from 'lodash';

const fetchMetaAttributeByName = (name, attribute = 'content') => {
  const element = _.head(document.getElementsByName(name));
  if (element) {
    return element.getAttribute(attribute);
  }
};

export const ACTION_CABLE_URL = fetchMetaAttributeByName('action-cable-url');
export const CSRF_TOKEN = fetchMetaAttributeByName('csrf-token');
