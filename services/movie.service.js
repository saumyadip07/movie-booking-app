//packages
import mongoose from "mongoose";

//helper
import { attachRating } from "../helper/getRating.js";

//models
import Movie from "../models/movie.model.js";
import Genre from "../models/genre.model.js";

//utils
import { STATUS_CODES } from "../utils/constants.js";






// const escapeRegExp = (value) =>
//   value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// // Accept either Genre ObjectId strings or Genre names, then convert to Genre _id values.
// // const resolveGenresToIds = async (genres) => {
// //   if (!Array.isArray(genres)) return genres;
// //   if (genres.length === 0) return genres;

// //   const nameCache = new Map(); // lowerName -> Promise<ObjectId>

// //   const resolveNameToId = async (name) => {
// //     const existing = await Genre.findOne({
// //       name: { $regex: `^${escapeRegExp(name)}$`, $options: "i" },
// //     });

// //     if (existing) {
// //       if (existing.isDeleted) {
// //         existing.isDeleted = false;
// //         await existing.save();
// //       }
// //       return existing._id;
// //     }

// //     throw {
// //       err: `Genre "${name}" not found`,
// //       code: STATUS_CODES.NOT_FOUND,
// //     };
// //   };

// //   return Promise.all(
// //     genres.map(async (genre) => {
// //       // Already an id
// //       if (typeof genre === "string" && mongoose.Types.ObjectId.isValid(genre)) {
// //         return genre;
// //       }

// //       // Treat as genre name
// //       if (typeof genre === "string") {
// //         const trimmed = genre.trim();
// //         if (!trimmed) {
// //           throw { err: "Genre name cannot be empty", code: STATUS_CODES.BAD_REQUEST };
// //         }
// //         const key = trimmed.toLowerCase();
// //         if (!nameCache.has(key)) {
// //           nameCache.set(key, resolveNameToId(trimmed));
// //         }
// //         return nameCache.get(key);
// //       }

// //       throw {
// //         err: "Invalid genre value. Provide ObjectId strings or genre names.",
// //         code: STATUS_CODES.BAD_REQUEST,
// //       };
// //     }),
// //   );
// // };



//create movie service
export const createMovieService = async (data) => {
  try {

    const {name}=data;

       if (name) {
        //if same name exists then throw error
        const ExistedMovie = await Movie.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
        if (ExistedMovie) {
    
          throw{
            err:"Movie with this name already exists",
            code:STATUS_CODES.BAD_REQUEST
          }
        }
      }

    const newData = await attachRating(data);
    // if (newData.genre) {
    //   newData.genre = await resolveGenresToIds(newData.genre);
    // }

    const movie = await Movie.create(newData);
    return movie;
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

//get movie by id service

export const getMovieByIdService = async (id) => {
  const movie = await Movie.findById(id).populate("genre", "name").select("-__v -createdAt -updatedAt");
  movie.genre = movie.genre.map((genre) => {
    return genre._id;
   
  });
  
   
  if (!movie) {
    throw {
      err: "Movie with this id not found",
      code: STATUS_CODES.NOT_FOUND,
    };
  }
  return movie;
};


//get All movies

export const getAllMoviesService= async(filter)=>{
  let query = {}
  let sortOptions = {}  

  if(filter.search){
    query.name={$regex:filter.search,$options:"i"}
  }

  if(filter.sortByReleaseDate && (filter.sortByReleaseDate ==='1' || filter.sortByReleaseDate ==='-1')){
    sortOptions.releaseDate = Number(filter.sortByReleaseDate)
  }

  const response=await Movie.find(query).sort(sortOptions).populate("genre","name").select("-__v -createdAt -updatedAt -description -trailerUrl -casts -director ")
  if(!response){
    throw{
      err:"Not able to find queries movie",
      code:STATUS_CODES.NOT_FOUND
    }
  }

  return response


}



//update movie by id service

export const updateMovieByIdService = async (id, data) => {
  try {

     const {name}=data
    

     const existedMovie=await Movie.findOne({
      name:{ $regex: `^${name}$`, $options: "i" },
      _id:{$ne:id}
     })

     if(existedMovie){
      throw{
        err:"Movie with the same name already existed",
        code:STATUS_CODES.BAD_REQUEST
      }
     }
  
  
    const response = await Movie.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      throw {
        err: "Movie with this id not found",
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

//delete movie by id service
export const deleteMovieByIdService = async (id) => {
  try {
    const response = await Movie.findByIdAndDelete(id);
    if (response.deletedCount === 0) {
      throw {
        err: "Movie with this id not found",
        code: STATUS_CODES.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    throw error;
  }
};


