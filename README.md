# social network example

simple construction of a backend api of a social network.

## Instructions:

Gmail: [Less secure app access](https://www.google.com/settings/security/lesssecureapps) change to 'Yes'

Create configuration file for the api:
```
node_modules/
src/
...
.env 👈
...
```

configuration file  `.env`: <br/>
<small>[Typeorm config environment variables](https://typeorm.io/#/using-ormconfig/using-environment-variables)</small>
```
TYPEORM_CONNECTION = sqlite
TYPEORM_DATABASE = src/core/shared/infrastructure/storage/database.db
TYPEORM_ENTITIES = src/core/shared/infrastructure/storage/entities/*.ts
TYPEORM_SYNCHRONIZE = true
TYPEORM_LOGGING = true

NODEMAILER_SERVICE = service
NODEMAILER_NAME = your name
NODEMAILER_AUTH_USER = email
NODEMAILER_AUTH_PASS = password

JSONWEBTOKEN_PRIVATE_KEY = same text
```

Install dependencies:
```
yarn install
```

Start api:
```
yarn start
```