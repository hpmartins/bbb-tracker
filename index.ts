import 'dotenv/config';
import express from 'express';
import path from 'path';
import { IParticipante, Paredao, Participante } from './db';

const countUnique = (arr: any[]) => {
    const counts: {[key: string]: any} = {};
    for (var i = 0; i < arr.length; i++) {
       counts[arr[i].to] = 1 + (counts[arr[i].to] || 0);
    };
    return counts;
 };

const getParticipants = async () => {
    return await Participante.aggregate<IParticipante>()
        .group({
            _id: '$_id.nome',
            list: {
                $push: '$$ROOT'
            }
        })
        .addFields({
            list: {
                $sortArray: {
                    input: '$list',
                    sortBy: { '_id.modified': -1 }
                }
            }
        })
        .append({
            $replaceWith: { $arrayElemAt: ['$list', 0] }
        })
        .sort({ '_id.nome': 1 });
};

const getParedoes = async () => {
    const paredoes = await Paredao.find()
    const votos = paredoes.map((paredao) => {
        const normais = paredao.votos.filter(x => !x.extra)
        const indicacao = paredao.votos.filter(x => x.extra?.indicacao)[0].to
        return {
            _id: paredao._id,
            normais: countUnique(normais),
            indicacao: indicacao,
        }
    })
    return { paredoes, votos }
}

const run = async () => {
    const app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.use(express.static(path.join(__dirname, 'public')));

    const config = {
        port: process.env.PORT ?? 8880
    };

    app.get('/', async (req, res) => {
        const all_participants = await getParticipants();
        const participants = all_participants
            .filter((x) => !x.eliminado)
            .sort((a, b) => b.estalecas - a.estalecas)
            .sort((a, b) => Number(b.paredao) - Number(a.paredao))
            .sort((a, b) => Number(b.eliminado) - Number(a.eliminado));
        const { paredoes, votos } = await getParedoes();

        const lider = participants.filter((x) => x.lider);
        const vip = participants.filter((x) => x.grupo === 'VIP');
        const xepa = participants.filter((x) => x.grupo === 'XEPA');

        res.render('index', {
            all_participants: all_participants,
            participants: participants,
            lider: lider,
            vip: vip,
            xepa: xepa,
            paredoes: paredoes,
            votos: votos,
        });
    });

    // app.get('/proxy', async (req, res) => {
    //     const src = String(req.query.src)
    //     const targetUrl = new URL(src);

    //     if (targetUrl.host !== 's2.glbimg.com') {
    //         res.status(400).send('invalid src');
    //     }

    //     axios({
    //         method: 'get',
    //         url: targetUrl.href,
    //         responseType: 'arraybuffer'
    //       })
    //       .then((result) => {
    //          res
    //            .header("content-type", result.headers['content-type'])
    //            .send(Buffer.from(result.data, 'binary'))
    //       });
    // });

    app.listen(config.port, () => {
        console.log(`Listening on port ${config.port}`);
    });
};

run();
