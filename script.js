const titleForm = document.getElementById('titleForm')
const form = document.getElementById('form')
const trLoader = document.getElementById('trLoader')
const URL_API = "https://server-usuarios-qsdd.onrender.com/usuarios"
const submitButton = document.getElementById('btnSubmit')
const $tbody = document.getElementById('tbody')

function fetchUsers(){
    fetch(URL_API)
    .then(res => {
        if(res.ok) return res.json()//! desdes hacer RETURN DE LA RES!!!
        else throw new Error(`❌❌Error:${res.status}, ${res.statusText} ❌❌`)
    })
        .then(json =>{
            console.log(json);
            renderizaTabla(json)
        }).catch( error =>{
            console.log(error);
            let tr = document.createElement('tr') //Para agregar la info de que el fetch fallo!
            tr.innerHTML = `
                <td class="text-center text-red-800 font-bold" colspan="7"> Error en el GET de usuarios: ${error.message} </td>
            `
            $tbody.innerHTML = ''
            $tbody.appendChild(tr)
        })
}

function renderizaTabla(usuarios) {
     $tbody.innerHTML = '' //limpiarla del lo, er, usuario
     if(usuarios.length === 0){
         let tr = document.createElement('tr') //Para agregar la info de que el fetch fallo!
            tr.innerHTML = `
                <td class="text-center text-red-800 font-bold" colspan="7"> NO HAY REGISTROS DE USURIOS EN LA TABLA </td>
            `
            $tbody.appendChild(tr)
     }
     usuarios.map(user => {
        //?  var        =   cond        ?       true      :   false
        let ColorGenero = user.genero   ? 'text-pink-500' : 'text-blue-500' 
        let ColorBarra  = user.genero   ? 'bg-pink-500'   : 'bg-blue-500' 
        let tr = document.createElement('tr')
        tr.innerHTML = `
            <td> <img class='w-[80px] h-[80px] rounded-full' src='${user.foto}' alt='${user.nombre}'/> </td>
            <td class='px-4 py-2'> ${user.nombre}</td>
            <td class='px-4 py-2'> ${user.edad}</td>
            <td class='${ColorGenero} px-4 py-2 text-center font-bold'> ${user.genero ? 'Mujer' : 'Hombre'}</td>
            <td class='px-4 py-2'> ${user.email}</td>
            <td class='px-4 py-2'> 
                <div class='flex items-center'> 
                    <span class='mr-2 text-xs font-medium'>${user.aceptacion} %</span>
                    <div class='w-full bg-gray-200 h-2 rounded-sm'>
                        <div class='${ColorBarra} h-2 rounded-sm' style='width:${user.aceptacion}%' > </div>
                    </div>
                </div>
            </td>
            <td class='px-4 py-2'> 
                <button class='w-[100%] my-1  bg-pink-500 text-white rounded mr-2 edit-btn' data-id='${user.id}' > Editar </button>
                <button class='w-[100%] my-1  bg-blue-500 text-white rounded mr-2 delete-btn' data-nombre='${user.nombre}' data-id='${user.id}' > Eliminar </button>
            </td>
        `
        $tbody.appendChild(tr)
     })

     //Btn de Editar
     document.querySelectorAll('.edit-btn').forEach( btn => {
        btn.addEventListener('click', () => editUser(btn.dataset.id))
     })

     //Btn de Eliminar
     document.querySelectorAll('.delete-btn').forEach( btn => {
        btn.addEventListener('click', () => {
             if(confirm(`Esta seguro que desea eliminar el usuario llamado ${btn.dataset.nombre} con id = ${btn.dataset.id}`))
                deleteUser(btn.dataset.id)
            })
     })
}

