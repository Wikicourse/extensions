# extensions
Javsascript and other materials to run interactive contents on YFunnel.com

These files will be served via AWS S3 CDN. Make sure to add all relevant resources in the repository and make them refer to start with `extensoin_url` "https://oceanwide.s3.amazonaws.com/extensions/", followed by the language name.

Here is an example:

HTML expected on the page:

    <pre class="codehilite">
        <div class="language-CHANGEME">
        </div>
    </pre>

The following preamble should be included in your main javascript file `CHANGEME/CHANGEME.js`:

    var language = "CHANGEME";
    var extensions_url = "https://oceanwide.s3.amazonaws.com/extensions/" + language + "/";
    $( document ).ready(function() {
        var TEMPLATE = function () { /*
          <table style="width:100%;border:0px;margin:0 auto;">
          </table>
       */
      }.toString().slice(18, -6);
      $(".language-" + language).each(function(index) {
        var content = $(this).text();
        var compiled_template = Handlebars.compile(TEMPLATE);
        var rendered = compiled_template({content: content, index: index});
        $(this).parent().replaceWith(rendered);
      });
    });

As you can see the preamble includes the HTML template that will get injected into the website.
Please include all your dependencies under one directory with the same name as the main javascript file.
