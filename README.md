<h1 align="center"> HOSPITAL </h1> 

Aplicación para sacar Turnos médicos de un hospital

Pueden acceder en el siguiente enlace

https://hospital-app-js.herokuapp.com/


<div align="center">
    <h4>Hosting</h4>
    <img src="https://img.shields.io/badge/heroku-8A2BE2?style=for-the-badge&logo=heroku">
    <img src="https://img.shields.io/badge/-atlas-white?style=for-the-badge&logo=mongodb">
</div>

<div align="center">
    <h4>Tecnologías</h4>
    <img src="https://img.shields.io/badge/-node-white?style=for-the-badge&logo=nodedotjs">
    <img src="https://img.shields.io/badge/handlebar-orange?style=for-the-badge&logo=handlebarsdotjs">
    <img src="https://img.shields.io/badge/-mongodb-white?style=for-the-badge&logo=mongodb">
</div>





<h2 align="center">Desarrollo</h2>


#### Correr

````
npm run dev
````

#### Creación del Proyecto

``````shell
npm init -y
``````

#### Dependencias

````shell
npm i express connect-flash bcryptjs express-handlebars express-session method-override mongoose passport passport-local morgan cross-env cors
````



#### Cors

Permite que cualquiera se conecte a mi API, no solo exclusivamente mi aplicación. Por ejemplo mi localhost quiere hacer un GET a la API si no hay este modulo me sale acceso denegado. Otro ejemplo seria que el `frontEnd` como por ejemplo Angular quiera hacer una peticion al `BackEnd `osea la API.

#### morgan

Un midelware de desarrollo, para que me muestre por consola todas las peticiones GET, POST

#### Cross-env

Para el entorno de desarrollo y que no haya problemas a la hora de subir a HEROKU

````json
/ En el package.json sirve para definir variables de entorno
"scripts": {
    "start": "cross-env NODE_ENV=production node src/index.js",
    "dev": "cross-env NODE_ENV=development nodemon src/index.js"
},
````
En `index.js` u en la parte donde importes el `dotenv`

````javascript
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // Es que si existe un archivo llamado ".env"
} 
````

#### method-override

El overrade es para poder usar el DELETE en los formularios por defecto no se puede solo te deja GET,POST en el HTML



#### DependenciasDev

````shell
npm install dotenv nodemon npm-check-updates -D
````



### Controlers

Están ahí para que no se llene la definición de la ruta, con las **funciones** solo para eso, yo lo hacia junto pero así es mas escalable

#### Conect flash
Para mostrar mensajes como "respueta enviada,... etc"

### BONUS

Hubo un error con handelbars y la forma mas fácil de resolverla es la siguiente

````javascript
const query = await Note.find().lean()
// Es por el tipo de dato que devuelve mongoose, al usar '.lean()' lo paso a formato JSON y ya no te sale WARNINGS en la consola
````
