var path = require('path'),
    join = path.join;
var fs = require('fs');
var moment = require('moment');
var Debug = require('debug');
var debug = new Debug('blog:model:article');

var MarkdownIt = require('markdown-it');
var hljs = require('highlight.js'); // https://highlightjs.org/ 
var md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {}
 
    return ''; // use external default escaping 
  }
})
.use(require('markdown-it-deflist'))
.use(require('markdown-it-footnote'));
// var marked = require('marked');
// var markdownDl = require('../markdown-dl');

// marked.setOptions({
//   renderer: new marked.Renderer(),
//   gfm: true,
//   highlight: function (code) {
//     return require('highlight.js').highlightAuto(code).value;
//   }
// });

var Article = {};

Article.get = function (key, fn) {
  var debug = new Debug('blog:model:article['+key+']');
  debug("Article#get start...", key);

  if (!key) {
    return fn(new Error('No article key'));
  }

  var article = { key: key };

  fs.readFile(join('articles/', key, 'meta.json'), "utf-8", function (err, content) {
    debug("...Got meta.json...", key);
    if (err) return fn(err);

    var meta = JSON.parse(content);
    for (var attrname in meta) {
      article[attrname] = meta[attrname]
    }
    article.datePrint = moment(article.date).format("D MMMM YYYY");

    fs.readFile(join('articles/', key, 'article.md'), "utf-8", function (err, content) {
      debug("...Got article.md...", key);

      if (err) return fn(err);
      
      article.body = content;
      
      // Find the stub seperator <!-- more[-custom] -->, if there is one
      var re = /<!--\s*more[\-\:\| ]*(.*)\s*-->/;
      var reOperation = null;
      reOperation = re.exec(content);
      
      if (reOperation !== null) {
        article.leadin = article.body.substr(0, reOperation.index);
        article.leadinLinkWords = reOperation[1] ? reOperation[1].trim() : null;
      }

      debug("...Fin~", key);

      return fn(null, article);
    });
  });
}

Article.getAll = function(fn) {
  fs.readdir('./articles', function(err, files){
    if(err) return fn(err);

    files = files.filter(function(file){
      // Filter out hidden articles
    	if (file.indexOf("~") === 0) return false;
    	return true;
    });

    debug("All files(%s): [%s]", files.length, files.toString());

    var articles = [],
      dir = '',
      numArticles = files.length,
      numGotArticles = 0;

    (function getArticles (files) {
      var file = files.pop();

      Article.get(file, function(err, article){
        if (err) return fn(err);

        articles.push(article);

        if (files.length) {
          getArticles(files);
        } else {
          Article.sortAll(articles, fn);
        }
      });
    })(files);
    
  });
}

Article.sortAll = function (articles, fn) {
	debug("sorting articles...");

	articles.sort(function(a, b){
		if (a.date > b.date) return -1;
		if (a.date < b.date) return 1;
		return 0;
	})

	return fn(null, articles);
}

Article.toHTML = function (document) {
  return md.render(document);
  // return marked(markdownDl(unparsed));
}

module.exports = Article;