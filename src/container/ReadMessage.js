import { normalize, schema, denormalize } from 'normalizr';
import services from '../dao/config.js';
import logger from '../logger/logger.winston.js';

let date = new Date();
let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();

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
            logger.log('error', `${output} - ${error}`);
        }
    }; 
};