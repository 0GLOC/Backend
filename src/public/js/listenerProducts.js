const titleListener = document.getElementById('title');
const priceListener = document.getElementById('price');
const fileListener = document.getElementById('file');
const btn = document.getElementById('send');
const dataListener = document.getElementById('dataListener');
const tableListener = document.getElementById('tableListener').style.display = 'none';

//READING FILES
/*function cambiarFile(){
    if(fileListener.files && fileListener.files[0]){
        console.log("File Seleccionado : ", fileListener.files[0]);
    }
}
console.log("Sin Archivo Seleccionado " + document.getElementById('file').files[0]);*/

btn.addEventListener('click', function(){
    socket.emit('listener', {
        title: titleListener.value,
        price: priceListener.value,
        file: fileListener.value
    })
});

socket.on('listener', function(data){
    dataListener.innerHTML += 
    `   <tr>
        <td>${data.title}</td>
        <td>$${data.price}</td>
        <td><img class="img-top" id="qcyo" src="http://localhost:8080/img/${data.file}" alt="Card image" width="150px"></td>
        </tr>`

    const tableListener = document.getElementById('tableListener').style.display = 'block';
});