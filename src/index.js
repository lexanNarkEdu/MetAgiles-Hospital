if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // Es que si existe un archivo llamado ".env" va asignar las variables de entorno
} 
// Solo sirve para desarrollo a la hora de SUBIR no se usa. Para definir las variables de entorno sera en la pagina de Deploy HEROKU


const app = require('./server');
require('./database');

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
    console.log('Environment:', process.env.NODE_ENV);
});