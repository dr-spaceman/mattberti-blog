As other PHP developers may have discovered before me, it's tough wrapping your head around the event-driven and asyncronous nature of [Node.js](http://nodejs.org).

Here's an example of how tricky asyncronicity can be.

```javascript
var fs = require('fs');
var path = require('path'),
    join = path.join;

function getUser (id, fn) {
  fs.readFile(join('./users/', id + '.json'), 
    { encoding: "utf-8" }, 
    function (err, data) {
      if (err) return fn(err);
      fn(null, data);
    }
}

for (var i = 0; i < 10; i++) {
  getUser(i, function(err, user){
    console.log("Found user %s", user.name);
  });
}
````