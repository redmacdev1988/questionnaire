import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js'

const RESPONSE_SUCCESS = 'success';
const RESPONSE_DATA_MISSING = 'There is missing data';

/** get all questions */
export async function getQuestions(req, res){
    try {
        const q = await Questions.find();
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}

/** insert all questinos */
export async function insertQuestions(req, res){
    try {
        Questions.insertMany({ questions, answers }, function(err, data){
            res.json({ msg: "Data Saved Successfully...!"})
        })
    } catch (error) {
        res.json({ error })
    }
}

/** Delete all Questions */
export async function dropQuestions(req, res){
   try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!"});
   } catch (error) {
        res.json({ error })
   }
}

export async function userExist(req, res) {
    try {
        const { wechatUsername, mobile} = req.query;
        const r = await Results.find({$or:[{wechatUsername: wechatUsername},{mobile: mobile}]});
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

/** get all result */
export async function getResult(req, res){
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

/** post all result */
export async function storeResult(req, res){
   try {
        const { wechatUsername, mobile, result} = req.body;
        if(!wechatUsername && !result) {
            throw new Error(RESPONSE_DATA_MISSING);
        }
        Results.create({ wechatUsername, mobile, result }, function(err, data) {
            res.json({ msg : RESPONSE_SUCCESS});
        })

   } catch (error) {
        res.json({error});
   }
}

/** delete all result */
export async function dropResult(req, res){
    try {
        await Results.deleteMany();
        res.json({ msg : "Result Deleted Successfully...!"})
    } catch (error) {
        res.json({ error })
    }
}