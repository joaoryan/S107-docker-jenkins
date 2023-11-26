import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema({
    id: {
        type: number,
        required: false,
    },
    name : {
        type: String,
        required: true
    },
    matricula : {
        type: number,
        required: true
    },
    materia : {
        type: String,
        required: true
    },
    nota : {
        type: number,
        required: true
    }
    
    
},{versionKey: false});

export default mongoose.model('Task', taskSchema);

