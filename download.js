const AWS = require('aws-sdk');
const fs = require('fs-extra');

const [ execPath, scriptPath, ...args ] = [ ...process.argv ];
const today = args.length === 3 ? new Date().toISOString().slice(0, 10) : args.shift();
const bucket = args.shift();
const aws = {
  accessKeyId: args.shift(),
  secretAccessKey: args.shift()
};

AWS.config = new AWS.Config(aws);
const s3 = new AWS.S3();

const params = { 
  Bucket: bucket,
  Delimiter: '/',
  Prefix: `${today}/`
};

async function main () {
  const data = await s3.listObjectsV2(params).promise();
  data.Contents.forEach(async content => {
    const fileParams = { Bucket: bucket, Key: content.Key };
    const path = `./scripts/${content.Key}`;
    await fs.ensureFile(path);
    const file = fs.createWriteStream(path);

    s3.getObject(fileParams)
      .on('httpData', chunk => file.write(chunk))
      .on('httpDone', () => file.end())
      .send()
  });
}

main().catch(err => {
  console.error(err);
  process.exit(-1);
});
