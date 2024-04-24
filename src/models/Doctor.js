const { Schema, model } = require("mongoose");

const DoctorSchema = new Schema({
    name:{type: String,required: true}, 
    especialidad: [String],
    disponibilidad: {
        Lunes: { type: Number,required: true },
        Martes: { type: Number,required: true },
        Miercoles: { type: Number,required: true },
        Jueves: { type: Number,required: true },
        Viernes: { type: Number,required: true },
    }
});

module.exports = model("Doctor", DoctorSchema); // Nombre del Modelo