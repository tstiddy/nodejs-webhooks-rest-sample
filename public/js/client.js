(function() {
    var socket = io.connect('http://localhost:3001');

    // Handle the event_received event.
    socket.on('event_received', function (data) {
        var newListItem = document.createElement('li');
        newListItem.innerText = 'Event id: ' + data;
        document.getElementById('events').appendChild(newListItem);
    });    
})();
