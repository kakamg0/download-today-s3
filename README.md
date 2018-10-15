This script will download files from a s3 bucket in to the scripts folder.

You should clone this repository and add configurations in [config/default.json](config/default.json).

Run the command bellow to install the dependencies.

```sh
npm install
```

To download the files run the command bellow

```sh
node start
```

You are also able to pass the prefix of the bucket as an argument like so

```sh
node start -- 2018-01-01 # This would download files in the folder 2018-01-01 of the bucket.
```
