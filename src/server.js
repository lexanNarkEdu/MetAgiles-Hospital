const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const path = require("path");  // Para definir las ubicaciones de las carpetas(e usa para evitar el '\' con el '/')[con ".join" se dice concatena esto]
const morgan = require("morgan"); // Para ver las peticiones en consola
const flash = require("connect-flash"); // Para los mensajes de "enviado correctamente"
const session = require("express-session"); // Analogo pero este se usa para guardar el contenido
const passport = require("passport"); // Para mantenerme logueado en cualquier lugar de la web
const cors = require('cors'); // Esto me arregla lo del CORS para que cualquiera y no exclusivamente la app realize peticiones a la API   // [ADEMAS] Esto permite la comunicacion entre servidores. Por ejemplo si tienes una carpeta llamada front y/o usas Angular/React...

// Initializations
const app = express();
require("./config/passport"); // La logica para mantenerme logueado


// settings
app.set("port", process.env.PORT || 4000); // Esto es como definir una variable
app.set("views", path.join(__dirname, "views")); // Donde esta la carpeta "views"
app.engine(".hbs",exphbs({
      defaultLayout: "main",
      layoutsDir: path.join(app.get("views"), "layouts"), // Lo que se va a repetir(EJ footer,header,etc)
      partialsDir: path.join(app.get("views"), "partials"), // Lo nuevo en cada pagina
      extname: ".hbs",
}));// Configuraciones del motor de vista
app.set("view engine", ".hbs");

// middlewares
app.use(morgan("dev"));
app.use(cors()); // La explicacion esta arriba
app.use(express.urlencoded({ extended: false })); // Le dice al servidor que usamos JSON's
app.use(methodOverride("_method")); // Para usar DELETE en los formularios de HTMl
app.use(
      session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
        //store: new MongoStore({ mongooseConnection: mongoose.connection }),
      })
);  // Para guardar los mensajes en el servidor
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
      res.locals.success_msg = req.flash("success_msg");
      res.locals.error_msg = req.flash("error_msg");
      res.locals.error = req.flash("error");
      res.locals.user = req.user || null; // Lo que guarda Passport(Informacion del Usuario logueado)
      next();
});

// routes
app.use(require("./routes/index.routes"));
app.use(require("./routes/turnos.routes"));
app.use(require("./routes/users.routes"));
app.use(require("./routes/doctors.routes"));

// static files
app.use(express.static(path.join(__dirname, "public"))); //significa que todo lo que este en la carpeta "public" estara disponible en cualquier ubicacion del proyecto como el mongodb que configure en el cmd

module.exports = app;