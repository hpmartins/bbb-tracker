var cron = require('node-cron');
import axios from 'axios';
import { Participante, IParticipante } from './db';
import Bottleneck from 'bottleneck';

const users = [
    'alane',
    'beatriz',
    'davi',
    'deniziane',
    'fernanda',
    'giovanna',
    'giovanna-pitel',
    'isabelle',
    'juninho',
    'leidy-elin',
    'lucas-henrique',
    'lucas-luigi',
    'lucas-pizane',
    'marcus-vinicius',
    'matteus',
    'maycon',
    'mc-bin-laden',
    'michel',
    'nizam',
    'raquele',
    'rodriguinho',
    'thalyta',
    'vanessa-lopes',
    'vinicius-rodrigues',
    'wanessa-camargo',
    'yasmin-brunet'
];

const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 1000
});

const getData = async (nomeId: string): Promise<IParticipante | undefined> => {
    console.log(`Getting '${nomeId}' data`);

    const data: IParticipante[] = await Participante.aggregate()
        .match({ nomeId: nomeId })
        .sort({ createdAt: -1 })
        .limit(1);

    if (data.length > 0 && data[0].eliminado) {
        console.log(`Pulando participante eliminado: ${nomeId}`);
        return;
    }

    return limiter
        .schedule(() =>
            axios.get(`https://gshow.globo.com/realities/bbb/bbb-24/participantes/${nomeId}/`)
        )
        .then((res) => {
            let text = res.data as string;
            text = text.replace(/\n/g, '').replace(/\s\s+/g, ' ');

            const found = text.match(/"externalData":{([^}]+)}/g);
            if (found) {
                for (const match of found) {
                    if (match.includes('membro')) {
                        const json = JSON.parse(match.replace(/"externalData":/, ''));
                        return { nomeId: nomeId, ...json } as IParticipante;
                    }
                }
            }
        });
};

const updateAll = async () => {
    for (const nomeId of users) {
        const data = await getData(nomeId);
        if (data) {
            await Participante.create(data);
        }
    }
};

const scheduleTasks = () => {
    cron.schedule('0,30 * * * *', async () => {
        await updateAll();
    });
};

const run = async () => {
    await updateAll();
    scheduleTasks();
};

run();
