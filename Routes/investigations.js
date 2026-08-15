import { Investigation } from '../models/investigationSchema.js';
import express from 'express';
export const invest = express.Router();

invest.post('/investigation/:investCaseId/caseof', async(req, res) => {
    try {
        const caseId = req.params.investCaseId;

        const {
            detective,
            actions,
            theories,
            finalAccusation,
            result
        } = req.body;

        const investigation = new Investigation({
            caseId,
            detective,
            actions,
            theories,
            finalAccusation,
            result
        });

        await investigation.save();

        return res.status(201).json({
            message: "Investigation created successfully",
            investigation
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "Oops... something went wrong",
            error: err
        });
    }
});

invest.get('/detective/:caseId/case', async(req, res) => {
    try{
        const caseId = req.params.caseId;
        const investigation = await Investigation.findOne({ caseId }).populate('caseId');
        if(!investigation){
            return res.status(404).json({
                message: 'No investigation found for this Case..'
            });
        }
        return res.status(200).json({
            detective: investigation.detective,
            investigation
        });
    }
    catch(err){
        return res.status(500).json({
            message: 'oops.. something went wrong',
            error: err
        });
    }
});

invest.get('/investigation/:investId/report', async(req, res) => {
    try{
        const investId = req.params.investId;
        const report = await Investigation.findById(investId)
            .populate('caseId')
            .populate('finalAccusation');
        if(!report){
            return res.status(404).json({
                message: 'No investigation report found..'
            });
        }
        return res.status(200).json({
            report
        });
    }
    catch(err){
        return res.status(500).json({
            message: 'oops.. something went wrong',
            error: err
        });
    }
});

invest.delete('/investigation/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const deleted = await Investigation.findByIdAndDelete(id);
        if(!deleted){
            return res.status(404).json({
                message: 'No investigation found with this id..'
            });
        }
        return res.status(200).json({
            message: 'Investigation deleted successfully',
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

export default invest;
