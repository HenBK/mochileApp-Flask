let div = document.getElementById('btn-depositar');

div.addEventListener('click', ()=>{
    let rut = document.querySelector('#credenciales-alumno h2').innerHTML
    let monto = prompt('Cuanto deseas depositar?', 0);
    alert('Se han depositado '+monto+' al alumno con rut: '+rut);
})