const initialState = {
  videoGames: [],
  videoGamesFilter: [],
  videoGameDetail: {},
  genres: [],
  platforms: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEOGAME":
      return {
        ...state,
        videoGames: action.payload,
        videoGamesFilter: action.payload,
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
      return {
        ...state,
        genres: action.payload,
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
    case "FILTER_BY_GENRE":
      const allVideoGames = state.videoGamesFilter;
      const genreFilter =
        action.payload === "All"
          ? allVideoGames
          : allVideoGames.filter((Vg) => Vg.genres.includes(action.payload));
      return {
        ...state,
        videoGames: genreFilter,
      };
    case "FILTER_BY_CREATED":
      const createdFilter =
        action.payload === "API"
          ? state.videoGamesFilter.filter((a) => !a.createInDb)
          : state.videoGamesFilter.filter((a) => a.createInDb === true);
      return {
        ...state,
        videoGames:
          action.payload === "All" ? state.videoGamesFilter : createdFilter,
      };
    case "SORT_BY_NAME":
      let sortByName =
        action.payload === "asc"
          ? state.videoGames.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videoGames.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        videoGames: sortByName,
      };
    case "SORT_BY_RATING":
      let sortByRating =
        action.payload === "bestr"
          ? state.videoGames.sort((a, b) => a.rating - b.rating)
          : state.videoGames.sort((a, b) => b.rating - a.rating);
      return {
        ...state,
        videoGames: sortByRating,
      };
    case "DELETE_GAME":
      return { ...state };
    case "DELETE_GAME_2":
      return {
        ...state,
        videoGames: state.videoGames.filter((v) => v.id !== action.payload),
      };
    default:
      return { ...state };
  }
}
