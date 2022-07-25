let newProductData = document.getElementById('form-id');

const handleSubmit = (evt, form, route) => {
    evt.preventDefault();
    let formData = new FormData(form);
    fetch(route, {
        method: "POST",
        body: formData
    })
}

newProductData.addEventListener('submit', (e) => handleSubmit(e,e.target,'/productos'))