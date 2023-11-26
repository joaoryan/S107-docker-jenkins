import mongoose from 'mongoose';

async function connectionDatabase(){
    mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Connected on database!'));
    }
export default connectionDatabase;