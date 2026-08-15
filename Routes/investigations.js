import { Investigation } from '../models/investigationSchema.js';
import express from 'express';
const invest = express.Router();

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


//Make it for to find the detective via Case ID 
invest.get('/detective/:caseId/case', async(req, res) => {
     
});

//Here make to get the report of investigation..
invest.get('/investiogation/:investId/report', async(req, res) => {

});

export default invest;