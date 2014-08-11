//= require jquery-2.1.1.js
//= require jquery-ui.min.js
//= require angular.js
//= require angular-route.js
//= require controllers.js
//= require services.js
//= require app.js

$(document).ready (
    function() {
        $(".outer").resizable({
            resize: function (event, ui) {
                var newWd = ui.size.width - 20;
                var newHt = ui.size.height - 20;
                $("iframe").width(newWd).height(newHt);
            }
        }).draggable();
    }
);

