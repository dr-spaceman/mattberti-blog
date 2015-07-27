var readline = require('readline'),
    rl = readline.createInterface({input: process.stdin, output: process.stdout});
var moment = require('moment');
var open = require('open');
var fs = require('fs-extra');
var path = require('path');

var articlesDir = './articles';

var today = new moment();
var meta = {
  title: '',
  url: '',
  date: today.format("YYYY-MM-DD"),
  tags: []
};
var prompts = Object.keys(meta);
var i = 0;

var get = function() {
  var which = prompts[i];
  rl.setPrompt(which + '> ');
  rl.prompt();
  rl.write(typeof meta[which] === 'string' || meta[which] instanceof String ? meta[which] : '');
};

get('title');

rl.on('line', function(line) {
  line = line.trim();

  if (line == '')
    return get();

  switch(i){
    case 0:
      meta['title'] = line;
      meta['url'] = line.replace(/\s+/g, "-").replace(/[^a-z0-9\-]/ig, "").toLowerCase();
      i++;
      break;
    case 1:
      meta['url'] = line;
      if(fs.existsSync(path.join(articlesDir, line)))
        console.error("There's already an article with that URL");
      else
        i++;
      break;
    case 2:
      meta['date'] = line;
      i++;
      break;
    default:
      meta['tags'].push(line);
      rl.write(null, {name: 'c'});
  }
  
  get();

}).on('close', function() {
  console.log(meta);

  var dir = path.join(articlesDir, meta.url);

  fs.outputJson(path.join(dir, 'meta.json'), meta, {spaces:2}, function(err){
    if(err) return console.error(err);

    fs.createFile(path.join(dir, 'article.md'), function(err){
      if(err) return console.error(err);

      console.log("Success!");
      console.log("$ cd", dir);
      console.log("$ xdg-open", path.join(dir, 'article.md'));
      open(path.join(dir, 'meta.json'));
      open(path.join(dir, 'article.md'));

      process.exit(0);
    });
  });
});

// rl.on('line', function(line) {
//   var title = line.trim();
//   var titleUrl = title.replace(/[ *]/g, "-").replace(/[^a-z0-9]/g, "").toLowerCase();
//   var today = new moment();
//   var meta = {
//     "title": title,
//     "date": today.format("YYYY-MM-DD"),
//     "tags": []
//   }
//   var dir = path.join('./articles', titleUrl);

//   rl.write('Delete me!');
// // Simulate ctrl+u to delete the line written previously
// rl.write(null, {ctrl: true, name: 'c'});
// return;

//   fs.outputJson(path.join(dir, 'meta.json'), meta, function(err){
//     if(err) return console.error(err);

//     fs.createFile(path.join(dir, 'article.md'), function(err){
//       if(err) return console.error(err);

//       return console.log("Success! $ cd " + dir);
//     })
//   })

//   rl.prompt();
// }).on('close', function() {
//   console.log('Have a great day!');
//   process.exit(0);
// });