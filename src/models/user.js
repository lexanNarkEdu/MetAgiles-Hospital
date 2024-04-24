const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs"); // Para encryptar

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// Encriptar pass, devuelve la pass hasheada
UserSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Validar pass, Fijate que sale de [UserSchema:(this).password]
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password); // Esto devuelve Boolean
};

module.exports = model("User", UserSchema);