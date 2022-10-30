let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

const chatBox = document.getElementById('chatBox');
const chatSend = document.getElementById('success');
const user = document.getElementById('lastName');
const chatName = document.getElementById('name');
const chatNickname = document.getElementById('name');
const chatAge = document.getElementById('age');
const chatAvatar = document.getElementById('avatar');

const socket = io({
    autoConnect:true
});

chatSend.addEventListener('click', evt => {
    if (chatBox.value.trim().length>0) {
        socket.emit('message', {id: user.value, name: chatName.value, age: chatAge.value, nickname: chatNickname.value, avatar: chatAvatar.value, date: output, text: chatBox.value})
        chatBox.value = "";
    }
})

socket.on('log', data => {
    let log = document.getElementById('log');
    let messages = "";
    data.forEach(message => {
        messages = messages+`${message.author.id} ${message.author.date}: ${message.text}</br>`
    });
    log.innerHTML = messages;
})

socket.on('newUser', data => {
    if (user) {
        Swal.fire({
            text: "Nuevo usuario en el chat ...",
            toast: true,
            position: "top-right"
        })
    }
})