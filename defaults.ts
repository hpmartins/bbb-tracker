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
        resultado: ['yasmin', 'giovanna', 'maycon'],
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
        resultado: ['davi', 'juninho', 'thalyta'],
        anjo: [
            {
                from: 'matteus',
                to: 'lucas-pizane',
                autoimune: true
            }
        ],
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
                to: 'deniziane'
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
        resultado: ['beatriz', 'davi', 'lucas-pizane'],
        votos: [
            {
                from: 'alane',
                to: 'lucas-pizane'
            },
            {
                from: 'beatriz',
                to: 'lucas-pizane'
            },
            {
                from: 'davi',
                to: 'nizam'
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
                to: 'alane'
            },
            {
                from: 'isabelle',
                to: 'nizam'
            },
            {
                from: 'juninho',
                to: 'davi',
                extra: { group_vote: true }
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
                extra: { group_vote: true }
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
                extra: { group_vote: true }
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
                extra: { group_vote: true }
            },
            {
                from: 'raquele',
                to: 'davi',
                extra: { group_vote: true }
            },
            {
                from: 'rodriguinho',
                to: 'davi',
                extra: { group_vote: true }
            },
            {
                from: 'vanessa-lopes',
                to: 'alane'
            },
            {
                from: 'vinicius-rodrigues',
                to: 'michel'
            },
            {
                from: 'wanessa-camargo',
                to: 'davi'
            },
            {
                from: 'yasmin-brunet',
                to: 'marcus-vinicius'
            },
            {
                from: 'beatriz',
                to: 'rodriguinho',
                extra: { veto: true }
            },
            {
                from: 'davi',
                to: 'matteus',
                extra: { veto: true }
            },
            {
                from: 'deniziane',
                to: 'juninho',
                extra: { veto: true }
            },
            {
                from: 'giovanna',
                to: 'nizam',
                extra: { veto: true }
            },
            {
                from: 'yasmin-brunet',
                to: 'lucas-luigi',
                extra: { veto: true }
            },
            {
                from: 'vinicius-rodrigues',
                to: 'raquele',
                extra: { veto: true }
            }
        ]
    },
    {
        _id: 4,
        resultado: ['nizam', 'giovanna-pitel', 'raquele'],
        anjo: [
            {
                from: 'lucas-luigi',
                to: 'mc-bin-laden',
                autoimune: true,
            },
            {
                from: 'lucas-henrique',
                to: 'mc-bin-laden',
                autoimune: true,
            },
        ],
        votos: [
            {
                from: 'alane',
                to: 'nizam',
            },
            {
                from: 'alane',
                to: 'raquele',
            },
            {
                from: 'beatriz',
                to: 'vinicius-rodrigues',
            },
            {
                from: 'beatriz',
                to: 'nizam',
            },
            {
                from: 'davi',
                to: 'nizam',
            },
            {
                from: 'davi',
                to: 'rodriguinho',
            },
            {
                from: 'deniziane',
                to: 'vinicius-rodrigues',
            },
            {
                from: 'deniziane',
                to: 'nizam',
            },
            {
                from: 'fernanda',
                to: 'alane',
            },
            {
                from: 'fernanda',
                to: 'giovanna',
            },
            {
                from: 'giovanna',
                to: 'nizam',
            },
            {
                from: 'giovanna',
                to: 'fernanda',
            },
            {
                from: 'giovanna-pitel',
                to: 'marcus-vinicius',
            },
            {
                from: 'giovanna-pitel',
                to: 'michel',
            },
            {
                from: 'isabelle',
                to: 'nizam',
            },
            {
                from: 'isabelle',
                to: 'rodriguinho',
            },
            {
                from: 'juninho',
                to: 'marcus-vinicius',
            },
            {
                from: 'juninho',
                to: 'giovanna',
            },
            {
                from: 'leidy-elin',
                to: 'rodriguinho',
            },
            {
                from: 'leidy-elin',
                to: 'raquele',
            },
            {
                from: 'lucas-henrique',
                to: 'davi',
            },
            {
                from: 'lucas-henrique',
                to: 'alane',
            },
            {
                from: 'lucas-luigi',
                to: 'davi',
            },
            {
                from: 'lucas-luigi',
                to: 'beatriz',
            },
            {
                from: 'marcus-vinicius',
                to: 'vinicius-rodrigues'
            },
            {
                from: 'marcus-vinicius',
                to: 'raquele'
            },
            {
                from: 'matteus',
                to: 'giovanna-pitel',
                extra: {
                    indicacao: true,
                }
            },
            {
                from: 'matteus',
                to: 'raquele',
                extra: {
                    minerva: true,
                }
            },
            {
                from: 'mc-bin-laden',
                to: 'davi',
            },
            {
                from: 'mc-bin-laden',
                to: 'marcus-vinicius',
            },
            {
                from: 'michel',
                to: 'juninho',
            },
            {
                from: 'michel',
                to: 'fernanda',
            },
            {
                from: 'nizam',
                to: 'isabelle',
            },
            {
                from: 'nizam',
                to: 'raquele',
            },
            {
                from: 'raquele',
                to: 'nizam',
            },
            {
                from: 'raquele',
                to: 'deniziane',
            },
            {
                from: 'rodriguinho',
                to: 'raquele',
            },
            {
                from: 'rodriguinho',
                to: 'davi',
            },
            {
                from: 'vinicius-rodrigues',
                to: 'alane',
            },
            {
                from: 'vinicius-rodrigues',
                to: 'marcus-vinicius',
            },
            {
                from: 'wanessa-camargo',
                to: 'vinicius-rodrigues',
            },
            {
                from: 'wanessa-camargo',
                to: 'fernanda',
            },
            {
                from: 'yasmin-brunet',
                to: 'vinicius-rodrigues',
            },
            {
                from: 'yasmin-brunet',
                to: 'davi',
            },
        ]
    },
    {
        _id: 5,
        resultado: ['alane', 'vinicius-rodrigues', 'marcus-vinicius', 'giovanna-pitel', 'lucas-luigi'],
        votos: [
            {
                from: 'alane',
                to: 'vinicius-rodrigues'
            },
            {
                from: 'alane',
                to: 'giovanna-pitel',
                extra: { contragolpe: true }
            },
            {
                from: 'beatriz',
                to: 'lucas-henrique'
            },
            {
                from: 'davi',
                to: 'mc-bin-laden'
            },
            {
                from: 'deniziane',
                to: 'vinicius-rodrigues',
            },
            {
                from: 'fernanda',
                to: 'isabelle'
            },
            {
                from: 'giovanna',
                to: 'fernanda'
            },
            {
                from: 'giovanna-pitel',
                to: 'marcus-vinicius'
            },
            {
                from: 'giovanna-pitel',
                to: 'lucas-luigi',
                extra: { group_vote: true }
            },
            {
                from: 'isabelle',
                to: 'mc-bin-laden'
            },
            {
                from: 'juninho',
                to: 'giovanna'
            },
            {
                from: 'leidy-elin',
                to: 'vinicius-rodrigues'
            },
            {
                from: 'lucas-henrique',
                to: 'davi'
            },
            {
                from: 'lucas-luigi',
                to: 'davi'
            },
            {
                from: 'marcus-vinicius',
                to: 'vinicius-rodrigues'
            },
            {
                from: 'marcus-vinicius',
                to: 'lucas-luigi',
                extra: { group_vote: true }
            },
            {
                from: 'matteus',
                to: 'juninho'
            },
            {
                from: 'mc-bin-laden',
                to: 'marcus-vinicius'
            },
            {
                from: 'michel',
                to: 'lucas-henrique'
            },
            {
                from: 'raquele',
                to: 'deniziane'
            },
            {
                from: 'rodriguinho',
                to: 'alane',
                extra: { indicacao: true }
            },
            {
                from: 'vinicius-rodrigues',
                to: 'marcus-vinicius'
            },
            {
                from: 'vinicius-rodrigues',
                to: 'marcus-vinicius',
                extra: { contragolpe: true }
            },
            {
                from: 'wanessa-camargo',
                to: 'lucas-luigi'
            },
            {
                from: 'yasmin-brunet',
                to: 'mc-bin-laden'
            }
        ]
    },
    {
        _id: 6,
        resultado: ['isabelle', 'juninho', 'alane', 'lucas-luigi'],
        anjo: [
            {
                from: 'fernanda',
                to: 'rodriguinho',
                autoimune: true,
            },
        ],
        votos: [
            {
                from: 'alane',
                to: 'giovanna',
            },
            {
                from: 'beatriz',
                to: 'giovanna',
            },
            {
                from: 'davi',
                to: 'lucas-henrique',
            },
            {
                from: 'deniziane',
                to: 'giovanna',
            },
            {
                from: 'fernanda',
                to: 'alane',
            },
            {
                from: 'giovanna',
                to: 'alane',
            },
            {
                from: 'giovanna-pitel',
                to: 'davi',
            },
            {
                from: 'isabelle',
                to: 'lucas-henrique',
            },
            {
                from: 'juninho',
                to: 'davi',
            },
            {
                from: 'leidy-elin',
                to: 'davi',
            },
            {
                from: 'lucas-henrique',
                to: 'davi',
            },
            {
                from: 'lucas-luigi',
                to: 'davi',
            },
            {
                from: 'marcus-vinicius',
                to: 'davi'
            },
            {
                from: 'matteus',
                to: 'giovanna',
            },
            {
                from: 'mc-bin-laden',
                to: 'isabelle',
                extra: { indicacao: true }
            },
            {
                from: 'michel',
                to: 'alane',
            },
            {
                from: 'raquele',
                to: 'alane',
            },
            {
                from: 'rodriguinho',
                to: 'davi',
            },
            {
                from: 'wanessa-camargo',
                to: 'davi',
            },
            {
                from: 'yasmin-brunet',
                to: 'davi',
            },
            {
                from: 'lucas-luigi',
                to: 'alane',
                extra: { group_vote: true },
            },
            {
                from: 'juninho',
                to: 'alane',
                extra: { group_vote: true },
            },
            {
                from: 'giovanna-pitel',
                to: 'alane',
                extra: { group_vote: true },
            },
            {
                from: 'marcus-vinicius',
                to: 'giovanna-pitel',
                extra: { bigfone: true },
            },
            {
                from: 'marcus-vinicius',
                to: 'juninho',
                extra: { bigfone: true },
            },
            {
                from: 'marcus-vinicius',
                to: 'lucas-luigi',
                extra: { bigfone: true },
            },
        ]
    },
    {
        _id: 7,
        resultado: ['beatriz', 'alane', 'isabelle', 'juninho'],
        anjo: [
            {
                from: 'matteus',
                to: 'deniziane',
                autoimune: true,
            },
        ],
        votos: [
            {
                from: 'fernanda',
                to: 'beatriz',
                extra: { indicacao: true }
            },
            {
                from: 'fernanda',
                to: 'alane',
                extra: { minerva: true }
            },
            // voto AB/BA
            {
                from: 'alane',
                to: 'juninho',
            },
            {
                from: 'beatriz',
                to: 'juninho',
            },
            {
                from: 'davi',
                to: 'mc-bin-laden',
            },
            {
                from: 'deniziane',
                to: 'juninho',
            },
            {
                from: 'giovanna',
                to: 'alane',
            },
            {
                from: 'giovanna-pitel',
                to: 'alane',
            },
            {
                from: 'isabelle',
                to: 'juninho',
            },
            {
                from: 'juninho',
                to: 'alane',
            },
            {
                from: 'leidy-elin',
                to: 'michel',
            },
            {
                from: 'lucas-henrique',
                to: 'isabelle',
            },
            {
                from: 'marcus-vinicius',
                to: 'raquele'
            },
            {
                from: 'matteus',
                to: 'juninho',
            },
            {
                from: 'mc-bin-laden',
                to: 'wanessa-camargo',
            },
            {
                from: 'michel',
                to: 'juninho',
            },
            {
                from: 'raquele',
                to: 'juninho',
            },
            {
                from: 'rodriguinho',
                to: 'isabelle',
            },
            {
                from: 'wanessa-camargo',
                to: 'mc-bin-laden',
            },
            {
                from: 'yasmin-brunet',
                to: 'isabelle',
            },
            // votos AA/BB
            {
                from: 'alane',
                to: 'raquele',
            },
            {
                from: 'beatriz',
                to: 'michel',
            },
            {
                from: 'davi',
                to: 'michel',
            },
            {
                from: 'deniziane',
                to: 'isabelle',
            },
            {
                from: 'giovanna',
                to: 'yasmin-brunet',
            },
            {
                from: 'giovanna-pitel',
                to: 'marcus-vinicius',
            },
            {
                from: 'isabelle',
                to: 'wanessa-camargo',
            },
            {
                from: 'juninho',
                to: 'marcus-vinicius',
            },
            {
                from: 'leidy-elin',
                to: 'rodriguinho',
            },
            {
                from: 'lucas-henrique',
                to: 'giovanna',
            },
            {
                from: 'marcus-vinicius',
                to: 'giovanna'
            },
            {
                from: 'matteus',
                to: 'isabelle',
            },
            {
                from: 'mc-bin-laden',
                to: 'marcus-vinicius',
            },
            {
                from: 'michel',
                to: 'wanessa-camargo',
            },
            {
                from: 'raquele',
                to: 'wanessa-camargo',
            },
            {
                from: 'rodriguinho',
                to: 'marcus-vinicius',
            },
            {
                from: 'wanessa-camargo',
                to: 'raquele',
            },
            {
                from: 'yasmin-brunet',
                to: 'giovanna',
            },
        ]
    },
    {
        _id: 8,
        resultado: ['davi', 'isabelle', 'marcus-vinicius'],
        anjo: [
            {
                from: 'michel',
                to: 'giovanna',
                autoimune: true,
            },
        ],
        votos: [
            {
                from: 'alane',
                to: 'fernanda',
            },
            {
                from: 'beatriz',
                to: 'fernanda',
            },
            {
                from: 'davi',
                to: 'fernanda',
            },
            {
                from: 'deniziane',
                to: 'fernanda',
            },
            {
                from: 'fernanda',
                to: 'marcus-vinicius',
            },
            {
                from: 'giovanna',
                to: 'marcus-vinicius',
            },
            {
                from: 'giovanna-pitel',
                to: 'marcus-vinicius',
            },
            {
                from: 'isabelle',
                to: 'fernanda',
            },
            {
                from: 'leidy-elin',
                to: 'fernanda',
            },
            {
                from: 'lucas-henrique',
                to: 'davi',
                extra: { indicacao: true }
            },
            {
                from: 'lucas-henrique',
                to: 'isabelle',
                extra: { minerva: true }
            },
            {
                from: 'marcus-vinicius',
                to: 'fernanda'
            },
            {
                from: 'matteus',
                to: 'fernanda',
            },
            {
                from: 'mc-bin-laden',
                to: 'wanessa-camargo',
            },
            {
                from: 'michel',
                to: 'marcus-vinicius',
            },
            {
                from: 'raquele',
                to: 'marcus-vinicius',
            },
            {
                from: 'rodriguinho',
                to: 'marcus-vinicius',
            },
            {
                from: 'wanessa-camargo',
                to: 'fernanda',
            },
            {
                from: 'yasmin-brunet',
                to: 'fernanda',
            },
        ],
    },
    {
        _id: 9,
        resultado: ['deniziane', 'matteus', 'fernanda'],
        anjo: [
            {
                from: 'michel',
                to: '',
                autoimune: true,
            },
        ],
        votos: [
            {
                from: 'alane',
                to: 'fernanda',
            },
            {
                from: 'beatriz',
                to: 'fernanda',
            },
            {
                from: 'davi',
                to: 'fernanda',
            },
            {
                from: 'deniziane',
                to: 'fernanda',
            },
            {
                from: 'fernanda',
                to: 'matteus',
            },
            {
                from: 'giovanna',
                to: 'wanessa-camargo',
            },
            {
                from: 'giovanna-pitel',
                to: 'matteus',
            },
            {
                from: 'isabelle',
                to: 'matteus',
            },
            {
                from: 'leidy-elin',
                to: 'fernanda',
            },
            {
                from: 'lucas-henrique',
                to: 'fernanda',
            },
            {
                from: 'matteus',
                to: 'fernanda',
            },
            {
                from: 'mc-bin-laden',
                to: 'fernanda',
            },
            {
                from: 'michel',
                to: 'davi',
            },
            {
                from: 'michel',
                to: 'lucas-henrique',
                extra: { indicacao: true }
            },
            {
                from: 'raquele',
                to: 'deniziane',
                extra: { indicacao: true }
            },
            {
                from: 'rodriguinho',
                to: 'davi',
            },
            {
                from: 'wanessa-camargo',
                to: 'fernanda',
            },
            {
                from: 'yasmin-brunet',
                to: 'fernanda',
            },
        ],
    },
    {
        _id: 10,
        resultado: ['fernanda', 'lucas-henrique', 'rodriguinho'],
        anjo: [
            {
                from: 'michel',
                to: 'giovanna',
                autoimune: true,
            },
        ],
        votos: [
            {
                from: 'alane',
                to: 'mc-bin-laden',
            },
            {
                from: 'beatriz',
                to: 'rodriguinho',
                extra: { indicacao: true }
            },
            {
                from: 'davi',
                to: 'mc-bin-laden',
            },
            {
                from: 'fernanda',
                to: 'mc-bin-laden',
            },
            {
                from: 'giovanna',
                to: 'wanessa-camargo',
            },
            {
                from: 'giovanna-pitel',
                to: 'mc-bin-laden',
            },
            {
                from: 'isabelle',
                to: 'mc-bin-laden',
            },
            {
                from: 'isabelle',
                to: 'lucas-henrique',
                extra: { indicacao: true }
            },
            {
                from: 'leidy-elin',
                to: 'davi',
            },
            {
                from: 'leidy-elin',
                to: 'fernanda',
                extra: { indicacao: true }
            },
            {
                from: 'lucas-henrique',
                to: 'davi',
            },
            {
                from: 'matteus',
                to: 'mc-bin-laden',
            },
            {
                from: 'mc-bin-laden',
                to: 'davi',
            },
            {
                from: 'michel',
                to: 'mc-bin-laden',
            },
            {
                from: 'raquele',
                to: 'wanessa-camargo',
            },
            {
                from: 'rodriguinho',
                to: 'davi',
            },
            {
                from: 'wanessa-camargo',
                to: 'mc-bin-laden',
            },
            {
                from: 'yasmin-brunet',
                to: 'mc-bin-laden',
            },
        ],
    },
    {
        _id: 11,
        resultado: ['michel', 'alane', 'davi'],
        anjo: [
            {
                from: 'giovanna-pitel',
                to: 'fernanda',
                autoimune: true,
            },
        ],
        votos: [
            {
                from: 'alane',
                to: 'yasmin-brunet',
            },
            {
                from: 'beatriz',
                to: 'mc-bin-laden',
            },
            {
                from: 'davi',
                to: 'yasmin-brunet',
            },
            // {
            //     from: 'davi',
            //     to: 'davi',
            //     extra: { bigfone: true }
            // },
            {
                from: 'fernanda',
                to: 'alane',
            },
            {
                from: 'giovanna',
                to: 'alane',
            },
            {
                from: 'giovanna-pitel',
                to: 'alane',
            },
            {
                from: 'giovanna-pitel',
                to: 'alane',
            },
            {
                from: 'isabelle',
                to: 'mc-bin-laden',
            },
            {
                from: 'leidy-elin',
                to: 'mc-bin-laden',
            },
            {
                from: 'lucas-henrique',
                to: 'michel',
                extra: { indicacao: true }
            },
            {
                from: 'matteus',
                to: 'yasmin-brunet',
            },
            {
                from: 'mc-bin-laden',
                to: 'alane',
            },
            {
                from: 'michel',
                to: 'mc-bin-laden',
            },
            {
                from: 'raquele',
                to: 'mc-bin-laden',
            },
            {
                from: 'yasmin-brunet',
                to: 'alane',
            },
        ],
    },
    {
        _id: 12,
        resultado: ['lucas-henrique', 'isabelle', 'yasmin-brunet'],
        anjo: [
            {
                from: 'lucas-henrique',
                to: 'leidy-elin',
                autoimune: false,
            },
        ],
        votos: [
            {
                from: 'alane',
                to: 'mc-bin-laden',
            },
            {
                from: 'beatriz',
                to: 'yasmin-brunet',
                extra: { indicacao: true }
            },
            {
                from: 'davi',
                to: 'mc-bin-laden',
            },
            {
                from: 'fernanda',
                to: 'matteus',
            },
            {
                from: 'giovanna',
                to: 'matteus',
            },
            {
                from: 'giovanna-pitel',
                to: 'matteus',
            },
            {
                from: 'isabelle',
                to: 'mc-bin-laden',
            },
            {
                from: 'leidy-elin',
                to: 'davi',
            },
            {
                from: 'lucas-henrique',
                to: 'alane',
            },
            {
                from: 'giovanna-pitel',
                to: 'isabelle',
                extra: { contragolpe: true }
            },
            {
                from: 'matteus',
                to: 'mc-bin-laden',
            },
            {
                from: 'mc-bin-laden',
                to: 'matteus',
            },
            {
                from: 'raquele',
                to: 'matteus',
            },
            {
                from: 'yasmin-brunet',
                to: 'matteus',
            },
        ],
    },
    {
        _id: 13,
        resultado: ['alane', 'beatriz', 'raquele'],
        anjo: [
            {
                from: 'matteus',
                to: 'beatriz',
                autoimune: true,
            },
        ],
        votos: [
            {
                from: 'giovanna',
                to: 'beatriz',
                extra: { indicacao: true }
            },

            {
                from: 'alane',
                to: 'mc-bin-laden',
                // extra: { extraVote: true }
            },
            {
                from: 'beatriz',
                to: 'mc-bin-laden',
                // extra: { extraVote: true }
            },
            {
                from: 'davi',
                to: 'mc-bin-laden',
                // extra: { extraVote: true }
            },
            {
                from: 'fernanda',
                to: 'davi',
                // extra: { extraVote: true }
            },
            {
                from: 'giovanna-pitel',
                to: 'davi',
                // extra: { extraVote: true }
            },
            {
                from: 'isabelle',
                to: 'mc-bin-laden',
                // extra: { extraVote: true }
            },
            {
                from: 'leidy-elin',
                to: 'davi',
                // extra: { extraVote: true }
            },
            {
                from: 'lucas-henrique',
                to: 'davi',
                // extra: { extraVote: true }
            },
            {
                from: 'matteus',
                to: 'mc-bin-laden',
                // extra: { extraVote: true }
            },
            {
                from: 'mc-bin-laden',
                to: 'davi',
                // extra: { extraVote: true }
            },
            {
                from: 'raquele',
                to: 'davi',
                // extra: { extraVote: true }
            },
            {
                from: 'alane',
                to: 'raquele',
                extra: { group_vote: true }
            },
            {
                from: 'beatriz',
                to: 'raquele',
                extra: { group_vote: true }
            },
            {
                from: 'davi',
                to: 'raquele',
                extra: { group_vote: true }
            },
            {
                from: 'matteus',
                to: 'raquele',
                extra: { group_vote: true }
            },
            {
                from: 'mc-bin-laden',
                to: 'raquele',
                extra: { group_vote: true }
            },
            {
                from: 'alane',
                to: 'mc-bin-laden',
            },
            {
                from: 'beatriz',
                to: 'mc-bin-laden',
            },
            {
                from: 'davi',
                to: 'mc-bin-laden',
            },
            {
                from: 'fernanda',
                to: 'alane',
            },
            {
                from: 'giovanna-pitel',
                to: 'alane',
            },
            {
                from: 'isabelle',
                to: 'lucas-henrique',
            },
            {
                from: 'leidy-elin',
                to: 'isabelle',
            },
            {
                from: 'lucas-henrique',
                to: 'alane',
            },
            {
                from: 'matteus',
                to: 'mc-bin-laden',
            },
            {
                from: 'mc-bin-laden',
                to: 'alane',
            },
            {
                from: 'raquele',
                to: 'alane',
            },
        ],
    },
    {
        _id: 14,
        resultado: ['davi', 'mc-bin-laden', 'leidy-elin', 'matteus'],
        anjo: [
            {
                from: 'giovanna-pitel',
                to: '',
                autoimune: true,
            },
        ],
        votos: [
            {
                from: 'giovanna',
                to: 'davi',
                extra: { indicacao: true }
            },

            {
                from: 'alane',
                to: 'leidy-elin',
            },
            {
                from: 'beatriz',
                to: 'leidy-elin',
            },
            {
                from: 'davi',
                to: 'leidy-elin',
            },
            {
                from: 'fernanda',
                to: 'matteus',
            },
            {
                from: 'isabelle',
                to: 'mc-bin-laden',
            },
            {
                from: 'leidy-elin',
                to: 'matteus',
            },
            {
                from: 'lucas-henrique',
                to: 'matteus',
            },
            {
                from: 'giovanna-pitel',
                to: 'matteus',
            },
            {
                from: 'matteus',
                to: 'leidy-elin',
            },
            {
                from: 'mc-bin-laden',
                to: 'matteus',
            },

            {
                from: 'leidy-elin',
                to: 'alane',
                extra: { contragolpe: true }
            },
            {
                from: 'matteus',
                to: 'mc-bin-laden',
                extra: { contragolpe: true }
            },
        ],
    },
    {
        _id: 15,
        resultado: ['beatriz', 'fernanda', 'giovanna'],
        anjo: [
            {
                from: 'matteus',
                to: '',
                autoimune: true,
            },
        ],
        votos: [
            {
                from: 'giovanna-pitel',
                to: 'matteus',
                extra: { indicacao: true }
            },

            {
                from: 'alane',
                to: 'fernanda',
            },
            {
                from: 'beatriz',
                to: 'fernanda',
            },
            {
                from: 'davi',
                to: 'fernanda',
            },
            {
                from: 'fernanda',
                to: 'alane',
            },
            {
                from: 'isabelle',
                to: 'fernanda',
            },
            {
                from: 'lucas-henrique',
                to: 'alane',
            },
            {
                from: 'giovanna',
                to: 'alane',
            },
            {
                from: 'matteus',
                to: 'fernanda',
            },
            {
                from: 'mc-bin-laden',
                to: 'alane',
            },
            {
                from: 'alane',
                to: 'giovanna',
                extra: { contragolpe: true }
            },
        ],
    },
    {
        _id: 16,
        resultado: ['alane', 'beatriz', 'giovanna-pitel'],
        anjo: [         
            {       
                from: 'isabelle',
                to: 'isabelle',
                autoimune: false,
            }
        ],
        votos: [
            {
                from: 'alane',
                to: 'giovanna-pitel',
            },
            {
                from: 'beatriz',
                to: 'giovanna-pitel',
            },
            {
                from: 'davi',
                to: 'giovanna-pitel',
            },
            {
                from: 'giovanna',
                to: 'beatriz',
                extra: { indicacao: true }
            },
            {
                from: 'giovanna-pitel',
                to: 'matteus',
            },
            {
                from: 'isabelle',
                to: 'giovanna-pitel',
            },
            {
                from: 'lucas-henrique',
                to: 'matteus',
            },
            {
                from: 'matteus',
                to: 'giovanna-pitel',
            },
            {
                from: 'mc-bin-laden',
                to: 'matteus',
            },
        ],
    },
    {
        _id: 17,
        resultado: ['davi', 'mc-bin-laden'],
        anjo: [],
        votos: [
            {
                from: 'alane',
                to: 'mc-bin-laden',
            },
            {
                from: 'beatriz',
                to: 'mc-bin-laden',
            },
            {
                from: 'davi',
                to: 'mc-bin-laden',
            },
            {
                from: 'giovanna',
                to: 'matteus',
            },
            {
                from: 'isabelle',
                to: 'mc-bin-laden',
            },
            {
                from: 'lucas-henrique',
                to: 'davi',
                extra: { indicacao: true }
            },
            {
                from: 'matteus',
                to: 'mc-bin-laden',
            },
            {
                from: 'mc-bin-laden',
                to: 'matteus',
            },
        ],
    },
    {
        _id: 18,
        resultado: ['giovanna', 'alane', 'davi'],
        anjo: [         
            {       
                from: 'matteus',
                to: '',
                autoimune: true,
            }
        ],
        votos: [
            {
                from: 'alane',
                to: 'beatriz',
                extra: { protecao: true }
            },
            {
                from: 'beatriz',
                to: 'alane',
                extra: { protecao: true }
            },
            {
                from: 'davi',
                to: 'isabelle',
                extra: { protecao: true }
            },
            {
                from: 'giovanna',
                to: 'isabelle',
                extra: { protecao: true }
            },
            {
                from: 'isabelle',
                to: 'davi',
                extra: { protecao: true }
            },
            {
                from: 'lucas-henrique',
                to: 'giovanna',
                extra: { indicacao: true }
            },
            {
                from: 'matteus',
                to: 'beatriz',
                extra: { protecao: true }
            },
        ],
    },
    {
        _id: 19,
        resultado: ['alane', 'lucas-henrique', 'isabelle'],
        anjo: [         
        ],
        votos: [
            {
                from: 'alane',
                to: 'isabelle',
            },
            {
                from: 'beatriz',
                to: 'isabelle',
            },
            {
                from: 'davi',
                to: 'lucas-henrique',
                extra: { indicacao: true }
            },
            {
                from: 'isabelle',
                to: 'matteus',
            },
            {
                from: 'lucas-henrique',
                to: 'matteus',
            },
            {
                from: 'matteus',
                to: 'isabelle',
            },
        ],
    }
];
