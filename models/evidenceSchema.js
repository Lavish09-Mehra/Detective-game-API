import mongoose from 'mongoose';

const evidenceModel = new mongoose.Schema({
    caseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
        required: true
    },
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    discoveredAt: {
        type: Date,
        required: true
    },
    linkedSuspects: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Suspect',
        required: true
    },
    importance: {
        type: String,
        enum: ['low', 'high'],
        required: true
    }
});
export const Evidance = mongoose.model('Evidence', evidenceModel )