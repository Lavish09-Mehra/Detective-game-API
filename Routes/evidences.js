import { Evidance } from '../models/evidenceSchema.js';
import express from 'express';
export const evid = express.Router();

evid.post('/create-evidence/:evidId/caseof', async(req, res) => {
    try{
        const caseId = req.params.evidId;
        const { type, title, description, 
            location, discoveredAt, linkedSuspects, importance
        } = req.body;
        if(!type || !title || !description || !location || !discoveredAt || !linkedSuspects || !importance){
            return res.status(401).json({
                message: 'Fill all the field... to create an evidence'
            });
        }
        const evidCreate = new Evidance({
            caseId, type, title, description, 
            location, discoveredAt, linkedSuspects, importance
        });
        const Evidresults = await evidCreate.save();
        return res.status(200).json({
            Evidresults
        });
    }
    catch(err){
        return res.status(500).json({
            message: 'oops..something went wrong..',
            error: err
        });
    }
});

evid.get('/get-evidence/:caseEvid/caseof', async(req, res) => {
    try{
        const Evidcaseid = req.params.caseEvid;
        const caseEvidence = await Evidance.find({ caseId: Evidcaseid });
        if(caseEvidence.length === 0){
            return res.status(401).json({
                message: 'No Evidence found for this Case..'
            });
        }
        return res.status(200).json({
            caseEvidence
        })
    }
    catch(err){
        return res.status(500).json({
            message: 'Oops..something Went Wrong',
            error: err
        });
    }
});

evid.delete('/evidence/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const deleted = await Evidance.findByIdAndDelete(id);
        if(!deleted){
            return res.status(404).json({
                message: 'No evidence found with this id..'
            });
        }
        return res.status(200).json({
            message: 'Evidence deleted successfully',
            deleted
        });
    }
    catch(err){
        return res.status(500).json({
            message: 'Oops..something Went Wrong',
            error: err
        });
    }
});

export default evid;