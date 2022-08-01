import * as fs from 'fs';

const path = 'src/files/message.json'

class ContainerMessage {
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
            if (objects.length === 0) {
                object.id = 1;
                objects.push(object);
                await fs.promises.writeFile(path, JSON.stringify(objects, null, '\t'));
            } else {
                object.id = objects[objects.length - 1].id + 1;
                objects.push(object);
                await fs.promises.writeFile(path, JSON.stringify(objects, null, '\t'));
            };

        } catch (error) {
            console.log(error)
        };
    };
};

export default ContainerMessage;