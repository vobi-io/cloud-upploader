# Node.js Cloud storage file uploader

Painless file uploader to cloud storages for Node.js

### Install 

```
npm i -S https://github.com/vobi-io/cloud-upploader
```

### Config

make sure initilize upload 
you can use `s3` or `google` cloud storage and make sure you pass configs for selected provder
place these pease of code in your `index.js` or whatever is your main .js file


```js
const Uploader = require('uploader')
Uploader.init({ drive: 'amazon', config: {} })
```

config for Amazon S3

```js
accessKeyId: 'XXXXXXXXXXXXXXXX',
secretAccessKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
region: 'eu-west-3', // choose best for you
version: 'v4',
bucket: 'bucket-name'
```

### Usage

Upload file

```js
const remotePath = `remote/path/filename`
const localPath = `usr/local/filename`
const result = await Uploader.upload(localPath, remotePath)
```

Upload file base64

```js
const remotePath = `remote/path/filename`
const imageData = 'data:image/gif;base64,R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7.....'
const result = await Uploader.upload(null, remotePath, { base64: imageData })
```

Get file url

```js
const url = Uploader.getUrl(remotePath)
```



Delete file

```js
await Uploader.deleteFile(remotePath)
```
