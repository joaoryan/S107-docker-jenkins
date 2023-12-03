import mongoose from 'mongoose';

async function connectionDatabase(): Promise<void> {
    mongoose.connect('mongodb://root:root@localhost:27017/?authMechanism=DEFAULT')
        .then(() => console.log('Connected on database!'));
}

export default connectionDatabase;