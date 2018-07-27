# Node.js Cloud storage file uploader

### Install 

```
npm i -S https://github.com/vobi-io/cloud-upploader
```

### Config

make sure initilize upload 
you can use `s3` or `google` cloud storage and make sure you pass configs for selected provder


```js
const Uploader = require('uploader')
Uploader.init({ drive: 'amazon', config: {} })
```

config for amazon

```js
accessKeyId: 'XXXXXXXXXXXXXXXX',
secretAccessKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
region: 'eu-west-3',
version: 'v4',
bucket: 'bucket-name'
```

### Usage

upload file

```js
const remotePath = `remote/path/filename`
const localPath = `usr/local/filename`
const result = await Uploader.upload(localPath, remotePath)
```

get file url

```js
const url = Uploader.getUrl(remotePath)
```



delete file

```js
await Uploader.deleteFile(remotePath)
```
