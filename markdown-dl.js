module.exports = function mdDl(unparsed){
  if (!unparsed) return '';
  var lines;
  var dl;
  var parsed = unparsed.replace(/^[^:\s]+.*[\r\n](?::\s?.*[\s\S])+/mg, 
    function(match){
      // console.log("re match>`%s`", match);

      var ret;
      return match.trim().split(/\r?\n/).reduce(function(dl, line, i, lines){
        // console.log("line %s of %s>%s|%s", i, lines.length, dl, line);

        if(i == 1) ret = "<dl>\n  <dt>" + dl.trim() + "</dt>\n";
        ret += "  <dd>" + line.trim().replace(/^:\s*/, '') + "</dd>\n";
        if (i + 1 == lines.length) ret += "</dl>";

        return ret;
      });
    }
  );

  return parsed;
}