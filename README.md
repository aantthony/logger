# logger

Simple `console.log` replacement.

`npm install --save https://github.com/aantthony/logger/archive/v1.0.0.tar.gz`

## Usage
```js

var log = require('logger')('Login');

// 9720ms Login: Hello World!
log.info('Hello World!');
```

## Disable output
```js
require('logger').setOutputStream(null);
```

## Collect log data:

```js
require('logger').on('data', function (payload) {
  // { component: 'Login',
  // time: Thu Jun 18 2015 23:09:29 GMT+1000 (AEST),
  // hostname: 'Anthony.local',
  // level: 'info',
  // message: 'Hello World!',
  // pid: 46297,
  // data: undefined }
  console.log(payload);
});
```
