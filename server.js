import express from 'express';
import * as dotenv from 'dotenv';

const app = express();
dotenv.config();
const port = process.env.PORT;

app.listen(port || 3000, async () => {
    console.log(`listening on port: ${port}`);
});

app.get('/', (req, res) => {
    res.send()
}