//packages
import express from 'express';


//controllers
import { createTheatre, getAllTheatres, getTheatre, deleteTheatre, updateTheatre, updateMoviesInTheatre } from '../controllers/theatre.controller.js';

//middlewares
import { validateCreateTheatre, validateUpdateMoviesInTheatre } from '../middlewares/theatre.middleware.js';
import authCheck from '../middlewares/auth.middleware.js';

const Router = express.Router();

//create theatre route
Router.post("/mba/api/v1/theatres", authCheck,
  validateCreateTheatre,
  createTheatre
);

//get theatre by id route
Router.get("/mba/api/v1/theatres/:id", getTheatre);

//get all theatres route
Router.get("/mba/api/v1/theatres", getAllTheatres);

//update theatre route
Router.put("/mba/api/v1/theatres/:id",  updateTheatre);

//delete theatre route
Router.delete("/mba/api/v1/theatres/:id",  deleteTheatre);


//add or delete movies in theatre
Router.put("/mba/api/v1/theatres/:id/movies",

  validateUpdateMoviesInTheatre,
  updateMoviesInTheatre
);



export default Router;