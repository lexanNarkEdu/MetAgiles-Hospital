const mongoose = require("mongoose");
const MONGODB_URI =  process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,   // Para que no salgan warnings en la consola
    useUnifiedTopology: true,    // Idem arriba
    useFindAndModify: false,
    useCreateIndex: true,  // Idem arriba
  })
  .then((db) => console.log("Mongodb esta conectado en", db.connection.host))
  .catch((err) => console.error(err));