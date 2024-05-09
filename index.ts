import 'dotenv/config';
import express from 'express';
import path from 'path';

import bbb24Route from './specific/bbb24/routes';

const run = async () => {
    const app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/24', bbb24Route);

    app.get('/', (req, res) => {
        res.render('index');
    })

    const port = process.env.PORT ?? 8880
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};

run();
