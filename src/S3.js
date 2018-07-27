/* eslint handle-callback-err:0 */
const AWS = require('aws-sdk')
const s3 = require('s3')

class S3 {
  constructor (config) {
    this.config = config
    this.awsS3Client = new AWS.S3({
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      region: config.region,
      signatureVersion: config.version
    })

    this.client = s3.createClient({
      s3Client: this.awsS3Client
    })
  }

  upload (file, pathToRemote) {
    const self = this
    return new Promise((resolve, reject) => {
      var params = {
        localFile: file,

        s3Params: {
          Bucket: self.config.bucket,
          Key: pathToRemote
          // other options supported by putObject, except Body and ContentLength.
          // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
        }
      }
      var uploader = self.client.uploadFile(params)
      uploader.on('error', function(err) {
        // console.error('unable to upload:', err.stack)
        reject(err)
      })
      // uploader.on('progress', function() {
      //   console.log('progress', uploader.progressMd5Amount, uploader.progressAmount, uploader.progressTotal)
      // })
      uploader.on('end', function(url) {
        // console.log('done uploading::', url)
        resolve(url)
      })
      uploader.on('success', function(url) {
        // console.log('done uploading::', url)
        resolve(url)
      })
      uploader.on('success', function(url) {
        // console.log('done uploading::', url)
        resolve(url)
      })
    })
  }

  getUrl (remotePath) {
    return `https://s3.${this.config.region}.amazonaws.com/${this.config.bucket}/${remotePath}`
  }
  
  deleteFile (key) {
    const self = this
    var params = {
      Bucket: this.config.bucket, 
      Delete: { // required
        Objects: [ // required
          {
            Key: key // required
          },
        ],
      },
    };

    return new Promise((resolve, reject) => {
      this.awsS3Client.deleteObjects(params, function(err, data) {
        if (err) {
          console.log(err, err.stack); // an error occurred
          return reject(err)
        }
        
        resolve()
      });
    })

  }
    

}

module.exports = S3

