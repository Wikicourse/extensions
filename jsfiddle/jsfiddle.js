/**
 * Created by john on 8/10/16.
 */

var language = "jsfiddle";
var extension_url = "https://oceanwide.s3.amazonaws.com/extensions/" + language;
// var extension_url = "/static/extensions/" + language;

var initJsfiddle = function() {
// $( document ).on("resize", function() {
    var TEMPLATE = function () { /*
      <div class="editr editr--light" data-view="split" data-theme="chrome"
      data-path="{{extension_url}}/includes"
        data-files-js="!console.min.js;!jquery.min.js"
        data-libs='["https://code.jquery.com/jquery-1.12.4.min.js",
        "https://maxcdn.bootstrapcdn.com/bootstrap/latest/js/bootstrap.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.min.js",
        "https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"
        ]' >{{content}}</div>
   */
  }.toString().slice(18, -6);
  // Make sure all files are hidden with '!' prefix, otherwise, data parsed from HTML will not show up.
  $(".lang-" + language).lazyLoadXT();
  $(".lang-" + language).each(function(index) {
    $(this).on("lazyshow", function() {
      console.log("clicked");
      var content = $(this).text();
      var compiled_template = Handlebars.compile(TEMPLATE);
      var rendered = compiled_template({content: content,
        index: index,
        extension_url: extension_url});
      var rendered$ = $(rendered);
      $(this).parent().replaceWith(rendered$);
      new Editr({ el: rendered$ });
    });
  });
};
