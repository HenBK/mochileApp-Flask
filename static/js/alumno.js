// al abrir la pagina se cargan los depositos ya existentes del alumno
cargarDepositos();

// guardo el monto actual y el monto meta en variables y despues les doy el formato deseado
// añadiendo un $ antes del numero para mostrarlos formateados en la vista y guardarlos 
// como int en las variables montoActual y montoMeta respectivamente para calculos posteriores
let montoActual = parseInt(document.getElementById('monto-actual').textContent);
document.getElementById('monto-actual').textContent = '$'+montoActual;

let montoMeta = parseInt(document.getElementById('monto-meta').textContent);
document.getElementById('monto-meta').textContent = '$'+montoMeta;
document.getElementById('monto').textContent = '$'+montoMeta;

let porcentaje = Math.round((montoActual / montoMeta) * 100);
document.querySelector('#porcentaje').innerHTML = `${porcentaje}%`

// selecciono el boton depositar
let btnDepositar = document.getElementById('btn-depositar');

// añado al boton depositar el evento click que dispara la funcionalidad de depositar
btnDepositar.addEventListener('click', ()=>{

    let montoExcedido = false;
    let rut = document.querySelector('#credenciales-alumno h2').innerHTML
    let montoDeposito = prompt('Cuanto deseas depositar ?', 0);

    // validacion del monto de deposito
    if (montoDeposito != null) {

        while (montoDeposito != null && isNaN(montoDeposito) || montoDeposito < 1) {
            alert('Has introducido un valor invalido, por favor ingresa un numero. Asegurate que sea mayor a 0.');
            montoDeposito = prompt('Cuanto deseas depositar?', 0);
            if (montoDeposito == null) {
                break;
            }
        }
    
        if ( montoDeposito != null && (parseInt(montoDeposito) + montoActual) > montoMeta) {
            alert('Ups! Parece que estas intentando depositar un monto que excede la meta del alumno, intenta nuevamente.');
            montoExcedido = true;
        } else if (montoDeposito > 0) {
                alert('Se han depositado $' + Math.round(montoDeposito) + ' al alumno con rut: ' + rut);
            }
    }
    
    //seleciono el rut del alumno al que se le esta haciendo el deposito
    let rutAl = document.querySelector('#credenciales-alumno h2').innerHTML;

    // guardo los datos de deposito (rut del alumno y monto del deposito) que voy a mandar por
    // POST al servidor en un objeto JSON
    let data = {
        monto: montoDeposito,
        rut: rutAl
    };

    // declaro las opciones de mi peticion HTTP definiendo:
    // el tipo metodo como POST,
    // el tipo de contenido que se enviara esta en formato JSON,
    // y que el cuerpo del la peticion HTTP es el objeto data que guarda los datos a enviar
    let opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    // se hace la ultima validacion y se hace la peticion HTTP enviando los datos ingresados
    // por el cliente al servidor
    if (!montoExcedido && montoDeposito != null) {

        // se manda el deposito al servidor y se actualizan los datos en la vista llamando 
        // una vez mas a la funcion cargarDepositos() mostrando asi los depositos que ya 
        // existian previamente mas el ultimo deposito recien hecho por el usuario sin
        // recargar la pagina
        fetch('http://127.0.0.1:3000/depositar',opciones)
        .then(res => res.json())
        .then(cargarDepositos());

        // se actualizan los datos en la vista en referencia al monto depositado por el usuario
        montoActual = parseInt(montoDeposito) + montoActual
        document.getElementById('monto-actual').textContent = '$'+montoActual;

        porcentaje = Math.round((montoActual / montoMeta) * 100)
        document.querySelector('#porcentaje').innerHTML = `${porcentaje}%`;
    }

});

// cargarDepositos() trae un array de los depositos asociados al alumno desde el servidor 
// y los inserta en la vista con la funcion listarDepositos()
function cargarDepositos() {

    let rutAlumno = document.querySelector('#credenciales-alumno h2').innerHTML;
    
    // Promise que recupera los depositos del alumno y los carga al iniciar la pagina
    fetch(`http://127.0.0.1:3000/deposito/${rutAlumno}`)
    .then(data => data.json())
    .then (data => {
        let depositos = data;

        //solo si el alumno cuenta con depositos se ejecuta listarDepositos
        if (depositos.length > 0) {
            listarDepositos(depositos);
        }
    });
}

// listarDepositos() inserta los depositos del alumno en el <ul> "lista-depositos",
// toma como parametro un array con los depositos asociados al alumno
function listarDepositos(arrayDepositos) {
    
    // selecciono el <ul> que almacena los depositos
    let listaDepositos = document.getElementById('lista-depositos');
    
    // elimino lo que tenga el <ul> en caso de que se necesite cargar los depositos 
    // mas de una vez, para asi no tener elementos duplicados    
    listaDepositos.innerHTML = '';

    for (let i = 0; i < arrayDepositos.length; i++) {

        // creo los elementos HTML que componen un 'componente' deposito
        let depositoLi = document.createElement('li');
        let img = document.createElement('img');
        let datosDeposito = document.createElement('ul');
        let montoDeposito = document.createElement('h1');
        let fechaDeposito = document.createElement('h2');

        // asigno los atributos para que los elementos adquieran los estilos
        // css establecidos previamente en la stylesheet 'alumno.css'
        datosDeposito.setAttribute('id','datos-deposito');
        img.setAttribute('src','../static/img/deposito.png');
        fechaDeposito.textContent = arrayDepositos[i][0];
        montoDeposito.textContent = '$'+arrayDepositos[i][1];

        // hago el append de los elementos en el orden que corresponde
        depositoLi.append(img);
        depositoLi.append(datosDeposito);
        datosDeposito.append(montoDeposito);
        datosDeposito.append(fechaDeposito);
        listaDepositos.append(depositoLi);
    }

} 
