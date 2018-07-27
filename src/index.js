var S3 = require('./S3')
var Google = require('./Google')

var Uploader = (function () {
  var uploaderService
  return {
    init: function({drive, config}) {
      switch (drive) {
        case 's3':
          uploaderService = new S3(config)
          break
        case 'google':
          uploaderService = new Google(config)
          break
      }
    },
    upload: function(...args) {
      return uploaderService.upload(...args)
    },
    getUrl: function(...args) {
      return uploaderService.getUrl(...args)
    },
    deleteFile: function(...args) {
      return uploaderService.deleteFile(...args)
    }
  }
})()
module.exports = Uploader
