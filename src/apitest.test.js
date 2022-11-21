import supertest from "supertest";
import chai from "chai";
import config from "./config/config.js";

let HOST = config.host.HOST_URL + '';

const expect = chai.expect;
const requester = supertest(HOST);

describe('Products testing', () => {
    describe('GETS PRODUCTS', () => {
        it('La petición base debe retornar 200', async() => {
            let response = await requester.get('api/products')
            expect(response.status).to.be.eql(200)
        })
        it('La petición base debe retornar un arreglo de productos', async() => {
            let response = await requester.get('api/products')
            const {_body} = response;
            expect(_body.payload).to.be.an('array')
        })
    })
    describe('POST PRODUCTS', () => {
        it('Debería crear un producto correctamente', async() => {
            let product = {
                title: "Celeste",
                price: 342,
                thumbnail: "1658705076389-celeste.jpg",
            }
            const response = await requester.post('api/products').send(product);
            const {_body} = response;
            expect(_body.payload).to.include.keys('_id');
        })
    })
})

describe('Carts testing', () => {
    const id = '635ddee555b9fdb8c9ebb656';
    describe('GETS CARTS', () => {
        it('La petición base debe retornar 200', async() => {
            let response = await requester.get(`api/carts/${id}/products`)
            expect(response.status).to.be.eql(200)
        })
        it('La petición base debe retornar un arreglo de productos en base al id del carrito elegido', async() => {
            let response = await requester.get(`api/carts/${id}/products`)
            const {_body} = response;
            expect(_body.payload).to.be.an('array')
        })
    })
    describe('POST CARTS', () => {
        it('Debería agregar un producto correctamente dentro del carrito que corresponde con el id', async() => {
            let products = {
				product: 1,
				quantity: 2
			}
            const response = await requester.post(`api/carts/${id}/products`).send(products);
            const {_body} = response;
            expect(_body.payload).to.include.keys('_id');
        })
    })
})