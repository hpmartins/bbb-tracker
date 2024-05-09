import { Router } from 'express';
import chroma from 'chroma-js';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import BBB24JsonData from './bbb24_data.json';

dayjs.extend(utc);
dayjs.extend(timezone);
const TIMEZONE = 'America/Sao_Paulo';

const PARTICIPANTS_DATA = BBB24JsonData.participantes;
const VOTOS_DATA = BBB24JsonData.votos;
const PAREDOES_DATA = BBB24JsonData.paredoes;
const DELTAS_DATA = BBB24JsonData.deltas;

const bbb24Route = Router();

bbb24Route.get('/', (req, res) => {
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

    res.render('bbb24/index', {
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

export default bbb24Route;