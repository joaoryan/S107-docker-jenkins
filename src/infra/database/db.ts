import mongoose from 'mongoose';

async function connectionDatabase(): Promise<void> {
    mongoose.connect('mongodb://localhost:27017/test')
        .then(() => console.log('Connected on database!'));
}

export default connectionDatabase;