import { Router } from "express";
import faker from "faker";

const router = Router();

faker.locale = 'es';
const { datatype, image, commerce } = faker;

router.get('/', async (req, res) => {
    let testProducts = [];

    for (let index = 0; index < 5; index++) {
        testProducts.push({
            title: commerce.productName(),
            price: `$${commerce.price()}`,
            thumbnail: image.imageUrl(),
            id: datatype.number()
        });
    }
        
    res.send(testProducts);
});

export default router;