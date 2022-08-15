const initialState = {
  videoGames: [],
  videoGameDetail: {},
  videoGameFilter: [],
  genres: [],
  platforms: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAME":
      return {
        ...state,
        videoGames: action.payload,
      };
    case "GET_VIDEOGAME_BY_NAME":
      return {
        ...state,
        videoGames: action.payload,
      };
    case "GET_VIDEOGAME_BY_ID":
      return {
        ...state,
        videoGameDetail: action.payload,
      };
    case "GET_GENRES":
      let genre = action.payload;
      genre.unshift("All");
      return {
        ...state,
        genres: genre,
      };
    case "GET_PLATFORMS":
      return {
        ...state,
        platforms: action.payload,
      };
    case "POST_VIDEOGAME":
      return {
        ...state,
      };
    case "SORT_VIDEOGAME":
      let sortByRating = state.videoGames.sort((a, b) => a.rating - b.rating);
      let sortByAlfabeticNameAsc = state.videoGames.sort(
        (a, b) => a.name - b.name
      );
      let sortByAlfabeticNameDes = state.videoGames.sort(
        (a, b) => a.name + b.name
      );
      if (action.payload === "rating") {
        return {
          ...state,
          videoGames: sortByRating,
        };
      } else {
        return {
          ...state,
          videoGames:
            action.payload === "asc"
              ? sortByAlfabeticNameAsc
              : sortByAlfabeticNameDes,
        };
      }
    default:
      return { ...state };
  }
}
