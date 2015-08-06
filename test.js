var test = require('tape');
var Article = require('./models/article.js');
var moment = require('moment');

test('Get article `~test` and manipulate/parse it', function (t) {
  Article.get("~test", function (err, article) {
    t.error(err, "Article#get no error");
    t.ok(article, "article get");

    //proper leadin split + custom link words
    t.ok(article.leadin, "has leadin");
    t.ok(article.leadinLinkWords, "has custom leadin link words");

    //test for Definition lists
    var parsed = Article.toHTML(article.body);
    t.ok(parsed.indexOf('<dl>') !== -1, "markdown parsed DL");

    //custom css
    t.ok(article.hasStylesheet, "has custom stylesheet");

    t.end();
  });
});

test('Get all articles', function (t) {
  Article.getAll(function (err, articles) {
    t.error(err, "Article#getAll no error");
    if(err) return t.fail();

    t.ok(articles.length > 1, "multiple articles");

    // don't get hidden articles
    t.notOk(articles.filter(function(article){
      return article.title.indexOf("~") === 0;
    }).length);

    var testSort = moment(articles[0].date).isAfter(articles[1].date) && moment(articles[1].date).isAfter(articles[2].date);
    t.ok(testSort, "articles sorted chronologically");

    t.end();
  });
});