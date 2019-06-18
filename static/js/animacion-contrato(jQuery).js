// cargo el documento (equivalente a evento 'load' en ES6)
$(document).ready(function() {

    let contratoAbierto = false;

    // selecciono el boton contrato
    let btnContrato = $('#btn-contrato');

    // selecciono el div que contiene al contrato
    let divContrato = $('#contrato');

    //selecciono el div overlay para hacer efecto de oscurecimiento
    let overlay = $('#overlay');

    // añado al boton contrato el evento que dispara la animacion en la que aparece el contrato
    btnContrato.click(function() {
        if (!contratoAbierto) {
            
            divContrato.slideDown(250);

            overlay.css('display','block');

            overlay.stop().animate({ opacity: '0.5' }, 200);

            contratoAbierto = true;

            divContrato.click(function() {

                $(this).stop().effect('clip', 200);

                overlay.stop().animate({ opacity: '0' }, 200, function(){
                    overlay.css('display','none');
                });

                contratoAbierto = false;
            });
        }
    });
});