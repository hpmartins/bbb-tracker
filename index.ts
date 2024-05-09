import 'dotenv/config';
var cron = require('node-cron');
import express from 'express';
import path from 'path';
import { IParticipante, IVoteExtra, Paredao, Participante } from './db';
import chroma from 'chroma-js';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { PAREDOES } from './defaults';

dayjs.extend(utc);
dayjs.extend(timezone);
const TIMEZONE = 'America/Sao_Paulo';

let VOTOS_DATA: {
    paredao: number;
    from: string;
    to: string;
    extra?: IVoteExtra;
}[];

let PAREDOES_DATA: {
    lista: any[];
    votos: object[];
};

let DELTAS_DATA: {
    nome: string;
    nomePopular: string;
    imagem: string;
    modified: Date;
    delta: number;
}[];

let PARTICIPANTS_DATA: IParticipante[];

const updateAll = async () => {
    VOTOS_DATA = await getVotos();
    PAREDOES_DATA = await getVotosPorParedao();
    DELTAS_DATA = await getActivityDeltas();
    PARTICIPANTS_DATA = await getParticipants();
};

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
                    sortBy: { _id: -1 }
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
            deltas.push({
                nome: x._id,
                nomePopular: x.list[i].nomePopular,
                imagem: x.list[i].imagem,
                modified: x.list[i]._id,
                delta: x.list[i].estalecas - x.list[i + 1].estalecas
            });
        }
    });

    return deltas
        .filter((x) => x.delta != 0)
        .sort((a, b) => (dayjs(a.modified).isAfter(b.modified) ? -1 : 1));
};

const getVotos = async () => {
    const votos: {
        paredao: number;
        from: string;
        to: string;
        extra?: IVoteExtra;
    }[] = await Paredao.aggregate()
        .unwind('$votos')
        .project({
            paredao: '$_id',
            from: '$votos.from',
            to: '$votos.to',
            extra: '$votos.extra'
        })
        .sort({ paredao: 1 });

    return votos;
};

const scheduleTasks = () => {
    cron.schedule('*/1 * * * *', async () => {
        await updateAll();
    });
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

    await updateAll();
    scheduleTasks();

    app.get('/', (req, res) => {
        const all_participants = PARTICIPANTS_DATA.sort((a, b) => {
            if (a.eliminado && !b.eliminado) {
                return 1;
            } else if (!a.eliminado && b.eliminado) {
                return -1;
            } else if (!a.eliminado && !b.eliminado) {
                return a._id.nome.localeCompare(b._id.nome);
            } else {
                return dayjs(b._id.modified).isAfter(a._id.modified) ? 1 : -1;
            }
        });

        const participants = all_participants
            .filter((x) => !x.eliminado)
            .sort((a, b) => b.estalecas - a.estalecas)
            .sort((a, b) => Number(b.paredao) - Number(a.paredao));
        const lider = participants.filter((x) => x.lider);
        const vip = participants.filter((x) => !x.lider && x.grupo === 'VIP');
        const xepa = participants.filter((x) => !x.lider && x.grupo === 'XEPA');
        const eliminados = all_participants
            .filter((x) => x.eliminado)
            .sort((a, b) => (dayjs(b._id.modified).isAfter(a._id.modified) ? 1 : -1));

        let votos_count: number[] = [];
        for (let p1 of all_participants) {
            for (let p2 of all_participants) {
                votos_count.push(
                    VOTOS_DATA.filter((x) => x.from == p1._id.nome && x.to == p2._id.nome).length
                );
            }
        }
        votos_count = [...new Set(votos_count.sort((a, b) => a - b))];

        const votos_cores = Object.fromEntries(
            votos_count.map((x) => {
                let bg_color = chroma
                    .scale('Spectral')
                    .domain([votos_count[votos_count.length - 1], votos_count[0]])(x);

                let fg_color =
                    chroma.contrast(bg_color, chroma('white')) > 7
                        ? chroma('white')
                        : chroma('black');

                return [x, { bg: bg_color.hex(), fg: fg_color.hex() }];
            })
        );

        res.render('index', {
            all_participants: all_participants,
            lider: lider,
            vip: vip,
            xepa: xepa,
            eliminados: eliminados,
            paredoes: PAREDOES_DATA,
            votos: VOTOS_DATA,
            votos_cores: votos_cores,
            activity: DELTAS_DATA.map((x) => ({
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
