export default class ProductDTO{
    constructor(product) {
        this._id = product._id,
        this.title = product.title,
        this.price = product.price,
        this.thumbnail = product.thumbnail
    }
}