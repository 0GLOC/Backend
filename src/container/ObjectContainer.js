const fs = require('fs');

const path = 'src/files/objects.txt'

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
    getRandom = async() => {
        try {
            let objects = await this.getAll();
            let randomCalculator = objects.length;
            let random = Math.round(Math.random()*randomCalculator);
            const result = objects.filter(function (nickname) { return nickname.id == random });
            return result;
        } catch (error) {
            console.log(error)
        };
    };
    getById = async(object) => {
        try {
            let objects = await this.getAll();
            const result = objects.filter(function (nickname) { return nickname.id == object });
            if (object > result) {
                console.log('This product does not exist')
            } else {
                console.log(result);
            };
        } catch (error) {
            console.log(error)
        };
    };
    deleteAll = async() => {
        try {
            fs.unlinkSync(path);
            console.log('All files removed')
        } catch (error) {
            console.log(error)
        }
    };
    deleteById = async(object) => {
        try {
            let objects = await this.getAll();
            const result = objects.filter(function (nickname) { return nickname.id !== object });
            console.log(result)
            await fs.promises.writeFile(path, JSON.stringify(result.splice({}), null, '\t'));
            console.log('File removed')
        } catch (error) {
            console.log(error)
        }
    };
};

module.exports = Container;