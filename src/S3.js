/* eslint handle-callback-err:0 */
const AWS = require('aws-sdk')
const s3 = require('s3')
const fs = require('fs')

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
      // maxAsyncS3: 200,     // this is the default
      // s3RetryCount: 3,    // this is the default
      // s3RetryDelay: 1000, // this is the default
      // multipartUploadThreshold: 9971520, // this is the default (20 MB)
      // multipartUploadSize: 9028640, // this is the default (15 MB)

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
        reject(err)
      })
      uploader.on('progress', function() {
        // console.log('progress', uploader.progressMd5Amount, uploader.progressAmount, uploader.progressTotal)
      })
      uploader.on('end', function(url) {
        // console.log('done uploading::', url)
        resolve(url)
      })
      uploader.on('success', function(url) {
        // console.log('done uploading::', url)
        resolve(url)
      })
      // uploader.on('success', function(url) {
      //   // console.log('done uploading::', url)
      //   resolve(url)
      // })
    })
  }

  putObject (filePath, pathToremote) {
    var fileData = fs.readFileSync(filePath);     
    const self = this
    var s3 = new AWS.S3({
      accessKeyId: self.config.accessKeyId,
      secretAccessKey: self.config.secretAccessKey,
      region: self.config.region,
      signatureVersion: self.config.version
    })
    // AWS.config.loadFromPath({
     
    // });
    var params = {
      Bucket: self.config.bucket,
      Key: pathToremote,
      Body: fileData
      // ACL:'public-read'
    }
    s3.putObject(params, function (err, data) {
      if (err) {
        // console.log('Error uploading image: ', err)
        return err
      } else {
        return data
      }
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

