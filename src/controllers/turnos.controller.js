const turnoCtrl = {};

// Models
const Turno = require("../models/Turno");

turnoCtrl.renderTurnoForm = (req, res) => {
    console.log("Aca se guarda la info del usuario logueado",req.user.id);
    res.render("turnos/new-turno",{
      javascript: 'formTurno.js',
    }); 
  };


// turnoCtrl.createNewTurno = async (req, res) => {
//     console.log("Creacion de un nuevo TURNO")
//     console.log(req.body)
//     const { id_doctor,fecha,hora,description } = req.body;
//     console.log(id_doctor,fecha,hora,description)
    
//     const newTurno = new Turno({ id_doctor,fecha,hora,description});
//     console.log(newTurno)
//     newTurno.id_user=req.user.id
//     await newTurno.save();

//     req.flash("success_msg", "Note Added Successfully"); // Se guarda el mensaje en el servidor
//     res.redirect("/turnos");
// };

turnoCtrl.createNewTurno = async (req, res) => {
  console.log("Creacion de un nuevo TURNO");
  const { id_doctor, fecha, hora, description } = req.body;
  console.log(id_doctor, fecha, hora, description);

  // Verificar si ya existe un turno para el mismo doctor en la misma fecha y hora
  const turnoExistente = await Turno.findOne({ id_doctor, fecha, hora });
  if (turnoExistente) {
      // Manejar el caso donde el turno ya está ocupado
      req.flash("error_msg", "Turno no disponible para la fecha y hora seleccionadas.");
      // return res.redirect("/turnos/new-turno");
      return;
  }

  // Si no existe, crear el nuevo turno
  const newTurno = new Turno({ id_doctor, fecha, hora, description });
  newTurno.id_user = req.user.id; // Asumiendo que el ID del usuario está en req.user.id
  await newTurno.save();

  req.flash("success_msg", "Turno agregado exitosamente");
  res.redirect("/turnos");
};

turnoCtrl.renderTurnos = async (req, res) => {
    console.log("Id del usuario",req.user.id)
    const turnos = await Turno.find({id_user: req.user.id}).lean() // [ABAJO]
      .sort({ date: "desc" })
      .lean();
    res.render("turnos/all-turnos", { turnos });
};
// [ARRIBA] Elimina el Warnig de consola ver README


/*
Si se usa el PUT se debe restringir que otro usuario no pueda cambiar las notas de otro
notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if (note.user != req.user.id) { // Valida lo del comienzo
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/notes");
  }
  res.render("notes/edit-note", { note });
};
*/

turnoCtrl.deleteTurno = async (req, res) => {
    await Turno.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Note Deleted Successfully");
    res.redirect("/turnos");
  };

module.exports = turnoCtrl;