import * as fs from 'fs';

const path = 'src/files/objects.json'

class Container {
    getAll = async() => {
        try {
            if(fs.existsSync(path)){
                let fileData = await fs.promises.readFile(path, 'utf-8',);
                let objects = JSON.parse(fileData);
                return objects;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    };
    save = async(object) => {
        try {
            let objects = await this.getAll();
            let randomCalculator = Date.now();
            let random = Math.round(Math.random()*randomCalculator);
            if (objects.length === 0) {
                object.id = 1;
                objects.push(object);
                await fs.promises.writeFile(path, JSON.stringify(objects, null, '\t'));
            } else {
                object.id = objects[objects.length - 1].id + 1;
                object.code = random;
                object.timestamp = Date.now();
                objects.push(object);
                await fs.promises.writeFile(path, JSON.stringify(objects, null, '\t'));
            };

        } catch (error) {
            console.log(error)
        };
    };
    replaceObject = async(position, object) => {
        try {
            let sumId = position - 1;
            let objects = await this.getAll();
            objects.splice(sumId, 1, object)
            await fs.promises.writeFile(path, JSON.stringify(objects, null, '\t'));
        } catch (error) {
            console.log(error)
        };
    };
    getById = async(object) => {
        try {
            const error = 'This product does not exist'
            let objects = await this.getAll();
            const result = objects.filter(function (nickname) { return nickname.id == object });
            if (object > result) {
                console.log({error})
                return {error}
            } else {
                console.log(result);
                return result
            };
        } catch (error) {
            console.log(error)
        };
    };
    deleteById = async(object) => {
        try {
            let realNumber = parseInt(object);
            let objects = await this.getAll();
            const result = objects.filter(function (nickname) { return nickname.id !== realNumber });
            await fs.promises.writeFile(path, JSON.stringify(result.splice({}), null, '\t'));
            console.log('File removed')
        } catch (error) {
            console.log(error)
        }
    };
};

export default Container;