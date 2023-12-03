import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema({
    id: {
        type: Number,
        required: false,
    },
    name: {
        type: String,
        required: true
    },
    matricula: {
        type: Number,
        required: true
    },
    materia: {
        type: String,
        required: true
    },
    nota: {
        type: Number,
        required: true
    }


}, { versionKey: false });

export default mongoose.model('user', taskSchema);

