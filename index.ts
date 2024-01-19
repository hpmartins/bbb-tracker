import 'dotenv/config';
import express from 'express';
import path from 'path';
import { IParticipante, Paredao, Participante } from './db';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { PAREDOES } from './defaults';

dayjs.extend(utc);
dayjs.extend(timezone);
const TIMEZONE = 'America/Sao_Paulo';

const countUnique = (arr: any[]) => {
    const counts: { [key: string]: any } = {};
    for (var i = 0; i < arr.length; i++) {
        counts[arr[i].to] = 1 + (counts[arr[i].to] || 0);
    }
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

const getVotosPorParedao = async () => {
    const paredoes = await Paredao.find();
    const votos = paredoes.map((paredao) => {
        const normais = paredao.votos.filter((x) => !x.extra);
        const indicacao = paredao.votos.filter((x) => x.extra?.indicacao)[0]?.to ?? undefined;
        return {
            _id: paredao._id,
            normais: normais,
            normais_unique: countUnique(normais),
            indicacao: indicacao
        };
    });
    return { lista: paredoes, votos };
};

const getActivityDeltas = async () => {
    const grouped: {
        _id: string;
        list: { _id: Date; nomePopular: string; imagem: string; estalecas: number }[];
    }[] = await Participante.aggregate()
        .sort({ '_id.modified': -1 })
        .group({
            _id: '$_id.nome',
            list: {
                $push: {
                    _id: '$_id.modified',
                    nomePopular: '$nomePopular',
                    imagem: '$imagem',
                    estalecas: '$estalecas'
                }
            }
        })
        .addFields({
            list: {
                $sortArray: {
                    input: '$list',
                    sortBy: { modified: -1 }
                }
            },
            n: { $size: '$list' }
        })
        .match({
            n: { $gte: 2 }
        })
        .project({
            n: 0
        });

    const deltas: {
        nome: string;
        nomePopular: string;
        imagem: string;
        modified: Date;
        delta: number;
    }[] = [];

    grouped.map((x) => {
        for (let i = 0; i < x.list.length - 1; i++) {
            let diff = x.list[i].estalecas - x.list[i + 1].estalecas;
            if (diff != 0) {
                deltas.push({
                    nome: x._id,
                    nomePopular: x.list[i].nomePopular,
                    imagem: x.list[i].imagem,
                    modified: x.list[i]._id,
                    delta: x.list[i].estalecas - x.list[i + 1].estalecas
                });
            }
        }
    });

    return deltas.sort((a, b) => (dayjs(a.modified).isAfter(b.modified) ? -1 : 1));
};

const getVotos = async () => {
    const votos = await Paredao.aggregate()
        .unwind('$votos')
        .project({
            paredao: '$_id',
            from: '$votos.from',
            to: '$votos.to',
            extra: '$votos.extra'
        })
        .sort({ paredao: 1 });

    return votos;
    // const votos = paredoes.map((paredao) => {
    //     const normais = paredao.votos.filter((x) => !x.extra);
    //     const indicacao = paredao.votos.filter((x) => x.extra?.indicacao)[0].to;
    //     return {
    //         _id: paredao._id,
    //         normais: normais,
    //         normais_unique: countUnique(normais),
    //         indicacao: indicacao
    //     };
    // });
    // return { number: paredoes.length, votos: votos };
};

const run = async () => {
    const app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.use(express.static(path.join(__dirname, 'public')));

    const config = {
        port: process.env.PORT ?? 8880
    };

    for (const paredao of PAREDOES) {
        await Paredao.findOneAndReplace({ _id: paredao._id }, paredao, { upsert: true });
    }

    app.get('/', async (req, res) => {
        const all_participants = await getParticipants();
        const participants = all_participants
            .filter((x) => !x.eliminado)
            .sort((a, b) => b.estalecas - a.estalecas)
            .sort((a, b) => Number(b.paredao) - Number(a.paredao))
            .sort((a, b) => Number(b.eliminado) - Number(a.eliminado));

        const paredoes = await getVotosPorParedao();
        const votos = await getVotos();

        const lider = participants.filter((x) => x.lider);
        const vip = participants.filter((x) => !x.lider && x.grupo === 'VIP');
        const xepa = participants.filter((x) => !x.lider && x.grupo === 'XEPA');

        const deltas = await getActivityDeltas();

        res.render('index', {
            all_participants: all_participants,
            participants: participants,
            lider: lider,
            vip: vip,
            xepa: xepa,
            paredoes: paredoes,
            votos: votos,
            activity: deltas.map((x) => ({
                ...x,
                modified: dayjs(x.modified).tz(TIMEZONE).format('DD/MM HH:mm')
            }))
        });
    });

    app.listen(config.port, () => {
        console.log(`Listening on port ${config.port}`);
    });
};

run();
