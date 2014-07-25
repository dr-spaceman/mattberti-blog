Node.js is primed for asyncronous operations. Although there are syncronous operations available like [`fs.readFileSync`](http://nodejs.org/api/fs.html#fs_fs_readfilesync_filename_options), synchronous functions should only be used during startup, or when your module is initially loaded, and never after that.<!-- more -->

Building asyncronous code can be tricky, but the [async](https://github.com/caolan/async) module can help.

For example, if you wanted to get the contents of more than one file, you may do it like so:

````js
var files = ['meta.json', 'article.md'],
    data = {};

readFiles(files);

function readFiles (files, callback) {
  fs.readFile (files[0], 'utf8', function (err, content) {
    if (err) return err;
    data[files[0]] = content;
    fs.readFile (files[1], 'utf8', function (err, content) {
      if (err) return err;
      data[files[1]] = content;
      callback();
    }
  }
}
````

But with async, you can run the asyncronous functions in parallel with an optional callback method after the functions have completed.

````js
var async = require('async');

async.parallel({
  foo: function (cb) {
    fs.readFile ('meta.json', 'utf8', function (err, content) {
      if (err) return cb(err);
      cb (null, content);
    });
  },
  bar: function (cb) {
    fs.readFile ('article.md', 'utf8', function (err, content) {
      if (err) return cb(err);
      cb (null, content);
    });
  }
}, function (err, results) {
  console.log("Async fin.", results);
})
````