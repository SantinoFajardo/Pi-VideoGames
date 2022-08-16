import axios from "axios";

export function getVideogames() {
  return async function (dispatch) {
    var call = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_VIDEOGAME",
      payload: call.data,
    });
  };
}
export function getVideogamesByName(name) {
  return async function (dispatch) {
    try {
      let call = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: "GET_VIDEOGAME_BY_NAME",
        payload: call.data,
      });
    } catch (error) {
      console.log(`Error en  la action GET_VIDEOGAME_BY_NAME`, error);
    }
  };
}

export function getVideogameById(id) {
  return async function (dispatch) {
    try {
      let call = await axios.get(`http://localhost:3001/videogames/${id}`);
      return dispatch({
        type: "GET_VIDEOGAME_BY_ID",
        payload: call.data,
      });
    } catch (error) {
      console.log(`Error en la action GET_VIDEOGAME_BY_ID`, error);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      let call = await axios.get("http://localhost:3001/genres");
      return dispatch({
        type: "GET_GENRES",
        payload: call.data,
      });
    } catch (error) {
      console.log("Error en la action GET_GENRES", error);
    }
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    try {
      let call = await axios.get("http://localhost:3001/platforms");
      return dispatch({
        type: "GET_PLATFORMS",
        payload: call.data,
      });
    } catch (error) {
      console.log("Error en la action GET_PLATFORMS", error);
    }
  };
}

export function postVideoGame(payload) {
  return async function (dispatch) {
    try {
      let call = await axios.post("http://localhost:3001/videogames", payload);
      return call;
    } catch (error) {
      console.log("Error en la action POST_VIDEOGAME", error);
    }
  };
}

export function filterGamesByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function filterGamesByCreated(payload) {
  return {
    type: "FILTER_BY_CREATED",
    payload,
  };
}

export function sortByName(payload) {
  return {
    type: "SORT_BY_NAME",
    payload,
  };
}

export function sortByRating(payload) {
  return {
    type: "SORT_BY_RATING",
    payload,
  };
}
