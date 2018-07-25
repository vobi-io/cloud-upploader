/* eslint handle-callback-err:0 */

class Google {

  constructor (props) {
    console.log('Google constructor', props)
  }

  upload (...args) {
    console.log('Hi from Google', ...args)
  }

}

module.exports = Google

