import _ from 'lodash';

export default (words) => {
  if (words.length > 2) {
    return _.initial(words).join(', ') + ' and ' + _.last(words);
  } else {
    return words.join(' and ');
  }
};
