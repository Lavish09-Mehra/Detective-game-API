import mongoose from 'mongoose';

const suspectModel = new mongoose.Schema({
    caseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    motive: {
        type: String,
        required: true
    },
    behavior: {
        type: String,
        required: true
    },
    suspicionScore: {
        type: Number,
        required: true
    }
});
export const Suspect = mongoose.model('Suspect', suspectModel );