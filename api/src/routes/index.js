const { Router } = require("express");
const express = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGamesRouter = require("./Videogames");
const genresRouter = require("./Genres");
const platformsRouter = require("./Platforms");

const router = Router();
router.use(express.json());
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videoGamesRouter);
router.use("/genres", genresRouter);
router.use("/platforms", platformsRouter);

module.exports = router;
