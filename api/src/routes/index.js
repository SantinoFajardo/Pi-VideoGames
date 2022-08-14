const { Router } = require("express");
const express = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGamesRouter = require("./Videogames");
const genresRouter = require("./Genres");

const router = Router();
router.use(express.json());
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames", videoGamesRouter);
router.use("/genres", genresRouter);

module.exports = router;
