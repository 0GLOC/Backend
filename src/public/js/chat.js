let user;

let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

const chatBox = document.getElementById('chatBox');
const chatSend = document.getElementById('success');

const socket = io({
    autoConnect:false
});

Swal.fire({
    title:'Identifícate',
    input:'text',
    text: 'Ingresa tu correo con el que te identificarás',
    inputValidator: (value) => {
        let expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let validated = expReg.test(value);

        if (validated == false) {
            return 'Correo Invalido'
        }
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    user = result.value;
    socket.connect();
})

chatSend.addEventListener('click', evt => {
    if (chatBox.value.trim().length>0) {
        socket.emit('message', {user: user, message: chatBox.value, date: output})
        chatBox.value = "";
    }
})

socket.on('log', data => {
    let log = document.getElementById('log');
    let messages = "";
    data.forEach(message => {
        messages = messages+`${message.user} ${message.date}: ${message.message}</br>`
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