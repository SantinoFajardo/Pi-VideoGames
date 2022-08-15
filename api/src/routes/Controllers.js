const { Videogame, Genre, apikey } = require("../db");
const axios = require("axios");

const getApiInfo = async () => {
  const URL = `https://api.rawg.io/api/games?key=${apikey}`;
  const ApiURL = await axios.get(URL);
  const ApiInfo = await ApiURL.data.results.map((el) => {
    return {
      id: el.id,
      name: el.name,
      released: el.released,
      image: el.background_image,
      rating: el.rating,
      platforms: el.platforms.map((p) => p.platform.name),
      genres: el.genres.map((g) => g.name),
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
  if (!isNaN(id)) {
    var idkey = parseInt(id);
    const result = await axios.get(
      `https://api.rawg.io/api/games/${idkey}?key=${apikey}`
    );
    if (result.data.id) {
      const gameFromApi = {
        name: result.data.name,
        platforms: result.data.platforms.map((p) => p.platform.name).toString(),
        released: result.data.released,
        image: result.data.background_image,
        description: result.data.description.replace(/<[^>]+>/g, ""),
        rating: result.data.rating,
        genres: result.data.genres.map((g) => g.name).toString(),
      };
      return gameFromApi;
    }
  }
  var gameFromDataBase = await Videogame.findByPk(id, {
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  if (gameFromDataBase) {
    let genrestr = [];
    for (let i = 0; i < gameFromDataBase.genres.length; i++) {
      genrestr.push(gameFromDataBase.genres[i].name);
    }
    const objdbgame = {
      name: gameFromDataBase.name,
      platforms: gameFromDataBase.platform,
      released: gameFromDataBase.released,
      image: gameFromDataBase.image,
      description: gameFromDataBase.description,
      rating: gameFromDataBase.rating,
      genres: gameFromDataBase.genres.map((g) => g.name).toString(),
    };
    return objdbgame;
  }
  throw "Juego no encontrado";
};

const postGame = async (
  name,
  description,
  released,
  rating,
  platforms,
  image,
  genre
) => {
  if (!name || !description || !platforms || !image) {
    throw "Faltan algunos elementos obligatorios para poder postear un video juego";
  } else {
    platforms = platforms.toString();
    const newGame = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
      image,
    });
    const vgGenre = await Genre.findAll({
      where: {
        name: genre,
      },
    });

    newGame.addGenre(vgGenre);
    return `El videojuego ${name} fue creado con exito!!`;
  }
};

const getGenres = async () => {
  return await Genre.findAll({
    attributes: ["name"],
  });
};

const getPlatforms = async () => {
  let apiInfo = await axios.get(
    `https://api.rawg.io/api/platforms/lists/parents?key=${apikey}`
  );
  var platformsApi = apiInfo.data.results.map((p) => p.name);
  return platformsApi;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllGames,
  getSpecificGame,
  postGame,
  getGenres,
  getPlatforms,
};
