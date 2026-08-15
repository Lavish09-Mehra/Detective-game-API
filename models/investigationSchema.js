import mongoose from 'mongoose';

const investSchema = new mongoose.Schema({
    caseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Case",
        required: true
    },
    detective:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    actions:[{
        notes: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }],
    theories: {
        type: String,
        required: true
    },
    finalAccusation:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Suspect"
    },
    result:{
        type: String,
        required: true
    }
});
export const Investigation = mongoose.model('Investigation', investSchema );