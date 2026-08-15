import { Detective } from '../models/users.js';
import express from 'express';

export const route = express.Router();

route.post('/login', async(req, res) => {
    try{
        const { username, email, caseSolved, score } = req.body;
        const user = new Detective({
            username,
            email,
            caseSolved,
            score
        });
        if(!username || !email || !caseSolved || !score){
            return res.status(401).json({
                message: 'You have to fill all the field..'
            });
        }
        const result = await user.save();
        return res.status(200).json({
            message : 'Successfully LoggedIN',
            result
        });
    }
    catch(err){
        res.status(500).json({
            message: 'Oops something went wrong..',
            error: err
        });
    }
});
route.get('/detectives', async(req, res) => {
    try{
        const profile = await Detective.find();
        if(!profile){
            res.status(404).json({
                message: 'No Users found..'
            })
        }
        return res.status(200).json({
            profile
        });
    }
    catch(err){
        return res.status(500).json({
            message: 'oops.. something went wrong',
            err
        })
    }
})
export default route;