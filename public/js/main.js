function r() {
  console.log("resize")
}

$(function () {
  $(window).resize(r).trigger('resize');
});
