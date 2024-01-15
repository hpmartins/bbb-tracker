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

export const PAREDOES = [
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
            },
            {
                from: 'juninho',
                to: 'thalyta',
                extra: { contragolpe: true }
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
                extra: { indicacao: true }
            },
            {
                from: 'rodriguinho',
                to: 'juninho',
                extra: { minerva: true }
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
            },
            {
                from: 'davi',
                to: 'nizam',
            },
            {
                from: 'deniziane',
                to: 'raquele',
            },
            {
                from: 'fernanda',
                to: 'alane'
            },
            {
                from: 'giovanna',
                to: 'juninho',
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
                extra: { indicacao: true }
            },
            {
                from: 'lucas-henrique',
                to: 'lucas-pizane',
                extra: { minerva: true }
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
                from: 'mc-bin-laden',
                to: 'raquele'
            },
            {
                from: 'michel',
                to: 'nizam'
            },
            {
                from: 'nizam',
                to: 'davi',
                extra: { group_vote: true },
            },
            {
                from: 'raquele',
                to: 'davi',
                extra: { group_vote: true },
            },
            {
                from: 'rodriguinho',
                to: 'davi',
                extra: { group_vote: true },
            },
            {
                from: 'vanessa-lopes',
                to: 'alane'
            },
            {
                from: 'vinicius-rodrigues',
                to: 'michel',
            },
            {
                from: 'wanessa-camargo',
                to: 'davi'
            },
            {
                from: 'yasmin-brunet',
                to: 'marcus-vinicius',
            },      
            {
                from: 'beatriz',
                to: 'rodriguinho',
                extra: { veto: true },
            },
            {
                from: 'davi',
                to: 'matteus',
                extra: { veto: true },
            },
            {
                from: 'deniziane',
                to: 'juninho',
                extra: { veto: true },
            },
            {
                from: 'giovanna',
                to: 'nizam',
                extra: { veto: true },
            },
            {
                from: 'yasmin-brunet',
                to: 'lucas-luigi',
                extra: { veto: true },
            }, 
            {
                from: 'vinicius-rodrigues',
                to: 'raquele',
                extra: { veto: true },
            },
        ]
    }
];
