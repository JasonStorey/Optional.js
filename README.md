Optional.js
----------

Tired of checking if values are defined? Optional.js brings [Java 8 Optionals](http://docs.oracle.com/javase/8/docs/api/java/util/Optional.html) to javascript.

_Optional: A container object which may or may not contain a non-null value._

Features
--------

- Full Java 8 Optional API is supported
- Runs in browser and node

Installation
------------

via npm:
``` bash
npm install optional-js
```

then just require in node:
``` javascript
var Optional = require('optional-js');
var emptyOptional = Optional.empty();
```

or use the browser compatible build in `./dist`

## Usage

Full docs - [Java 8 Optionals](http://docs.oracle.com/javase/8/docs/api/java/util/Optional.html)

JS Example:
``` javascript
// "login.js"

var Optional = require('optional-js');

// Here, we grab a potentially undefined value
var userName = process.argv[2];

// Now we wrap it in an Optional, and use the delicious, functional, sugary sweet API
Optional.ofNullable(userName)
        .map(getUserId)
        .filter(verify)
        .ifPresent(login);

function getUserId(userName) {
  return userName === 'root' ? 1887 : 0;
}

function verify(userId) {
  return userId === 1887;
}

function login(userName) {
  console.log('Logging in as : ' + userName);
}

```
Then, from the terminal...
``` bash
$ node login root
"Logging in as : 1887"
````

## Building

download:
``` bash
git clone git@github.com:JasonStorey/Optional.js.git
```

enter the directory, and install dependencies:
```bash
cd Optional.js && npm install
```

build:
```bash
npm run build
```

run the tests:
```bash
npm test
```
