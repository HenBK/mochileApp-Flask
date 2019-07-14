// validacion de ingreso rut alumno
let input = document.getElementById('text-rut');
let form = document.getElementById('form-login');

form.addEventListener('submit', (e)=>{

    if (input.value == "") {
        e.preventDefault();
        alert('Ups! dejaste el campo Rut en blanco');
        input.focus();

    } else if (input.value.length != 12) {
        e.preventDefault();
        alert('Ups! recuerda que el formato correcto es 11.111.111-1');
        input.value = "";
        input.focus();
    }
});