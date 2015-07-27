var path = require('path'),
    join = path.join;
var fs = require('fs');
var moment = require('moment');
var async = require('async');
var debug = require('debug')('blog:model:article');

var Article = {};

Article.get = function (key, fn) {
  if (!key) {
    return fn(new Error('No article key'));
  }

  var article = { key: key };

  async.parallel([
    function (cb) {
      fs.readFile (join('articles/', key, 'meta.json'), "utf-8", function (err, content) {
        if (err) return cb(err);

        var meta = JSON.parse(content);
        for (var attrname in meta) {
          article[attrname] = meta[attrname]
        }
        article.datePrint = moment(article.date).format("D MMMM YYYY");

        cb();
      })
    },
    function (cb) {
      fs.readFile (join('articles/', key, 'article.md'), "utf-8", function (err, content) {
        if (err) return cb(err);

        article.body = content;
        var stubEndPos = article.body.indexOf('<!-- more -->')
        if (stubEndPos !== -1) {
         article.bodyStub = article.body.substr(0, stubEndPos)
        } else {
         article.bodyStub = article.body
        }

        cb();
      })
    }
  ], function (err) {
    debug("async fin.");
    return fn(null, article);
  });
}

Article.getfoo = function(key, fn) {
	debug("Article#get")
	return fn(null, {key: key, title:"fuuuuu"})
}

Article.getAll = function(fn){
  fs.readdir('./articles', function(err, files){
    if(err) return fn(err);

    files = files.filter(function(file){
    	debug(file, file.indexOf("~"))
    	if (file.indexOf("~") === 0) return false;
    	return true;
    })

    var articles = [],
      dir = '',
      i = 0

    files.forEach(function(dir){
      debug("key[%s]: %s", i, dir);

      Article.get(dir, function(err, article){
      	if (err) return fn(err)

      	debug("Article[%s]#get got %s", i, article.key);
        articles.push(article);

        debug("iterator", i, files.length)
        if (++i == files.length) {
        	debug("Got all articles. Now to the sortmobile...");
        	Article.sortAll(articles, fn);
        }
      });
    });
    debug("/for iterator", i, files.length)
  });
}

Article.sortAll = function (articles, fn) {
	debug("sorting articles...", articles)

	articles.sort(function(a, b){
		if (a.date > b.date) return -1;
		if (a.date < b.date) return 1;
		return 0;
	})

	return fn(null, articles)
}

module.exports = Article;