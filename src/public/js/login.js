const form = document.getElementById('loginForm');

form.addEventListener('submit', evt => {
    evt.preventDefault();
    let data = new FormData(form);
    let obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/session/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            "Content-type":"application/json"
        }
    }).then(result => result.json()).then(json => console.log(json));
})

function reload(){
    location.reload(true)
}

form.onsubmit = function(){
    setTimeout(reload, 1000)
}