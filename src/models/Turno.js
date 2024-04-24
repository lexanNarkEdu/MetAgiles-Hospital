const { Schema, model } = require("mongoose");

const TurnoSchema = new Schema({
    id_doctor:{type: String,required: true},
    id_user:{type: String,required: true}, // [ABAJO]
    fecha: {type: String,required: true},
    hora: {type: Number,required: true},
    description: {type: String,required: true},
  },
  { timestamps: true }
);

module.exports = model("Turno", TurnoSchema); // Nombre del Modelo

// Como MongoDB crea los id de los usuarios como por ejemplo: 5dgd51gd31g5d este no es un numero :V