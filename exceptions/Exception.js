import { print, OutputType} from "../helpers/print.js"

export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = 'Wrong database user name';
    static WRONG_CONNECTION_STRING = 'Wrong server name/ connection string';
    static CANNOT_CONNECT_MOOGODB = 'CANNOT CONNECT MONGODB'
    static CANNOT_CONNECT_MOOGODB = 'CANNOT CONNECT MONGODB'
    static USER_EXIST = 'USER ALREADY EXIST'
    static CANNOT_REGISTER_USER = 'CAN NOT REGISTER USER'

    constructor(message) {
        super(message) // call method constuctor of parent class(Err)
        print(message, OutputType.Error);
    }
}