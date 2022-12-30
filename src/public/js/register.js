const newProductData = document.getElementById('registerForm');

const handleSubmit = (evt, form, route) => {
    evt.preventDefault();
    let formData = new FormData(form);
    fetch(route, {
        method: "POST",
        body: formData,
    })
}

newProductData.addEventListener('submit', (e) => handleSubmit(e,e.target,'/api/session/register'))

const userName = document.getElementById('user');

const handleSubmitCart = (evt, form, route) => {
    evt.preventDefault();
    let data = {user: userName.value};
    fetch(route, {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "Content-type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

newProductData.addEventListener('submit', (e) => handleSubmitCart(e,e.target,'/api/carts'))


newProductData.onsubmit = function(){
    activated();
}

function reloadAgain(){
    window.location.href = "https://backend-production-8940.up.railway.app/";
}

function activated(){
    setTimeout(reloadAgain, 2000)
}