let socket = '';

if(location.hostname == 'localhost'){
    socket = io('ws://localhost:3001');
}else{
    socket = io('ws://'+ location.hostname);
}

const sendButton = document.getElementById('sendButton');
const chat_id = location.search.slice(9,33);

socket.on("connect", () => {

    socket.emit('join',chat_id);

    sendButton.addEventListener('click',() => {
        socket.emit('onUpdate:client', {
            chat_id: chat_id,
            sender: location.search.slice(41,65),
            content: document.getElementById('message').value
        });
    });

    socket.on('onUpdate:server', payload => {
        location.reload();
        console.log('client',payload);
    })
});