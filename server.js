import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config(); // must have config
import {
    usesrRouter,
    studentsRouter
} from './routers/index.js';
import connect from './database/database.js';

const port = process.env.PORT;
const app = express();
app.use(express.json());

// middleware
app.use('/users', usesrRouter);
app.use('/students', studentsRouter);

app.listen(port || 3000, async () => {
    connect();
    console.log(`listening on port: ${port}`);
});
