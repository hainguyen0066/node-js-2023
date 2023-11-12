import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config(); // must have config
import {
    usesrRouter,
    studentsRouter
} from './routers/index.js';
import connect from './database/database.js';
import checkToken from './authentication/auth.js';

const app = express();
// middleware
app.use(checkToken);
app.use(express.json());

const port = process.env.PORT;

app.use('/users', usesrRouter);
app.use('/students', studentsRouter);

app.listen(port, async () => {
    connect();
    console.log(`listening on port: ${port}`);
});
