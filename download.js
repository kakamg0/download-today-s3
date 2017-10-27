const AWS = require('aws-sdk')
const fs = require('fs-extra')
const config = require('config')
const aws = config.aws

AWS.config = new AWS.Config(aws)

const s3 = new AWS.S3()
const today = new Date().toISOString().slice(0, 10)

const params = { 
  Bucket: config.tamarac_bucket,
  Delimiter: '/',
  Prefix: `${today}/`
}

s3.listObjects(params, (err, data) => {
  if (err) {
    throw err
  }
  
  data.Contents.forEach(content => {
    const fileParams = { Bucket: config.tamarac_bucket, Key: content.Key }
    const path = `./scripts/${content.Key}`

    fs.ensureFile(path, err => {
      if (err) {
        throw err
      }

      const file = fs.createWriteStream(path)

      s3.getObject(fileParams)
        .on('httpData', chunk => file.write(chunk))
        .on('httpDone', () => file.end())
        .send()
    })
  })
})
