cargarCursos();

function cargarCursos() {

    let usuarioEjecutivo = document.querySelector('#usuario-ejecutivo').textContent;
    
    // Promise que recupera los cursos del ejecutivo y los carga al iniciar la pagina
    fetch(`http://127.0.0.1:3000/cursos/${usuarioEjecutivo}`)
    .then(data => data.json())
    .then (data => {
        let cursos = data;

        // solo si el ejecutivo cuenta con cursos se ejecuta listarCursos
        if (cursos.length > 0) {
            listarCursos(cursos);
        }
    });
}

function listarCursos(arrayCursos) {
    
    let contenedorCursos = document.getElementById('contenedor-cursos');
    let arrayListas = [];
    let cantidadCursos = arrayCursos.length;

    cantidadListas = cantidadCursos / 3;

    if (cantidadListas%1 != 0) {
        cantidadListas = Math.trunc(cantidadListas);
        cantidadListas += 1;
    }

    for (let i = 0; i < cantidadListas; i++) {
        let lista = document.createElement('ul');
        lista.setAttribute('class','listado-curso');
        arrayListas.push(lista);
    }
    
    let contadorCurso = 1;
    let contadorLista = 0;

    arrayCursos.forEach(i => {
        
        let componenteCurso = document.createElement('li');
        let h3 = document.createElement('h3');
        let h4 = document.createElement('h4');
        let img = document.createElement('img');
        let div = document.createElement('div');
        let h5 = document.createElement('h5');
        let imgDiv = document.createElement('img');
        let span = document.createElement('span');

        componenteCurso.setAttribute('class','componente-curso');
        h3.textContent = `${i[1]} ${i[2]}`;
        h4.textContent = `${i[3]}`;
        img.setAttribute('src',"../static/img/curso.png");
        h5.textContent = 'Añadir alumno';
        imgDiv.setAttribute('src',"../static/img/add.png");
        span.textContent = `${i[0]}`;

        componenteCurso.append(h3);
        componenteCurso.append(h4);
        componenteCurso.append(img);
        componenteCurso.append(div);
        div.append(h5);
        div.append(imgDiv);
        div.append(span);

        arrayListas[contadorLista].append(componenteCurso);

        contadorCurso++;

        if (contadorCurso > 3) {
            contadorCurso = 1;
            contadorLista++;
        }
    });

    contenedorCursos.innerHTML = '';

    arrayListas.forEach(i => {
        contenedorCursos.append(i);
    });
}









