import { Case } from '../models/cases.js';
import express from 'express';
export const game = express.Router();

game.post('/create-case', async(req, res) => {
    try{
        const { title, description, location, date, creator, status, solution } = req.body;
    if(!title || !description || !location || 
        !date || !creator || !status || !solution){
        return res.status(401).json({
            message: 'All fields required to make case'
        });
    }

    const docs = new Case({
        title,
        description,
        location,
        date,
        creator,
        status,
        solution
    }); 
    const games = await docs.save();
    return res.status(200).json({
        message: 'Successfully created case..',
        games
    });
}
catch(err){
    return res.status(500).json({
        message: 'oops.. something went wrong',
        error: err
    });
}
});
game.get('/cases', async(req, res) => {
    try{
        const findCase = await Case.find().sort({ createdAt: -1 });
        if(!findCase || findCase.length() === 0){
            return res.status(404).json({
                message: 'oops.. No case found'
            });
        }
        return res.status(200).json({
            findCase
        });
    }
    catch(err){
        return res.status(500).json({
            message: 'oops. something went wrong..',
            err
        });
    }
});


// Find by location here........
game.get('/case-location/:location', async(req, res) => {
    try{
        const loc = req.params.location;
        const locationFind = await Case.find({ location: loc })
        if(!locationFind || locationFind.length === 0){
            return res.status(404).json({
                message: 'No Case found in this location..'
            });
        }
        return res.status(200).json({
            locationFind
        });
    }
    catch(err){
        return res.status(500).json({
            message: 'Oops.. something went wrong',
            error: err
        });
    }
});

//Here you can find Cases by Status ['investigating', 'solved', 'closed']...
game.get('/case-status/:status', async(req, res) => {
    try{
        const stats = req.params.status;
        const caseStatus = await Case.find({ status: stats }).sort({ 
            createdAt: -1
        });
        if(caseStatus.length === 0){
            return res.status(404).json({
                message: 'No case found with this status..'
            });
        }
        return res.status(200).json({
            caseStatus
        });
    }
    catch(err){
        return res.status(500).json({
            message: 'oops.. something went wrong',
            error: err
        });
    }
});

//Here you can find cases by date..
game.get('/case-date/:date', async(req, res) => {
    try{
        const dt = req.params.date;
        const caseDate = await Case.find({ date: dt }) .sort({ 
            createdAt: -1
        });
        if(caseDate.length === 0){
            return res.status(404).json({
                message: 'No Case found on This date..'
            });
        }
        return res.status(200).json({
            caseDate
        });
    }
    catch(err){
        return res.status(500).json({
            message: 'Oops.. something went wrong',
            error: err
        });
    }
});

export default game;