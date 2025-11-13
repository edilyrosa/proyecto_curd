// // alert('desde js')
// const titleForm = document.getElementById('titleForm')
// const form = document.getElementById('form')
// const botonSubmit = document.getElementById('btnSubmit')
// const trLoader = document.getElementById('trLoader')
// const tbody = document.getElementById('tbody')
// const URL_API = "https://server-usuarios-qsdd.onrender.com/usuarios"

// //fetch() //Metodo de una API de js (promesa: exitosa o rechazada), hace requerimientos HTTP a la URL 1er parametro, 2do es on obj de config

// // fetch(URL).then(RES).then(JSON).catch(ERR)
// fetch(URL_API)
//     .then(res => {
//         if(res.ok) {
//             console.log(res); 
//             return res.json()//! desdes hacer RETURN DE LA RES!!!

//         }
//         else throw new Error('Erro al intentar hacer GET')
//     })
//         .then(json =>{
//             console.log(json);
//             titleForm.textContent = json[1].nombre
//         })
//             // .catch(err => console.log(err)
//             // )
 
            
// //? fetch(URL_API, {method: 'POST' || 'PUT' || 'DELETE' || 'GET' cin id}) → GET


let arr = [1, 2, 3]
let cubo = arr.map(e => e **3)
console.log(cubo);
let mayor = arr.filter( e => e >= 2 )
console.log(mayor);


// '123' → 123, de un TDD a otro TDD
// TDD Objeto → a un TDD Array, los arry son mas faciles de manupular, los puedo mapear e iterar

const user = {
    nombre: 'carmen',
    edad: 20,
    genero: true,
}
[
    ['nombre', 'carmen'], 
    ['edad', 20], 
    ['genero', true] 
]

arrUsuario = Object.entries(user) // → [[ nombre, 'carmen'], [edad, 20], [,]... ]
arrUsuarioVal = Object.values(user) // → [['carmen', 20, true] ]

console.log(arrUsuario);
console.log(arrUsuarioVal);












































// //* coversion de objeto a array: Object.entries(miObj)
// usuario = {
//     nombre:'Edily',
//     peso:50.55,
//     hobbies:['cantar', 'bailar']
// }

// arrUsuario = Object.entries(usuario) //[[c,v], [c, v]]
// arrUsuarioVal = Object.values(usuario) //[v, v, v, ]
// console.log(arrUsuario);
// console.log(arrUsuarioVal);
