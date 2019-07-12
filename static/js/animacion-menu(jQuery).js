$(document).ready(function () {

    let menuAbierto = false;
    let overlay = $('#overlay');
    let imgMenu = $('#img-menu');
    let cajaAcceso = $('#caja-acceso')
    let botonMenu = $('#btn-menu');
    
    botonMenu.click(function() {

            if (!menuAbierto) {
                
                botonMenu.animate({
                    right: '410px'
                }, 200);
                
                cajaAcceso.animate({
                    right: '0px'
                }, 200);
                
                overlay.css('display','block');
                overlay.stop().animate({ opacity: '0.5' }, 200);
                
                imgMenu.attr('src', "../static/img/btnCerrar.png");
                menuAbierto = true;
                
            } else {
                
                botonMenu.animate({
                    right: '22px'
                }, 200);
                
                cajaAcceso.animate({
                    right: '-401px'
                }, 200);
                
                overlay.stop().animate({ opacity: '0' }, 200, function() {
                    overlay.css('display','none');
                });
                
                imgMenu.attr('src', "../static/img/ham-menu.png");
                menuAbierto = false;
            }

        });
        
    });