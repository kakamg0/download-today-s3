This script will download files from a s3 bucket in to the scripts folder.

Run the command bellow to install the dependencies.

```sh
npm install
```

To download the files for the current date run the command bellow

```sh
npm start -- <bucket> <access key> <secret key>
```

You are also able to pass the prefix of the bucket as an argument like so

```sh
npm start -- 2019-01-01 <bucket> <access key> <secret key> # This would download files in the folder 2019-01-01 of the bucket.
```
