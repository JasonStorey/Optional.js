# Optional.js

Optional.js brings [Java 8 Optionals](http://docs.oracle.com/javase/8/docs/api/java/util/Optional.html) to javascript.

_A container object which may or may not contain a non-null value. If a value is present, isPresent() will return true and get() will return the value._

## Installation

via npm:
``` bash
npm install optional-js
```

## Usage

node:
``` javascript
var Optional = require('optional-js');
var emptyOptional = Optional.empty();
```

browser:
``` html
<script src="./dist/optional.js"></script>
<script>
// Optional is added to window
var emptyOptional = Optional.empty();
</script>
```

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
