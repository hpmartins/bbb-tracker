import 'dotenv/config';
import express from 'express';
import { Eta } from 'eta';
import path from 'path';
import { Participante } from './db';

const getParticipants = async () => {
    const query = await Participante.aggregate()
        .sort({ createdAt: -1 })
        .group({
            _id: '$nomeId',
            list: {
                $push: "$$ROOT"
            }
        })
    
    console.log(query)
}

const run = async () => {
    const app = express()
    const eta = new Eta({ views: path.join(__dirname, "templates"), cache: true })

    const config = {
        port: process.env.PORT ?? 8004,
    }

    await getParticipants()

    app.get("/", (req, res) => {
        res.status(200).send(eta.render("index", {}))
    })

    app.listen(config.port, () => {
        console.log(`Listening on port ${config.port}`)
    })
};

run();
