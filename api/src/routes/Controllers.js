const { Videogame, Genre } = require("../db");
const axios = require("axios");

const getApiInfo = async () => {
  const URL =
    "https://api.rawg.io/api/games?key=de9b05280f60476584457a7ff77b8f57";
  const ApiURL = await axios.get(URL);
  const ApiInfo = await ApiURL.data.results.map((el) => {
    return {
      name: el.name,
      released: el.released,
      image: el.background_image,
      rating: el.rating,
      platforms: el.platforms.map((p) => p.name),
    };
  });
  return ApiInfo;
};

const getDbInfo = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllGames = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};

const getSpecificGame = async (id) => {
  const gameById = await getAllGames();
  const game = await gameById.find((el) => el.id === parseInt(id));
  console.log(game);
  if (game) return game;
  else throw "Lo siento pero no se encontro el juego buscado";
};

module.exports = { getApiInfo, getDbInfo, getAllGames, getSpecificGame };
