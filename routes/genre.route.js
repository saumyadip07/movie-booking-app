//packages
import express from "express";

//controllers
import {
  createGenre,
  deleteGenre,
  getAllGenres,
  getGenre,
  updateGenre,
} from "../controllers/genre.controller.js";

//middleware
import { validateCreateGenre } from "../middlewares/genre.middleware.js"
import authCheck from "../middlewares/auth.middleware.js";


//Router
const Router = express.Router();

//create genre route
Router.post("/mba/api/v1/genres",  validateCreateGenre, createGenre);

//get single genre route
Router.get("/mba/api/v1/genres/:id", getGenre);

//get all genres route
Router.get("/mba/api/v1/genres",  getAllGenres);

//update genre route
Router.put("/mba/api/v1/genres/:id",  updateGenre);

// delete genre route
Router.delete("/mba/api/v1/genres/:id",  deleteGenre);

export default Router;

