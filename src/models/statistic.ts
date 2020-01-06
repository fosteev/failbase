import {Schema, model} from 'mongoose';
const schema = new Schema({
    snapshot: {
      type: Object,
      required: true
    },
    date: {
        type: Date,
        required: true
    }
});

export default model('Statistic', schema);