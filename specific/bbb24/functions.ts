import { Paredao, Participante } from './db';
import { IParticipante, IVoteExtra } from './defaults';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

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