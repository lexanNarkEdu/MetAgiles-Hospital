const router = require("express").Router();

// La consumire como API
const {
  getAllDoctors,
  getDoctorID,
} = require("../controllers/doctors.controller");

// Routes
router.get("/doctors", getAllDoctors); // [1]

router.get("/doctor/:id", getDoctorID); // [2]

/*
[1] Busca todos los doctores
[2] Busca el doctor por ID
*/
module.exports = router;