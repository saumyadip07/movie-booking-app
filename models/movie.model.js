import mongoose from "mongoose";

/**
 * Define the schema of the movie resource to be stored in the db
 */
const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
    },
    description: {
      type: String,
      required: true,
      minLength: 5,
    },
    casts: {
      type: [String],
      required: true,
    },
    trailerUrl: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
      default: "English",
    },
    releaseDate: {
      type: String,
      required: true,
    },
    genre: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Genre",
        },
      ],
      required: true,
    },
    rated: {
      type: String,
      enum: ["G", "PG", "PG-13", "R", "NC-17"],
      default: "G",
    },
    rating: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    releaseStatus: {
      type: String,
      enum: ["Archived", "Released", "Prebooking", "Upcoming"],
      default: "Released",
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    posterAlt: {
      type: String,
      default: null,
    },
  },

  { timestamps: true },
);

const Movie = mongoose.model("Movie", movieSchema); // creates a new model

export default Movie;
