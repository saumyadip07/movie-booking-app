//utils
import { STATUS_CODES } from "../utils/constants.js";
import {
  errorResponseBody,
  successResponseBody,
} from "../utils/responseBody.js";

//services
import {
  createGenreService,
  deleteGenreByIdService,
  getAllGenresService,
  getGenreByIdService,
  updateGenreByIdService,
} from "../services/genre.service.js";

//create genre controller
export const createGenre = async (req, res) => {


  try {

    const { name } = req.body;
   
    const response = await createGenreService(name);

    successResponseBody.data = response;
    successResponseBody.message = "Genre created successfully";
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

//get genre controller
export const getGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getGenreByIdService(id);

    successResponseBody.data = response;
    successResponseBody.message = "Genre fetched successfully";
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

//get all genres controller
export const getAllGenres = async (req, res) => {
  try {
    const response = await getAllGenresService(req.query);

    successResponseBody.data = response;
    successResponseBody.message = "All genres fetched successfully";
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

//update genre controller
export const updateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const {name}=req.body
    const response = await updateGenreByIdService(id, name);

    successResponseBody.data = response;
    successResponseBody.message = "Genre updated successfully";
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

// delete genre controller
export const deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteGenreByIdService(id);

    successResponseBody.data = response;
    successResponseBody.message = "Genre deleted successfully";
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

