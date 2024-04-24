const express = require("express");
const router = express.Router();

// Controllers [contiene funciones]
const { renderTurnoForm,
        createNewTurno,
        renderTurnos,
        deleteTurno
} = require("../controllers/turnos.controller");

// Helpers: Para verificar que estes autenticado
const { isAuthenticated } = require("../helpers/auth");

// New Turno
router.get("/turnos/add",isAuthenticated, renderTurnoForm); // VIsta del formulario para el nuevo turno

router.post("/turnos/new-turno",isAuthenticated, createNewTurno);


// Get All Turnos
router.get("/turnos",isAuthenticated, renderTurnos);

// Edit Notes (creo que no sera nesecario)just no puedes cambiar la fecha y todo eso mejor se anula y se crea otro
// router.get("/turnos/edit/:id", isAuthenticated, renderEditForm);
//router.put("/turnos/edit-note/:id", updateNote);

// Delete Notes
router.delete("/turnos/delete/:id", isAuthenticated,deleteTurno);

module.exports = router;