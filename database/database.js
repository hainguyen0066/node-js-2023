import mongoose from "mongoose";
import { print, OutputType } from "../helpers/print.js";
import Exception from '../exceptions/Exception.js';
mongoose.set('strictQuery', true);

async function connect() {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI)
        print('connect success', OutputType.SUCCESS);
        return connection;
    } catch (error) {
        debugger

        const { code } = error;

        if (code == 8000) {
            throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD, OutputType.ERROR);
        }
        throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD, OutputType.ERROR);

    }
}

export default connect