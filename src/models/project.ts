import {Schema, model} from 'mongoose';
const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 1
    },
    date: {
        type: Date,
        required: true
    }
});

export default model('Project', schema);