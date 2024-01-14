var cron = require('node-cron');
import axios from 'axios';
import { Participante, IParticipante } from './db';
import Bottleneck from 'bottleneck';
import dayjs from 'dayjs';
import { PARTICIPANTES_BBB } from './defaults';

const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 1000
});

const log = (text: string) => {
    console.log(`[${new Date().toLocaleTimeString()}] [bbb-stats] ${text}`);
};

const getData = async (nome: string): Promise<IParticipante | undefined> =>
    limiter
        .schedule(() =>
            axios.get(`https://gshow.globo.com/realities/bbb/bbb-24/participantes/${nome}/`)
        )
        .then((res) => {
            let text = res.data as string;
            text = text.replace(/\n/g, '').replace(/\s\s+/g, ' ');

            const found = text.match(/"externalData":{([^}]+)}/g);
            if (found) {
                for (const match of found) {
                    if (match.includes('membro')) {
                        const full_json = JSON.parse(match.replace(/"externalData":/, ''));
                        const { modified, ...json } = full_json;
                        return {
                            _id: { nome: nome, modified: dayjs(modified).toDate() },
                            ...json
                        } as IParticipante;
                    }
                }
            }
        });

const checkEliminado = async (nome: string) => {
    const data: IParticipante[] = await Participante.aggregate()
        .match({ '_id.nome': nome })
        .sort({ createdAt: -1 })
        .limit(1);
    if (data.length > 0 && data[0].eliminado) {
        return true;
    }
    return false;
};

const getLastModified = async (nome: string) => {
    const data: IParticipante[] = await Participante.aggregate()
        .match({ '_id.nome': nome })
        .sort({ '_id.modified': -1 })
        .limit(1);

    if (data.length > 0) {
        return data[0]._id.modified;
    }
    return dayjs(0);
};

const updateAll = async () => {
    for (const nome of PARTICIPANTES_BBB) {
        if (await checkEliminado(nome)) {
            continue;
        }
        const data = await getData(nome);
        if (data && dayjs(data._id.modified).isAfter(await getLastModified(nome))) {
            log(`atualizando dados de ${nome}`);
            await Participante.updateOne(
                {
                    _id: data._id
                },
                data,
                { upsert: true }
            );
        }
    }
};

const scheduleTasks = () => {
    cron.schedule('0,15,30,45 * * * *', async () => {
        log('atualizando')
        await updateAll();
    });
};

const run = async () => {
    await updateAll();
    scheduleTasks();
};

run();
