//models
import Genre from "../models/genre.model.js";
import Movie from "../models/movie.model.js";

//utils
import { STATUS_CODES } from "../utils/constants.js";




//----------------------------------------------------------------------------


// create genre service

export const createGenreService=async(name)=>{
  try {
    name = name.toLowerCase().trim()
    

    const existedGenre= await Genre.findOne({name:name})

    if(existedGenre){
      throw{
        err:"Genre with the same name already exists",
        code:STATUS_CODES.BAD_REQUEST
      }
    }

    const genre= await Genre.create({name:name})

    return genre
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
}




// update genre service 
export const updateGenreByIdService=async(id,name)=>{
  try {
    name=name.toLowerCase().trim()
    const existedGenre =await Genre.findOne({
      name:name,
      _id:{$ne:id}
    })
    if(existedGenre){
      throw{
        err:"Genre existed with the same name already",
        code:STATUS_CODES.BAD_REQUEST
      }
    }

    const response= await Genre.findByIdAndUpdate(id,name,{
      new:true,
      runValidators:true
    })

    if(!response){
      throw{
        err:"Genre not found",
        code:STATUS_CODES.NOT_FOUND
      }
    }

    return response
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
}


// get genre by id service
export const getGenreByIdService = async (id) => {
  
    const genre = await Genre.findById(id);
    if (!genre) {
      throw {
        err: "Genre with this id not found",
        code: STATUS_CODES.NOT_FOUND,
      };
    }
    return genre;
    
};

// get all genres service
export const getAllGenresService = async (query) => {
  try {
    const response=await Genre.find();
    if(response.length==0){
      return []
    }
    return response
  } catch (error) {
    throw error
  }
};

// delete genre service (soft delete)
// It will not allow deletion if the genre is referenced by any movie.
export const deleteGenreByIdService = async (id) => {
  try {
    const genre = await Genre.findById(id);

    if (!genre) {
      throw {
        err: "Genre with this id not found",
        code: STATUS_CODES.NOT_FOUND,
      };
    }

    const isAttached = await Movie.exists({ genre: id });
    if (isAttached) {
      throw {
        err: "Cannot delete genre because it is attached to one or more movies",
        code: STATUS_CODES.BAD_REQUEST,
      };
    }

    const deletedGenre =await Genre.findByIdAndDelete(id)

    return deletedGenre;
  } catch (error) {
    
    throw error;
  }
};


