     function hex(k) {
            var s = k.toString(16);
            if (k < 16) { s = '0' + s; }
            return s;
      }

      function colorChange(event, ui) {
        var r = $("#rgb-red").slider("value");
        var g = $("#rgb-green").slider("value");
        var b = $("#rgb-blue").slider("value");
        $("#color").text("red:" + r + " green:" + g + " blue:" + b);
        doDraw(hex(r), hex(g), hex(b));
      }

      function initSlider(id) {
        $(id).slider({max: 255, slide: colorChange, change: colorChange});
      }

      function doDraw(r, g, b) {
        var dc = document.getElementById('drawing');
        if(dc && dc.getContext) {
          var cxt = dc.getContext('2d');

          cxt.clearRect(0, 0, dc.width, dc.height);
          cxt.globalCompositeOperation = 'lighter';
          cxt.strokeStyle = "#000000";


          // red
          cxt.fillStyle = "#"+r+"0000";
          cxt.fillRect(0, 0, dc.width*7/8, dc.height*7/8);  // xywh

          // green
          cxt.fillStyle = "#00"+g+"00";
          cxt.fillRect(dc.width/8, 0, dc.width*6/8, dc.height);  // xywh

          // blue
          cxt.fillStyle = "#0000"+b;
          cxt.fillRect(dc.width/8, 0, dc.width*7/8, dc.height*7/8);  // xywh
        }
      }

      $(document).ready(function() {
        initSlider("#rgb-red");
        initSlider("#rgb-green");
        initSlider("#rgb-blue");
      })
