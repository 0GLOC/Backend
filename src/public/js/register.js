const newProductData = document.getElementById('registerForm');

const handleSubmit = (evt, form, route) => {
    evt.preventDefault();
    let formData = new FormData(form);
    fetch(route, {
        method: "POST",
        body: formData,
    })
}

const handleSubmitCart = (evt, form, route) => {
    evt.preventDefault();
    let formData = new FormData(form);
    fetch(route, {
        method: "POST",
        body: formData,
    })
}

newProductData.addEventListener('submit', (e) => handleSubmit(e,e.target,'/api/session/register'))
newProductData.addEventListener('submit', (e) => handleSubmitCart(e,e.target,'/api/carts'))

function reload(){
    location.reload(true)
}

newProductData.onsubmit = function(){
    setTimeout(reload, 1000)
}