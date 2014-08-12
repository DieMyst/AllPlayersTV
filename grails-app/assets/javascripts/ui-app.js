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
