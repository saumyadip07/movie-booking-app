import axios from "axios";

// It helps to add the imdb rating with the movie
export const attachRating = async (body) => {
  if (!body || !body.name) {
    throw {
      err: "Movie name is required to fetch the rating",
      code: 400,
    };
  }
  const ratingApiUrl = process.env.GET_RATING_API;
  const apiKey = process.env.GET_RATING_API_KEY;
  if (!ratingApiUrl) {
    throw {
      err: "GET_RATING_API is not configured (check .env and server startup order)",
      code: 500,
    };
  }
  const movieName = body.name;
  const response = await axios.get(ratingApiUrl, {
    params: {
      t: movieName,
      apikey: apiKey,
    },
  });

  const data = response.data;
  body.poster = data.Poster && data.Poster !== "N/A" ? data.Poster : body.poster;

  const rating = data.imdbRating ? data.imdbRating === "N/A" ? 0 : parseFloat(data.imdbRating) : 0;
  return {
    ...body,
    rating: rating,
  };
};
