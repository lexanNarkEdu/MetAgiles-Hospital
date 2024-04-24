/*  Scrip para llenar la collections de doctors
	En la cmd poner > load("la ruta donde esta este archivo")
	
	Cuidado con las '\' son dobles '\\'	
	load("C:\\Users\\HP\\Desktop\\scrip-doctores.js")
	
	Algunos comandos utiles:
	db.doctors.drop()
	
	[ABAJO] tambien en comentarios estan algunas querys
	
	Si hace falta
	db.createCollection("doctors")
*/

db.doctors.insert([
	{
	  "name" : "Jose Antonio", 
	  "especialidad": ["Traumatologia","Ginecologia"],
	  "disponibilidad": {
		  "Lunes" : 0,
		  "Martes" : 1,
		  "Miercoles" : 1,
		  "Jueves" : 1,
		  "Viernes" : 0
      }
	},
	{
	  "name" : "Maria Venusia", 
	  "especialidad" : ["Traumatologia","Odontologia"],
	  "disponibilidad" : {
		  "Lunes" : 1,
		  "Martes" : 0,
		  "Miercoles" : 0,
		  "Jueves" : 0,
		  "Viernes" : 1
      }
	}
])

/* [ABAJO]  *************************************************

db.doctors.find().pretty()

Para pegar textos con salto de linea (por que al cmd le rompe los huevos) usar pegar del [Mouse] no `ctrl v`

db.doctors.find(
	{
		especialidad : { $in : ["Odontologia"] }
	}
)

db.doctors.find(
	{
		especialidad : { $in : ["Traumatologia"] }
	}
)

*/