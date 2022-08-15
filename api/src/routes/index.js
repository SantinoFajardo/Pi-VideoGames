const { Router } = require("express");
const express = require("express");
const videoGamesRouter = require("./Videogames");
const genresRouter = require("./Genres");
const platformsRouter = require("./Platforms");

const router = Router();
router.use(express.json());

router.use("/videogames", videoGamesRouter);
router.use("/genres", genresRouter);
router.use("/platforms", platformsRouter);

module.exports = router;
