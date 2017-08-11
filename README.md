 ## read json file as config

```Javascript
var cs = require('fiw-config')({base: 'test'});
var conf = cs('test');
console.debug('config:', conf);
```