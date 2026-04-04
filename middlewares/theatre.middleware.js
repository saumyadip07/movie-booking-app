//models
import Theatre from "../models/theatre.model.js";

//utils
import { badRequestResponseBody } from "../utils/responseBody.js";
import { STATUS_CODES } from "../utils/constants.js";

// validate create theatre middleware

export const validateCreateTheatre = async (req, res, next) => {
  const { name, description, owner, city, pinCode, address, seats, movies } =
    req.body;

  if (!name) {
    badRequestResponseBody.err = "Theatre Name is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

 

  if (!description) {
    badRequestResponseBody.err = "Theatre Description is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

  if (!city) {
    badRequestResponseBody.err = "City is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

  if (!pinCode) {
    badRequestResponseBody.err = "PinCode is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

  if (!address) {
    badRequestResponseBody.err = "Address is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

  if (!seats) {
    badRequestResponseBody.err = "Seats is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

  if (!movies || movies instanceof Array === false || movies.length === 0) {
    badRequestResponseBody.err = "At least one movie is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

  next();
};




//validation for update movies in theatre 
export const validateUpdateMoviesInTheatre = async (req, res, next) => {
  if (
    !req.body.movieIds ||
    req.body.movieIds instanceof Array === false ||
    req.body.movieIds.length === 0
  ) {
    badRequestResponseBody.err = "At least one movie id is required";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

  if (req.body.insert === undefined) {
    badRequestResponseBody.err = "Insert field is required to be boolean value";
    return res.status(STATUS_CODES.BAD_REQUEST).json(badRequestResponseBody);
  }

  next();
};
