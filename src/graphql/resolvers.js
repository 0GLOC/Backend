import ProductService from "../services/productServices.js";
import CartService from "../services/cartServices.js";

const productsService = new ProductService();
const cartsService = new CartService();

const resolvers = {
    Query: {
        getAllProducts: async() => {
            let products = await productsService.getAll();
            return products;
        },
        getAllCarts: async() => {
            let carts = await cartsService.getAll();
            return carts;
        }
    },
    Mutation: {
        createProduct: async(_, args) => {
            let result = await productsService.save(args);
            return result;
        },
        createCart: async(_, args) => {
            let obj = {};
            let result = await cartsService.save(obj, args.user);
            return result;
        }
    }
}

export default resolvers;