import { gql } from "apollo-server-express";

const typeDefs = gql`

    type Product {
        _id: Float
        title: String
        price: Float
        thumbnail: String
        code: Float
        timestamp: Float
    }

    type ProductsInCarts {
        product: Float
        quantity: Float
    }

    type Cart {
        user: String
        timestamp: Float
        products: [ProductsInCarts]
    }

    type Query {
        getAllProducts: [Product]
        getAllCarts: [Cart]
    }

    type Mutation {
        createProduct(title: String, price: Float, thumbnail: String) : Product
        createCart(user: String) : Cart
    }
`

export default typeDefs;