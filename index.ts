import 'dotenv/config';
import express from 'express';
import path from 'path';
import { IParticipante, Participante } from './db';

const getParticipants = async () => {
    return await Participante.aggregate<IParticipante>()
        .group({
            _id: '$_id.nome',
            list: {
                $push: '$$ROOT'
            }
        })
        .sort({ 'list._id.modified': -1 })
        .append({
            $replaceWith: { $arrayElemAt: ['$list', 0] }
        })
        .sort({ '_id.nome': 1 });
};

const run = async () => {
    const app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.use(express.static(path.join(__dirname, 'public')));

    const config = {
        port: process.env.PORT ?? 8004
    };

    app.get('/', async (req, res) => {
        let participants = await getParticipants();

        participants = participants.filter(x => !x.eliminado);
        participants = participants.sort((a,b) => b.estalecas - a.estalecas)
        participants = participants.sort((a,b) => Number(b.paredao) - Number(a.paredao))

        const lider = participants.filter((x) => x.lider);
        const vip = participants.filter((x) => x.grupo === 'VIP');
        const xepa = participants.filter((x) => x.grupo === 'XEPA');

        res.render('index', { participants: participants, lider: lider, vip: vip, xepa: xepa });
    });

    app.listen(config.port, () => {
        console.log(`Listening on port ${config.port}`);
    });
};

run();
