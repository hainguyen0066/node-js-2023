import { print, OutputType } from '../helpers/print.js'
import { User } from '../models/index.js'
import bcrypt from 'bcrypt'
import Exception from '../exceptions/Exception.js'

const login = async ({ email, password}) => {
    print(`login user in user repository ${email}`, OutputType.SUCCESS);
}

const register = async ({ email, password, name, phoneNumber, address }) => {
    try {
        debugger
        const existingUser = await User.findOne({email}).exec();

        if (existingUser) {
            throw new Exception(Exception.USER_EXIST)
        }
        // encrypt password
        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        // insert Db
        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            phoneNumber,
            address
        })

        return {
            ...newUser._doc,
            password: 'not show'
        };

    } catch (exception) {
        // check model validation
        debugger
        throw new Exception(Exception.CANNOT_REGISTER_USER);
    }
}

export default {
    login, register
}