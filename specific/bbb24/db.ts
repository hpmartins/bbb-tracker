import 'dotenv/config';
import mongoose from 'mongoose';
import { IParedao, IParticipante } from './defaults';

const paredaoSchema = new mongoose.Schema({
    _id: Number,
    resultado: [String],
    anjo: [
        {
            from: String,
            to: String,
            autoimune: Boolean
        }
    ],
    votos: [
        {
            from: String,
            to: String,
            extra: Object
        }
    ]
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
