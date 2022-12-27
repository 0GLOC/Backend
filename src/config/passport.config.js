import passport from 'passport';
import local from 'passport-local';
import userService from '../dao/MongoDAO/user.js';
import { createHash, isValidPassword } from '../utils.js';

const LocalStategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStategy({passReqToCallback: true, usernameField: 'name'}, async(req, name, password, done) => {
        try {
            let obj = req.body;
            obj.file = req.file.filename;
            
            const {userName, direction, age, phone} = req.body;

            if(!name || !password || !userName || !direction || !age || !phone ) return done(null, false, {message: "Incomplete values"})
    
            const exist = await userService.findOne({name: name});
            if(exist) return done(null, false, {message: "User alredy exist"})


            let realFile = `img/${obj.file}`;

            const newUser = {
                name,
                password:createHash(password),
                userName,
                direction,
                age,
                phone,
                avatar: realFile
            }
        
            let result = await userService.create(newUser);

            return done(null, result)
        } catch (error) {
            done(error)
        }
    }))

    passport.use('login', new LocalStategy({usernameField: 'name'}, async(name, password, done) => {
        try {
            if(!name || !password) return done(null, false, {message: "Incomplete values"})

            const user = await userService.findOne({name: name});
            
            if(!user) return done(null, false, {message: "Incorrect credentials"})
            if(!isValidPassword(user, password)) return done(null, false, {message: "Incorrect password"})

            return done(null, user)
        } catch (error) {
            done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async(id, done) => {
        let result = await userService.findOne({_id:id})
        return done(null, result);
    })
}

export default initializePassport;