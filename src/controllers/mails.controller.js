import MailingService from "../container/mailing.js";
import ProductService from "../services/productServices.js";
import CartService from "../services/cartServices.js";
import config from "../config/config.js";
import userService from "../public/js/user.js";

const productsService = new ProductService();
const cartService = new CartService();

let HOST = config.host.HOST_URL + 'img/' + '';

const postMail = async (req, res) => {
    let param = req.params.cid;
    let searchUserName = await userService.find({name:param});
    let userName = searchUserName[0].userName;
    let carts = await cartService.getByUser(param);
    let extractID = carts._id;
    let realValue = extractID.valueOf();
    let processProducts = await cartService.showProducts(realValue);
    let arrProducts = [];
    for(let i=0; i<processProducts.length; i++){
        let objects = await productsService.getById(processProducts[i]);
        arrProducts.push(objects);
    }
    let arrPrices = [];
    for(let i=0; i<arrProducts.length; i++){
        let objects = (arrProducts[i].price);
        arrPrices.push(objects);
    }
    let arrQuantity = [];
    for(let i=0; i<arrPrices.length; i++){
        let objects = (carts.products[i].quantity);
        arrQuantity.push(objects);
    }
    let sumQuantityProdcut = [];
    for(let i=0; i< arrPrices.length; i++){
        let objects = (carts.products[i].quantity * arrPrices[i]);
        sumQuantityProdcut.push(objects);
    }
    let total = sumQuantityProdcut.reduce((a, b) => a + b, 0);

    const attachments = arrProducts.map((file)=>{
        return { filename: file.title, path: HOST+file.thumbnail };
    });

    let userEmail = searchUserName[0].name;

    const mailer = new MailingService();
    let result = await mailer.sendSimpleMail({
        from: 'Ecommerce Games',
        to: `${userEmail}`,
        subject: 'Compra en proceso',
        html: `<div>
        <h1>Estado de compra en proceso de ${userName}</h1>
            <h2>Total: $${total}</h2>
            <h2>Gracias por confiar en nosotros!</h2>
        </div>`,
        attachments: attachments
    })
    
    let deleteProducts = await cartService.deleteAllProductsInCarts(realValue);

    res.send({status: "success", message: "Email sent"})
}

export default {
    postMail
}