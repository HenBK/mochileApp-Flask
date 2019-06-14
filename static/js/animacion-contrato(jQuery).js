// cargo el documento (equivalente a evento 'load' en ES6)
$(document).ready(function() {

    let contratoAbierto = false;

    // selecciono el boton contrato
    let btnContrato = $('#btn-contrato');

    // selecciono el div que contiene al contrato
    let divContrato = $('#contrato');

    btnContrato.click(function() {
        if (!contratoAbierto) {
            
            divContrato.css('display','block');
            contratoAbierto = true;

        } else {
            divContrato.css('display','none');
            contratoAbierto = false;
        }
    });
});