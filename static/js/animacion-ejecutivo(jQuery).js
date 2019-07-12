$(document).ready(function() {

    funcionalidadComponentes();

    // dropdow de la top-bar al entrar a la interface
    $('#top-bar').animate({
        paddingTop: '105px'
    },400);

    let cursoAbierto = false;

    // selecciono el boton crear curso
    let btnCrearCurso = $('#btn-crear-curso');

    // selecciono el div agregar-curso
    let divCurso = $('#agregar-curso');

    //selecciono el div overlay para hacer efecto de oscurecimiento
    let overlay = $('#overlay');

    let btnCerrar = $('#cerrar-curso');

    let btnCerrarAl = $('#cerrar-alumno');

    // añado al boton contrato el evento que dispara la animacion en la que aparece el contrato
    btnCrearCurso.click(function() {
        if (!cursoAbierto) {
            
            funcionalidadComponentes();
            divCurso.slideDown(250);

            overlay.css('display','block');

            overlay.stop().animate({ opacity: '0.5' }, 200);

            cursoAbierto = true;

            btnCerrar.click(function() {
                
                divCurso.stop().effect('clip', 200);

                overlay.stop().animate({ opacity: '0' }, 200, function(){
                    overlay.css('display','none');
                });

                cursoAbierto = false;
            });
        }
    });

    function funcionalidadComponentes() {

        setTimeout(()=> {
            
            let componentes = $('.componente-curso');

            let alumnoAbierto = false;

            // selecciono el div agregar-alumno
            let divAlumno = $('#agregar-alumno');

            //selecciono el div overlay para hacer efecto de oscurecimiento
            let overlay = $('#overlay');

            componentes.click(function() {
                if (!alumnoAbierto) {

                    let codigoCurso = $(this).children('div').children();
                    codigoCurso = codigoCurso[2].textContent;

                    $('#cod-cur').val(codigoCurso);
                    
                    divAlumno.slideDown(250);

                    overlay.css('display','block');

                    overlay.stop().animate({ opacity: '0.5' }, 200);

                    alumnoAbierto = true;

                    btnCerrarAl.click(function() {
                        
                        divAlumno.stop().effect('clip', 200);

                        overlay.stop().animate({ opacity: '0' }, 200, function(){
                            overlay.css('display','none');
                        });

                        alumnoAbierto = false;
                    });
                }
            });

            },1000)
        }

        $('#reg-alumno').submit(function(e){
            e.preventDefault();
            $.ajax({
                url:'/registrar-alumno',
                type:'post',
                data:$('#reg-alumno').serialize(),
                success:function(){   
                    
                    $('#txt-nombreAlumno').val("");
                    $('#txt-rutAlumno').val("");

                    $('#notificacion').fadeIn(300);
                    
                    setTimeout(function() {
                        btnCerrarAl.click();
                        $('#notificacion').fadeOut(300)
                    }, 2000);
                }
            });
        });

    // evito que el forma redireccione la pagina y hago que el div crear curso se cierre
    $('#reg-curso').submit(function(e){
        e.preventDefault();
        $.ajax({
            url:'/registrar-curso',
            type:'post',
            data:$('#reg-curso').serialize(),
            success:function(){
                btnCerrar.click();
                cargarCursos();
                funcionalidadComponentes();
                $('#txt-nombreColegio').val("");
                $('#txt-cuota').val("");
            }
        });
    });

});