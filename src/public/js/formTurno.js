window.onload = async function(){

    // -------  Metodos abreviados para el DOM  --------
    const log = console.log
    const q = document.querySelector.bind(document)
    const id = document.getElementById.bind(document)
    // -------------------------------------------------    
       
    const url = 'http://localhost:4000';
    const doctores = await fetch(url + '/doctors')
                           .then(res =>res.json())
                           .then(info => self=info.data)
                           .catch(err => log(err));
    
    log("Doctores :",doctores)
 
    // Select DOM
    const selectEsp = q('.especialidad')
    const selectDoc = q('.doctor')
    

    function loadDocEsp(esp){
        let docFiltrado = doctores.filter( d => d.especialidad.includes(esp))
        log("Algun cambio por aca para la",esp)
        let $options = `<option value="">Elige una Doctor</option>`;
        docFiltrado.forEach(d => $options += `<option value="${d._id}">${d.name}</option>`);
        selectDoc.innerHTML = $options; // [ABJ]
    }

    selectEsp.addEventListener("change",e => loadDocEsp(e.target.value))

};

/*  
    [ABJ] ademas esto me asegura no tener que borrar todo el contenido cada ves

    Hacer esto como primera idea esta bueno [PERO] pero es ineficiente
    Pensalo que solo por hacer clik en el 'select' se hace una peticion a la BD, por lo que son muchas peticiones a la BD por solamente un OPTIONS

    fetch(URL + '/doctors/esp/'+ esp)
    .then(function(response) {
        return response.json()
    })
    .then(function(information) {
    log(information.data)
        information.data.forEach(function(elem) {
            var optionDoctor = document.createElement('option');
            optionDoctor.innerText = elem.name ;
            optionDoctor.setAttribute('value',elem._id);
            selectorDoctor.append(optionDoctor);
            });
        })
    .catch(function(error){
        console.log(error);
    })     */