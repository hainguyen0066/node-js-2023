import express from 'express';
import * as dotenv from 'dotenv';
import {
    usesrRouter,
    studentsRouter
} from './routers/index.js';

dotenv.config(); // must have config
const port = process.env.PORT;
const app = express();

app.use(express.json());

// middleware
app.use('/users', usesrRouter);
app.use('/students', studentsRouter);

app.listen(port || 3000, async () => {
    console.log(`listening on port: ${port}`);
});

