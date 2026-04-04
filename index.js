// Load .env before any app modules read process.env at import time
import "dotenv/config";

//packages
import express from "express";
import morgan from "morgan";
import cors from "cors";

//config
import connectDB from "./config/db_config.js";

//app
const app = express();

connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//centralized logging
app.use(morgan("dev"));

//import routes
import movieRoute from "./routes/movie.route.js";
import theatreRoute from "./routes/theatre.route.js";
import genreRoute from "./routes/genre.route.js";

//use routes
app.use(movieRoute);
app.use(theatreRoute);
app.use(genreRoute);

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    error: {},
    data: {},
    message: "Welcome to Movie Booking App",
  });
});
//route not found middleware
app.use((req, res, next) => {
  return res.status(404).json({
    success: false,
    error: "Route not found",
    data: {},
    message: "The route you are trying to access does not exist",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
