var express = require("express");
var router = express.Router();
const controllers = require("./Controllers");

router.get("/", async (req, res) => {
  try {
    let response = await controllers.getPlatforms();
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
