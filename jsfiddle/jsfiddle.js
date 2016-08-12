/**
 * Created by john on 8/10/16.
 */
var language = "jsfiddle";
var extension_url = "https://oceanwide.s3.amazonaws.com/extensions/" + language + "/";
var extension_url = "";
$( document ).ready(function() {
    var TEMPLATE = function () { /*
      <div class="editr editr--light" data-theme="chrome" data-path="{{extenion_url}}/dwiki/extensions/jsfiddle/items" data-files-html="index.html" ></div>
   */
  }.toString().slice(18, -6);
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