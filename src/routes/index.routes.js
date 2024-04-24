const express = require("express");
const router = express.Router();

// Controllers [contiene funciones]
const { renderIndex, renderAbout } = require("../controllers/index.controller");

router.get("/", renderIndex);// Quizas se hacen operaciones mas largas que solo renderizar. Como validar en la bd, etc
router.get("/about", renderAbout);// IDEM arriba

module.exports = router;