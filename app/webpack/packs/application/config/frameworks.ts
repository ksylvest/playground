import axios from 'axios'
import _ from 'lodash'

axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

document.addEventListener("DOMContentLoaded", function () {
  const token = _.head(document.getElementsByName('csrf-token')).getAttribute('content')
  axios.defaults.headers.common['X-CSRF-Token'] = token
})
