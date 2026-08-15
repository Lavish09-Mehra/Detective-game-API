import mongoose from 'mongoose';

const casesSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    location: {
        type: String,
        required: true,
        trim: true
    },

    date: {
        type: Date,
        required: true
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    status: {
        type: String,
        enum: ['investigating', 'solved', 'closed'],
        default: 'investigating'
    },

    solution: {
        killer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Suspect',
            required: true
        },

        motive: {
            type: String,
            required: true
        },

        weapon: {
            type: String,
            required: true
        }
    }

}, { timestamps: true });

export const Case = mongoose.model('Case', casesSchema);