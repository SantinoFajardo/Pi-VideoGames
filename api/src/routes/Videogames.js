const { response } = require("express");
var express = require("express");
const controllers = require("./Controllers");
var router = express.Router();

router.get("/", async (req, res) => {
  let name = req.query.name;
  try {
    let allGames = await controllers.getAllGames();
    if (name) {
      let correctName = name.toLowerCase();
      let gameByName = await allGames.filter((el) =>
        el.name.toLowerCase().includes(correctName)
      );
      if (gameByName.length) {
        return res.status(200).send(gameByName);
      } else {
        res
          .status(400)
          .send(
            `Lo siento, no hemos encontrado el juego con el nombre ${name}`
          );
      }
    }
    res.status(200).send(allGames);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let response = await controllers.getSpecificGame(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send("No se pudo encontrar el juego");
  }
});

router.post("/", async (req, res) => {
  let { name, description, released, rating, platforms, image, genres } =
    req.body;
  try {
    let response = await controllers.postGame(
      name,
      description,
      released,
      rating,
      platforms,
      image,
      genres
    );
    if (name && description && image && platforms && genres) {
      return res.status(200).send(response);
    } else {
      return res.status(400).send(response);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.delete("/delete/:name", async (req, res) => {
  let { name } = req.params;
  try {
    if (name) {
      let response = await controllers.deleteGame(name);
      res.status(200).send(response);
    } else {
      res.status(400).send(response);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete;
module.exports = router;
