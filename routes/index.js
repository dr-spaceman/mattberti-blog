var express = require('express');
var router = express.Router();
var path = require('path'),
	join = path.join;
var debug = require('debug')('blog:router');
var fs = require('fs');

var Article = require('../models/article.js');

router.param('article', function (req, res, next, articleKey) {
	Article.get(articleKey, function(err, article) {
		if (err) {
			var err = new Error('Blog article not found ¯\\_(ツ)_/¯');
			err.status = 404;
			
			next(err);
		} else if (article) {
			req.article = article;

			next();
		} else {
			next(new Error("Failed to load article"));
		}
	})
})

/* GET home page. */
router.route('/blog/:article')
.all(function (req, res, next) {
	// runs for all HTTP verbs first
	next();
})
.get(function (req, res, next) {
	var article = req.article;
	article.body = Article.toHTML(article.body);
	article.stylesheet = article.hasStylesheet ? "/css/article--" + article.key + ".css" : null;
	res.render('article', article);
});

router.get('/blog', function (req, res) {
	res.redirect('/')
})

router.get('/', function (req, res, next) {
	Article.getAll(function(err, articles){
		if (err) return next(err);

		articles.forEach(function(article){
			if (article.leadin === null) {
				article.leadin = article.body;
			} else if (article.leadin !== "") {
				article.leadin += ' <a href="/blog/' + article.key + '" title="' + article.title +'" class="more">' + (article.leadinLinkWords ? article.leadinLinkWords + ' ' : '') + '&rarr;</a>';
			}
			article.leadin = Article.toHTML(article.leadin);
		});

		res.render('index', { title: 'Matt Berti Blog', articles: articles })
	})
})

module.exports = router;
