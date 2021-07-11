# social network example

simple construction of a backend api of a social network.

## Instructions:

Gmail: [Less secure app access](https://www.google.com/settings/security/lesssecureapps) change to 'Yes'

Create two configuration files for the api:
```
node_modules/
src/
...
account.json 👈 
...
private.key 👈
...
```

Create gmail configuration file  `account.json`:
```json
{
    "name": "<your_name>", 
    "user": "<your_email>",
    "pass": "<your_pass>"
}
```
Create private key file `private.key`
```
<any_text>
```

Install dependencies:
```
yarn install
```

Start api:
```
yarn start
```