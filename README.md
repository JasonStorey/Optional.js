Optional.js
===========

> A container object that wraps possible undefined values in JavaScript - inspired by [Java 8 Optionals] (http://docs.oracle.com/javase/8/docs/api/java/util/Optional.html)

``` javascript
Optional.ofNullable(promptForUserName)
        .map(getUserId)
        .filter(verify)
        .ifPresent(login);
```

# Features

- Full Java 8 Optional API is supported
- Runs in browser and node environments
- Lightweight and dependency-free (**<1.0 KB minified, gzipped**)

# Installation

Download the [latest release](https://github.com/JasonStorey/Optional.js/releases) from GitHub or from [NPM](https://www.npmjs.com/package/optional-js)

via npm:
``` bash
$ npm install optional-js
```

then just require in node:
``` javascript
var Optional = require('optional-js');
var emptyOptional = Optional.empty();
```

alternatively, use the browser compatible build in the `./dist` directory of the npm package

# Usage

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

function login(userId) {
    console.log('Logging in as : ' + userId);
}

```
Then, from the terminal...
``` bash
$ node login root
"Logging in as : 1887"
````

# Building

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
