import 'dotenv/config';
import mongoose from 'mongoose';

// Define the Participant interface
export interface IParticipante {
    _id: {
        nome: string;
        modified: Date;
    };
    abandono: boolean;
    aniversario: string;
    anjo: boolean;
    desclassificado: boolean;
    eliminado: boolean;
    estalecas: number;
    facebook: string | null;
    grupo: string;
    idade: number;
    imagem: string;
    imune: boolean;
    instagram: string | null;
    lider: boolean;
    membro: string;
    monstro: boolean;
    nomeCompleto: string;
    nomePopular: string;
    ondeMora: string;
    paredao: boolean;
    profissao: string;
    statusPrioritario: string[];
    statusPrioritarioSlugified: string[];
    twitter: string | null;
    url: string;
    xAnjo: number;
    xImune: number;
    xLider: number;
    xMonstro: number;
    xParedao: number;
    xVip: number;
    xXepa: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IParedao {
    _id: number;
    votos: {
        from: string;
        to: string | null;
        extra?: {
            veto?: boolean;
            group_vote?: boolean;
            minerva?: boolean;
            contragolpe?: boolean;
            indicacao?: boolean;
        };
    }[];
}

const paredaoSchema = new mongoose.Schema({
    _id: Number,
    votos: [{
        from: String,
        to: String,
        extra: Object
    }]
});

const participanteSchema = new mongoose.Schema(
    {
        _id: {
            nome: String,
            modified: Date
        },
        abandono: Boolean,
        aniversario: String,
        anjo: Boolean,
        desclassificado: Boolean,
        eliminado: Boolean,
        estalecas: Number,
        facebook: String,
        grupo: String,
        idade: Number,
        imagem: String,
        imune: Boolean,
        instagram: String,
        lider: Boolean,
        membro: String,
        monstro: Boolean,
        nomeCompleto: String,
        nomePopular: String,
        ondeMora: String,
        paredao: Boolean,
        profissao: String,
        statusPrioritario: [String],
        statusPrioritarioSlugified: [String],
        twitter: String,
        url: String,
        xAnjo: Number,
        xImune: Number,
        xLider: Number,
        xMonstro: Number,
        xParedao: Number,
        xVip: Number,
        xXepa: Number
    },
    { timestamps: true }
);

// Create the Mongoose model for Participant
export const Participante = mongoose.model<IParticipante>('Participante', participanteSchema);
export const Paredao = mongoose.model<IParedao>('Paredoes', paredaoSchema, 'paredoes');

// Connect to the MongoDB database
mongoose
    .connect(process.env.MONGODB_URI ?? '')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
