//models
import Movie from "../models/movie.model.js";

//services
import {
  createMovieService,
  getMovieByIdService,
  deleteMovieByIdService,
  updateMovieByIdService,
  getAllMoviesService,
} from "../services/movie.service.js";

//utils
import { STATUS_CODES } from "../utils/constants.js";
import {
  errorResponseBody,
  successResponseBody,
} from "../utils/responseBody.js";




//create movie controller
export const createMovie = async (req, res) => {
  try {
    const response = await createMovieService(req.body);
    successResponseBody.data = response;
    successResponseBody.message = "Movie created successfully";
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

//delete movie controller
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteMovieByIdService(id);

    successResponseBody.data = response;
    successResponseBody.message = "Movie Deleted successfully";
    return res.status(STATUS_CODES.OK).json(successResponseBody);

    // return res.status(200).json({
    //     success:true,
    //     error:{},
    //     data:response,
    //     message:"Movie Deleted successfully"
    // })
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }

    // return res.status(500).json({
    //     success:false,
    //     error:error,
    //     data:{},
    //     message:"Something went wrong while deleting the movie"
    // })
    errorResponseBody.err = error;
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};

//get single movie controller

export const getMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await getMovieByIdService(id);

    // return res.status(200).json({
    //   success: true,
    //   error: {},
    //   data: response,
    //   message: "Suceessfully movie details fetched",
    // });

    successResponseBody.data = response;
    successResponseBody.message = "Suceessfully movie details fetched";
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }

    // return res.status(500).json({
    //     success:false,
    //     error:err,
    //     data:{},
    //     message:"Something went wrong while fetching the movie details"
    // })
    errorResponseBody.err = error;
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(errorResponseBody);
  }
};

//get all movies or search by name
export const getAllMovies = async (req, res) => {
  try {
    const movies = await getAllMoviesService(req.query);

    successResponseBody.data = movies;
    successResponseBody.message = "All movies are fetched successfully";
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

//update movie controller

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await updateMovieByIdService(id, req.body);

    successResponseBody.data = response;
    successResponseBody.message = "Movie details updated successfully";
    return res.status(STATUS_CODES.OK).json(successResponseBody);
  } catch (error) {
    // console.log("error in controller", error);
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


