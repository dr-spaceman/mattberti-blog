var express = require('express');
var router = express.Router()
var path = require('path'),
	join = path.join
var marked = require('marked')
var debug = require('debug')('blog:router')
var fs = require('fs')

var Article = require('../models/article.js')

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  highlight: function (code) {
		return require('highlight.js').highlightAuto(code).value;
	}
});

/* GET home page. */
router.get('/blog/:article', function (req, res, next) {
	Article.get(req.params.article, function(err, article){
		console.log('Found article', article)

		if (err) {
			var err = new Error('Not found')
			err.status = 404
			return next(err)
		}

		article.body = marked(article.body)

		res.render('article', article)
	})
})

router.get('/blog', function (req, res) {
	res.redirect('/')
})

router.get('/', function (req, res, next) {
	Article.getAll(function(err, articles){
		if (err) return next(err)
		debug("Got articles (render follows)", articles)

		articles.forEach(function(article){
			// var hasMore = article.body.length > article.bodyStub.length;
			// if (hasMore) article.bodyStub += ' [Read more](/blog/' + article.key + ' "' + article.title +'")';
			article.bodyStub = marked(article.bodyStub)
		})

		res.render('index', { title: 'Matt Berti Blog', articles: articles })
	})
})

module.exports = router;