//* FUNCION MANEJADORA DEL EVENTO "CLICK" SOBRE EL BTN "Editar"
function editUser(id){
    titleForm.textContent = 'LLENA LOS CAMPOS Y EDITAR AL USUARIO'
    submitButton.value = 'Actualizar ➤'
    //*haremos un fetch GET/id DEL USUARIO AESP A EDITAR, ME RETURN SE UN TDD OBJ
    fetch(`${URL_API}/${id}`)
        .then(res =>{
            if(!res.ok) throw new Error(`❌❌Error:${res.status}, ${res.statusText} ❌❌`)
            return res.json()//! desdes hacer RETURN DE LA RES!!!
        })
            .then(json =>{
                //*Recorrer cada campo de la tabla, cada input de form, para hacer la asignacion
                Object.entries(json).map(([campo, value]) => { //Desestruc al Arr, ele por ele
                    //*Atrapa la referencia del input correspondiente, mediante el campo
                   const $input = document.querySelector(`[name="${campo}"]`)
                    if($input){
                        if($input.type === 'radio' && campo === 'genero')
                            document.querySelector(`[name="genero"][value="${value.toString()}"]`).checked = true
                        else $input.value = value
                    }
                })
            
            })
                .catch(err =>{
                    console.log(`❌ERROR AL EDITAR EL USUARIO ID = ${id}: ${err.message}`);
                    alert(`❌ERROR AL EDITAR EL USUARIO ID = ${id}: ${err.message}`)
                })
}



//* FUNCION MANEJADORA DEL EVENTO "CLICK" SOBRE EL BTN "Editar"
function deleteUser(id){
    fetch(`${URL_API}/${id}`, {method: 'DELETE'} )
        .then(res =>{
            if(!res.ok) throw new Error(`❌❌Error AL ELIMINAR EL USUARIO:${res.status}, ${res.statusText} ❌❌`)
            //* SI NO HAY UN SIGUIENTE THEN(), NO TIENES QUE RETORNAR NADA, PQ LO ENVIAR AL CATCH() Y ESTE SE ACTIVARIA
        limpiaFormularioYActualiza()
        })
            .catch( error =>{
                console.log(`❌ERROR AL ELIMINAR EL USUARIO ID = ${id}: ${error.message}`);
                    alert(`❌ERROR AL ELIMINAR EL USUARIO ID = ${id}: ${error.message}`)
            })
}


function limpiaFormularioYActualiza() {
    fetchUsers() //Refrecamos la tabla, con la ultima info de los registros
    form.reset() //Limpio los inputs
    titleForm.textContent = 'LLENA LOS CAMPOS Y CREAR AL USUARIO'
    submitButton.value = 'Enviar ➤'
}

//* FUNCION MANEJADORA DEL EVENTO "SUBMIT" SOBRE EL BTN "Eviar"/"Actualizar"
form.addEventListener('submit', (e) => {
    e.preventDefault();
    //Capturar la info del form: desde sus inputs.
    const dataForm = new FormData(form)
    let data = Object.fromEntries(dataForm.entries()) //cobvertira el dataForm a un TDD objeto

   if( !data.nombre || !data.edad  || !data.aceptacion || !data.genero || !data.foto )
    alert('For favor llene todos lso campos del formulario')

   if(data.id === '') delete data.id

   //Determinar el method HTTP y la URL segun si hay o no id
   let method = data.id ? 'PUT' : 'POST' 
   let url    = data.id ? `${URL_API}/${data.id}` : URL_API
   let body   =  JSON.stringify(data)
   let headers = {'Content-Type':'application/json'}

   fetch(url, {method, headers, body})
        .then(res =>{
            if(!res.ok) throw  new Error(`ERROR AL ${data.id ? 'ACTUALIZAR' : 'CREAR' } EN LA API`)
            alert(`Usuario fue ${data.id ? 'ACTUALIZADO' : 'CREADO' } CORRECTAMENTE`)
            limpiaFormularioYActualiza()
        })
        .catch(err =>{
            console.log(`Error al enviar el formulario: ${err.message}`);
            alert(`Error al enviar el formulario: ${err.message}`)
        })
        document.querySelector(`input[name="id"]`).value = '';
})



fetchUsers() //hay q llamar esta func general: ESTO DEBEMOS ELIMINARLO!!

