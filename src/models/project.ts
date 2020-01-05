import {Schema, model} from 'mongoose';
const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

export default model('Project', schema);