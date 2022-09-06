import { normalize, schema, denormalize } from 'normalizr';
import services from '../dao/config.js';

export default class MessageLibrary {
    readFile = async() => {
        try {
            let readFromMongo = await services.messagesService.getAllExceptId();
            let obj = readFromMongo[0];
            let string = JSON.stringify(obj);
            let messages = JSON.parse(string);

            const author = new schema.Entity('author');

            const article = new schema.Entity('articles', {
            comments: [author],
            });

            const normalizedData = normalize(messages, article);
            console.log('Normalized', normalizedData);


            const denormalizedData = denormalize(normalizedData.result, article, normalizedData.entities);
            return denormalizedData;
        } catch (error) {
            console.log(error);
        }
    }; 
};