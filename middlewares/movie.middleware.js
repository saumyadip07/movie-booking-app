//packages
import mongoose from "mongoose";

//models
import Movie from "../models/movie.model.js";


//utils
import {badRequestResponseBody} from "../utils/responseBody.js";
import { STATUS_CODES } from "../utils/constants.js";



export const validateCreateMovie = async (req, res, next) => {
  const {
    name,
    description,
    casts,
    trailerUrl,
    language,
    releaseDate,
    genre,
    duration,
    rating,
    director,
    releaseStatus,
    poster,
  } = req.body;

  if (!name) {
    badRequestResponseBody.err = "Movie Name is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

 

  if (!description) {
    badRequestResponseBody.err = "Movie Description is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

  if (!casts || casts instanceof Array === false || casts.length === 0) {
    badRequestResponseBody.err = "At least one cast is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

  if (!trailerUrl) {
    badRequestResponseBody.err = "Trailer URL is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

  if (!language) {
    badRequestResponseBody.err = "Language is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

  if (!releaseDate) {
    badRequestResponseBody.err = "Release Date is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

 if (![genre].flat().every(id => id && mongoose.Types.ObjectId.isValid(id))) {
    badRequestResponseBody.err = "Genre must be a valid ObjectId or an array of valid ObjectIds";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
}

  if (!duration) {
    badRequestResponseBody.err = "Duration is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

  if (!director) {
    badRequestResponseBody.err = "Director is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

  if (!releaseStatus) {
    badRequestResponseBody.err = "Release Status is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

  if (!poster) {
    badRequestResponseBody.err = "Poster URL is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

  next();
};
