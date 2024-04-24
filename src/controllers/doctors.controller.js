const doctorCtrl = {};

// Models
const Doctor = require("../models/Doctor");

doctorCtrl.getAllDoctors = async (req, res) => {
    const doctors = await Doctor.find().lean();
    res.json({status: 'OK', data:doctors})
};


doctorCtrl.getDoctorID = async (req, res) => {
    const doctor = await Doctor.findById(req.params.id).lean();
    console.log(doctor)
    res.json({status: 'OK', data:doctor})
};

module.exports = doctorCtrl;