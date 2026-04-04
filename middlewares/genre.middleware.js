//models
import Genre from "../models/genre.model.js";

//utils
import {badRequestResponseBody} from "../utils/responseBody.js";
import { STATUS_CODES } from "../utils/constants.js";




//-----------------------------------------------------------------------

//create genre validation middleware

export const validateCreateGenre =async(req,res,next)=>{

    const {name}=req.body;

    if(!name){
        badRequestResponseBody.err="Genre name is required"
        return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody)
    }


    next()
}