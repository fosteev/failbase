import {Schema, model} from 'mongoose';
const schema = new Schema({
    head: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    additional_json: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    url: {
        type: String
    },
    code: {
        type: Number
    }
});

export default model('Message', schema);