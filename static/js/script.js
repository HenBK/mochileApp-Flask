$(document).ready(function() {
 
    var input = $('#text-rut')
    var form = $('#form-login')
    
    form.submit(function(e) {
        
        if (input.val() == "") {
            e.preventDefault();
            
            alert('Ups! dejaste el campo Rut en blanco');
            input.focus();
            
        } else if (input.val().length != 12) {
            e.preventDefault()
            alert('Ups! recuerda que el formato correcto es 11.111.111-1');
            input.val("");
            input.focus();
        }
        
    });
    
});



