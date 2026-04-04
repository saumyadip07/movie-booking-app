//models
import Theatre from "../models/theatre.model.js";

//utils
import { STATUS_CODES } from "../utils/constants.js";

//create theatre service
export const createTheatreService = async (data) => {
  try {
     const {name}=data;
     if (name) {
        //if same name exists then throw error
        const existedTheatre = await Theatre.findOne({
          name: { $regex: `^${name}$`, $options: "i" },
        });
        if (existedTheatre) {
      
          throw {
            err:"Theatre with this name already exists",
            code:STATUS_CODES.BAD_REQUEST
          }
          
        }
      }
    const response = await Theatre.create(data);
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw {
        err,
        code: STATUS_CODES.UNPROCESSABLE_ENTITY,
      };
    } else {
      throw error;
    }
  }
};

//get theatre by id service
export const getTheatreByIdService = async (id) => {
  const response = await Theatre.findById(id);
  if (!response) {
    throw {
      err: "Theatre not found",
      code: STATUS_CODES.NOT_FOUND,
    };
  }
  return response;
};

//get all theatres service
export const getAllTheatresService = async (data) => {
  
    let query = {};
    let pagination = {};
    if (data && data.city) {
      query.city = { $regex: new RegExp(data.city, "i") };
    }
    if (data && data.pinCode) {
      query.pinCode = new RegExp(`^${data.pinCode.trim()}$`);
    }
    if (data && data.movieId) {
      query.movies = data.movieId; 
    }
    if (data && data.limit) {
      pagination.limit = parseInt(data.limit);
    }
    if (data && data.skip) {
      let perPage = pagination.limit ? pagination.limit : 4;
      pagination.skip = parseInt(data.skip) * perPage;
    }
    const response = await Theatre.find(query, {}, pagination);
    if(!response){
    throw{
      err:"Not able to find queries theatres",
      code:STATUS_CODES.NOT_FOUND
    }
  }
    return response;
   
};

//update theatre service
export const updateTheatreByIdService = async (id, data) => {
  try {

    const {name}=data
    const existedThreatre=await Theatre.findOne({
      name:{ $regex: `^${name}$`, $options: "i" },
      _id:{$ne:id}
    })
    if(existedThreatre){
      throw{
        err:"Threatre with the same name already existed",
        code:STATUS_CODES.BAD_REQUEST
      }
    }
    const response = await Theatre.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      throw {
        err: "Theatre not found",
        code: STATUS_CODES.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw {
        err,
        code: STATUS_CODES.UNPROCESSABLE_ENTITY,
      };
    } else {
      throw error;
    }
  }
};

//delete theatre service
export const deleteTheatreByIdService = async (id) => {
  try {
    const response = await Theatre.findByIdAndDelete(id);
    if (!response) {
      throw {
        err: "Theatre not found",
        code: STATUS_CODES.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    throw error;
  }
};


// update movies in theatre service
//insert = true means add movies and insert = false means remove movies
export const updateMoviesInTheatreService = async (
  theatreId,
  movieIds,
  insert,
) => {
  
   try {
     let theatre;
     if (insert) {
       theatre = await Theatre.findByIdAndUpdate(
         {
            _id: theatreId,
         },
         { $addToSet: { movies: { $each: movieIds } } },
         {
           new: true,
         }
       );
     } else {
       theatre = await Theatre.findByIdAndUpdate(
         {
            _id: theatreId,
         },
         { $pull: { movies: { $in: movieIds } } },
          {
           new: true,
         }
       );
      }
       
     return theatre;
     
   } catch (error) {
    if(error.name === "TypeError"){
      throw {
        err: "Theatre not found",
        code: STATUS_CODES.NOT_FOUND,
      };
    }
     throw error;
   }
};
 