function move(event) {
    $('#box').css({left: event.pageX - 50,
                   top: event.pageY - 50});
}

function loop() {
    var event;
    while (event = (yield)) {
        if (event.type == 'mousedown') {
            while (event = (yield)) {
                if (event.type == 'mousemove') move(event);
                if (event.type == 'mouseup') break;
            }
        }
    }
}

// register the listeners:
$(function() {
    var handler = loop(); handler.next(); // starts the coroutine
    function send(event) {
        handler.send(event);
    }

    $('#box').mousedown(send);
    $(window).mousemove(send).mouseup(send);

    // suppress firefox's annoying dragging behavior:
    $('#box').bind('dragstart', function(event) {
        event.preventDefault();
    });
});
