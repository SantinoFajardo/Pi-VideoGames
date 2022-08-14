var express = require("express");
const { apikey, Videogame, Genre, conn } = require("../db");
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
  let id = req.params.id;
  try {
    let idkey = parseInt(id);
    if (idkey) {
      let gameById = await controllers.getSpecificGame(idkey);
      if (gameById) {
        return res.status(200).send(gameById);
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
