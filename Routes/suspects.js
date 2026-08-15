import { Suspect } from '../models/suspectSchema.js';
import express from 'express';
export const susp = express.Router();

susp.post('/suspects/:id/caseof', async(req, res) => {
    try{
        const caseId = req.params.id;
        const { name, age, occupation,
            motive, behavior, suspicionScore
        } = req.body;
        if(!caseId || !name || !age || !occupation || !motive || !behavior || !suspicionScore){
            return res.status(401).json({
                message: 'Fill all info.. of the suspect'
            });
        }
        const suspectCreate = new Suspect({
            caseId, name, age, occupation,
            motive, behavior, suspicionScore
        });
        const Susresult = await suspectCreate.save();
        return res.status(200).json({
            message: 'Successfully created a suspect..',
            Susresult
        });
    }
    catch(err){
        return res.status(500).json({
            message: 'Oops... something went wrong',
            error: err
        })
    }
});

susp.get('/case/:id/suspects', async(req, res) => {
    try{
        const sus = req.params.id;
        const suspectView = await Suspect.find({ caseId: sus });
        if(suspectView.length === 0){
            return res.status(404).json({
                message: 'No Suspect found for this Case..'
            });
        }
        return res.status(200).json({
            suspectView
        });
    }
    catch(err){
        return res.status(500).json({
            message: 'oops.. something went wrong..',
            error: err
        });
    }
});

susp.delete('/suspect/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const deleted = await Suspect.findByIdAndDelete(id);
        if(!deleted){
            return res.status(404).json({
                message: 'No suspect found with this id..'
            });
        }
        return res.status(200).json({
            message: 'Suspect deleted successfully',
            deleted
        });
    }
    catch(err){
        return res.status(500).json({
            message: 'oops.. something went wrong',
            error: err
        });
    }
});

export default susp;