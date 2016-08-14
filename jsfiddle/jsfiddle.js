/**
 * Created by john on 8/10/16.
 */
var language = "jsfiddle";
var extension_url = "https://oceanwide.s3.amazonaws.com/extensions/" + language;
// var extension_url = "/dwiki/extensions/" + language;
$( document ).ready(function() {
    var TEMPLATE = function () { /*
      <div class="editr editr--light" data-view="single" data-theme="chrome" 
        data-path="{{extension_url}}/includes" 
        data-files-js="!console.min.js;!fillAssert.js;!tape.min.js;!lodash.min.js;!jquery.min.js;!bootstrap.min.js" 
        data-files-html="!index.html" 
        data-files-css="!bootstrap.min.css" >{{content}}</div>
   */
  }.toString().slice(18, -6);
  // Make sure all files are hidden with '!' prefix, otherwise, data parsed from HTML will not show up.
  $(".language-" + language).each(function(index) {
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