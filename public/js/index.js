var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');
});
socket.on('newMessage', function (message) {
    console.log(`New message`, message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li)
});
socket.on('disconnect', function () {
    console.log('Disconnected from server')
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageInput = jQuery('[name=message]')
    socket.emit('createMessage', {
        from: 'User',
        text: messageInput.val()
    }, function () {
        messageInput.val('');
    })
});