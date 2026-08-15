import express from 'express';
const app = express();

import 'dotenv/config';
import mongoose from 'mongoose';

app.use(express.json());

import { route } from './Routes/login.js';
import { game } from './Routes/case.js';
import { susp } from './Routes/suspects.js';
import { evid } from './Routes/evidences.js';
import { invest } from './Routes/investigations.js';

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Database connected..');
        app.listen(3000, () => {
        console.log("Server at port http://localhost:3000");
    });
})  .catch((err) => {
    console.error(err);
});

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'I am up..',
    });
});

app.use(route);
app.use(game);
app.use(susp);
app.use(evid);
app.use(invest);