
//Promise que recupera los depositos del alumno y los carga en la pagina al iniciar
fetch('http://127.0.0.1:3000/deposito/11.111.111-1')
.then(data => data.json())
.then (data => {
    let depositos = data;
    listarDepositos(depositos);
});

let btnDepositar = document.getElementById('btn-depositar');

btnDepositar.addEventListener('click', ()=>{
    let rut = document.querySelector('#credenciales-alumno h2').innerHTML
    let monto = parseInt(prompt('Cuanto deseas depositar?', 0));

    while (isNaN(monto)) {
        alert('Has introducido un valor invalido') // TODO terminar validacion
        monto = parseInt(prompt('Cuanto deseas depositar?', 0));
    }

    alert('Se han depositado ' + monto + ' al alumno con rut: ' + rut);
    
});

let btnContrato = document.getElementById('btn-contrato');

btnContrato.addEventListener('click', ()=>{
    let cajaContrato = document.getElementById('contrato');
    cajaContrato.style.display = 'block';    
});

function listarDepositos(arrayDepositos) {

    //selecciono el div que almacena los depositos
    let listaDepositos = document.getElementById('lista-depositos');

    for (let i = 0; i < arrayDepositos.length; i++) {

        // creo los elementos que componen un elemento deposito
        let depositoLi = document.createElement('li');
        let img = document.createElement('img');
        let datosDeposito = document.createElement('ul');
        let montoDeposito = document.createElement('h1');
        let fechaDeposito = document.createElement('h2');

        // asigno los atributos para que adquieran los estilos css establecidos en alumno.css
        datosDeposito.setAttribute('id','datos-deposito');
        img.setAttribute('src','../static/img/deposito.png');
        fechaDeposito.textContent = arrayDepositos[i][0];
        montoDeposito.textContent = arrayDepositos[i][1];

        //hago el append de los elementos en el orden que corresponde
        depositoLi.append(img);
        depositoLi.append(datosDeposito);
        datosDeposito.append(montoDeposito);
        datosDeposito.append(fechaDeposito);
        listaDepositos.append(depositoLi);
    }
}

let listaDepositos = document.getElementById('lista-depositos');
let caja = document.getElementById('historial-transacciones');
caja.addEventListener('click', ()=>{

    // creo los elementos que componen un elemento deposito
    let deposito = document.createElement('li');
    let img = document.createElement('img');
    let datosDeposito = document.createElement('ul');
    let montoDeposito = document.createElement('h1');
    let fechaDeposito = document.createElement('h2');

    // asigno los atributos para que adquieran los estilos css establecidos en alumno.css
    datosDeposito.setAttribute('id','datos-deposito');
    img.setAttribute('src','../static/img/deposito.png');
    montoDeposito.innerHTML = '$XXX.XXX';
    fechaDeposito.innerHTML = 'XX / XX / XX';

    //hago el append de los elementos en el orden que corresponde
    deposito.append(img);
    deposito.append(datosDeposito);
    datosDeposito.append(montoDeposito);
    datosDeposito.append(fechaDeposito);
    listaDepositos.appendChild(deposito);
});

// // probando el llamado a la api que retorna datos alumno 
// fetch('http://127.0.0.1:3000/json')
// .then(data => data.json())
// .then(data => {
//     console.log(data);
// });

