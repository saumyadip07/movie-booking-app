//services
import {
  createTheatreService,
  deleteTheatreByIdService,
  getAllTheatresService,
  getTheatreByIdService,
  updateMoviesInTheatreService,
  updateTheatreByIdService,

} from "../services/theatre.service.js";

//utils
import { STATUS_CODES } from "../utils/constants.js";
import {
  errorResponseBody,
  successResponseBody,
} from "../utils/responseBody.js";

//create theatre controller
export const createTheatre = async (req, res) => {
  try {
    const response = await createTheatreService(req.body);

    successResponseBody.data = response;
    successResponseBody.message = "Theatre created successfully";
    return res.status(STATUS_CODES.CREATED).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }

    errorResponseBody.err = error;
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};

//get theatre by id controller
export const getTheatre = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getTheatreByIdService(id);

    successResponseBody.data = response;
    successResponseBody.message = "Theatre fetched successfully";
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};

//get all theatres controller
export const getAllTheatres = async (req, res) => {
  try {
    const response = await getAllTheatresService(req.query);

    successResponseBody.data = response;
    successResponseBody.message = "Theatres fetched successfully";
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};

//update theatre
export const updateTheatre = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await updateTheatreByIdService(id, req.body);

    successResponseBody.data = response;
    successResponseBody.message = "Theatre updated successfully";
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }

    errorResponseBody.err = error;
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};

//delete theatre controller
export const deleteTheatre = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteTheatreByIdService(id);
    successResponseBody.data = response;
    successResponseBody.message = "Theatre deleted successfully";
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};


// update movies in theatre controller
export const updateMoviesInTheatre = async (req, res) => {
  try {
    const { id : theatreId } = req.params;
    const { movieIds, insert } = req.body;
    const response = await updateMoviesInTheatreService(theatreId, movieIds, insert);

    successResponseBody.data = response;
    successResponseBody.message = "Movies updated in theatre successfully";
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};
