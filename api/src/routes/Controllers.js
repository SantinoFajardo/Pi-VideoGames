const { Videogame, Genre, apikey } = require("../db");
const axios = require("axios");

const getApiInfo = async () => {
  const URL = `https://api.rawg.io/api/games?key=${apikey}`;
  const promise1 = axios.get(URL + "&page=1");
  const promise2 = axios.get(URL + "&page=2");
  const promise3 = axios.get(URL + "&page=3");
  const promise4 = axios.get(URL + "&page=4");
  const promise5 = axios.get(URL + "&page=5");

  await Promise.all([promise1, promise2, promise3, promise4, promise5]).then(
    (values) => {
      apiInfo = values[0].data.results
        .concat(values[1].data.results)
        .concat(values[2].data.results)
        .concat(values[3].data.results)
        .concat(values[4].data.results);
    }
  );

  const apiGames = await apiInfo.map((el) => {
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
  return apiGames;
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
        id: result.data.id,
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
    const objdbgame = {
      name: gameFromDataBase.name,
      platforms: gameFromDataBase.platforms,
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
  genres
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
      genres,
    });
    const vgGenre = await Genre.findAll({
      where: {
        name: genres,
      },
    });

    newGame.addGenre(vgGenre);
    return `El videojuego ${name} fue creado con exito!!`;
  }
};

const deleteGame = async (name) => {
  if (!name) {
    throw "Es necesario el nombre para borrar el juego";
  } else {
    const deletedGame = await Videogame.destroy({
      where: {
        name: name,
      },
    });
    return "Juego borrado con exito";
  }
};

const getGenres = async () => {
  return await Genre.findAll({
    attributes: ["name"],
  });
};

const getPlatforms = async () => {
  let apiInfo = await axios.get(
    `https://api.rawg.io/api/platforms?key=${apikey}`
  );
  var platformsApi = apiInfo.data.results.map((p) => p.name);
  return platformsApi;
  // const URL = `https://api.rawg.io/api/games?key=${apikey}`;
  // const promise1 = axios.get(URL + "&page=1");
  // const promise2 = axios.get(URL + "&page=2");
  // const promise3 = axios.get(URL + "&page=3");
  // const promise4 = axios.get(URL + "&page=4");
  // const promise5 = axios.get(URL + "&page=5");

  // await Promise.all([promise1, promise2, promise3, promise4, promise5]).then(
  //   (values) => {
  //     apiInfo = values[0].data.results
  //       .concat(values[1].data.results)
  //       .concat(values[2].data.results)
  //       .concat(values[3].data.results)
  //       .concat(values[4].data.results);
  //   }
  // );

  // const plataformas = await apiInfo.map((el) => {
  //   return {
  //     platforms: el.platforms.map((p) => p.platform.name),
  //   };
  // });
  // return plataformas;
};

module.exports = {
  getApiInfo,
  getDbInfo,
  getAllGames,
  getSpecificGame,
  postGame,
  getGenres,
  getPlatforms,
  deleteGame,
};
