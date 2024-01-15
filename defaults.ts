export const PARTICIPANTES_BBB = [
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

export const VOTOS = [
    {
        _id: 1,
        votos: [
            {
                from: 'alane',
                to: 'giovanna'
            },
            {
                from: 'beatriz',
                to: 'fernanda'
            },
            {
                from: 'davi',
                to: 'rodriguinho'
            },
            {
                from: 'deniziane',
                to: 'maycon',
                extra: { indicacao: true }
            },
            {
                from: 'fernanda',
                to: 'giovanna'
            },
            {
                from: 'giovanna',
                to: 'giovanna-pitel'
            },
            {
                from: 'giovanna-pitel',
                to: 'giovanna'
            },
            {
                from: 'isabelle',
                to: 'matteus'
            },
            {
                from: 'juninho',
                to: 'yasmin-brunet'
            },
            {
                from: 'leidy-elin',
                to: 'giovanna'
            },
            {
                from: 'lucas-henrique',
                to: 'yasmin-brunet'
            },
            {
                from: 'lucas-luigi',
                to: 'yasmin-brunet'
            },
            {
                from: 'lucas-pizane',
                to: 'raquele'
            },
            {
                from: 'marcus-vinicius',
                to: 'mc-bin-laden'
            },
            {
                from: 'matteus',
                to: 'giovanna'
            },
            {
                from: 'maycon',
                to: 'yasmin-brunet'
            },
            {
                from: 'mc-bin-laden',
                to: 'giovanna'
            },
            {
                from: 'michel',
                to: 'giovanna-pitel'
            },
            {
                from: 'nizam',
                to: 'yasmin-brunet'
            },
            {
                from: 'raquele',
                to: 'giovanna-pitel'
            },
            {
                from: 'rodriguinho',
                to: 'thalyta'
            },
            {
                from: 'thalyta',
                to: 'giovanna-pitel'
            },
            {
                from: 'vanessa-lopes',
                to: 'raquele'
            },
            {
                from: 'vinicius-rodrigues',
                to: 'giovanna'
            },
            {
                from: 'wanessa-camargo',
                to: 'lucas-henrique'
            },
            {
                from: 'yasmin-brunet',
                to: 'lucas-luigi'
            }
        ]
    },
    {
        _id: 2,
        votos: [
            {
                from: 'alane',
                to: 'giovanna-pitel'
            },
            {
                from: 'beatriz',
                to: 'fernanda'
            },
            {
                from: 'davi',
                to: 'lucas-luigi'
            },
            {
                from: 'deniziane',
                to: 'raquele'
            },
            {
                from: 'fernanda',
                to: 'alane'
            },
            {
                from: 'giovanna',
                to: 'juninho'
            },
            {
                from: 'giovanna-pitel',
                to: 'raquele'
            },
            {
                from: 'isabelle',
                to: 'nizam'
            },
            {
                from: 'juninho',
                to: 'deniziane',
                extra: { contragolpe: 'thalyta' }
            },
            {
                from: 'leidy-elin',
                to: 'lucas-luigi'
            },
            {
                from: 'lucas-henrique',
                to: 'marcus-vinicius'
            },
            {
                from: 'lucas-luigi',
                to: 'juninho'
            },
            {
                from: 'lucas-pizane',
                to: 'raquele'
            },
            {
                from: 'marcus-vinicius',
                to: 'giovanna-pitel'
            },
            {
                from: 'matteus',
                to: 'raquele'
            },
            {
                from: 'maycon',
                to: null,
            },
            {
                from: 'mc-bin-laden',
                to: 'raquele'
            },
            {
                from: 'michel',
                to: 'giovanna-pitel'
            },
            {
                from: 'nizam',
                to: 'raquele'
            },
            {
                from: 'raquele',
                to: 'juninho'
            },
            {
                from: 'rodriguinho',
                to: 'davi',
                extra: { indicacao: true, minerva: 'juninho' }
            },
            {
                from: 'thalyta',
                to: 'juninho'
            },
            {
                from: 'vanessa-lopes',
                to: 'thalyta'
            },
            {
                from: 'vinicius-rodrigues',
                to: 'marcus-vinicius'
            },
            {
                from: 'wanessa-camargo',
                to: 'juninho'
            },
            {
                from: 'yasmin-brunet',
                to: 'juninho'
            }
        ]
    },
    {
        _id: 3,
        votos: [
            {
                from: 'alane',
                to: 'lucas-pizane'
            },
            {
                from: 'beatriz',
                to: 'lucas-pizane',
                extra: { veto: 'rodriguinho' },
            },
            {
                from: 'davi',
                to: 'nizam',
                extra: { veto: 'matteus' },
            },
            {
                from: 'deniziane',
                to: 'raquele',
                extra: { veto: 'juninho' },
            },
            {
                from: 'fernanda',
                to: 'alane'
            },
            {
                from: 'giovanna',
                to: 'juninho',
                extra: { veto: 'nizam' },
            },
            {
                from: 'giovanna-pitel',
                to: 'alane'
            },
            {
                from: 'isabelle',
                to: 'nizam'
            },
            {
                from: 'juninho',
                to: 'davi',
                extra: { group_vote: true },
            },
            {
                from: 'leidy-elin',
                to: 'lucas-pizane'
            },
            {
                from: 'lucas-henrique',
                to: 'beatriz',
                extra: { indicacao: true, minerva: 'lucas-pizane' }
            },
            {
                from: 'lucas-luigi',
                to: 'davi',
                extra: { group_vote: true },
            },
            {
                from: 'lucas-pizane',
                to: 'alane'
            },
            {
                from: 'marcus-vinicius',
                to: 'lucas-pizane'
            },
            {
                from: 'matteus',
                to: 'davi',
                extra: { group_vote: true },
            },
            {
                from: 'maycon',
                to: null,
            },
            {
                from: 'mc-bin-laden',
                to: 'raquele'
            },
            {
                from: 'michel',
                to: 'nizam'
            },
            {
                from: 'nizam',
                to: '',
                extra: { group_vote: true },
            },
            {
                from: 'raquele',
                to: '',
                extra: { group_vote: true },
            },
            {
                from: 'rodriguinho',
                to: '',
                extra: { group_vote: true },
            },
            {
                from: 'thalyta',
                to: null,
            },
            {
                from: 'vanessa-lopes',
                to: 'alane'
            },
            {
                from: 'vinicius-rodrigues',
                to: 'michel',
                extra: { veto: 'raquele' },
            },
            {
                from: 'wanessa-camargo',
                to: 'davi'
            },
            {
                from: 'yasmin-brunet',
                to: 'marcus-vinicius',
                extra: { veto: 'yasmin-brunet' },
            }
        ]
    }
];
