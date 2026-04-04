//packages
import express from "express";

//import controllers
import { createMovie, deleteMovie, getMovie, updateMovie,getAllMovies } from "../controllers/movie.controller.js";

//middlewares
import { validateCreateMovie } from "../middlewares/movie.middleware.js";

//router
const Router= express.Router();

//create movie route
Router.post("/mba/api/v1/movies", validateCreateMovie, createMovie);

//delete movie route
Router.delete("/mba/api/v1/movies/:id",deleteMovie)

//get single movie
Router.get("/mba/api/v1/movies/:id", getMovie)

//update movie route
Router.put("/mba/api/v1/movies/:id", updateMovie)

//get all movies or search by name
Router.get("/mba/api/v1/movies",getAllMovies)

export default Router;