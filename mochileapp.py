from flask import Flask, render_template, request, redirect, url_for, jsonify
import conexionBD
import time

#incializar app pasandole el objeto flask
app = Flask(__name__)

# retorna la template home
@app.route("/")
def home():
    return render_template('home.html')

# retorna la template alumno mostrando dinamicamente los datos del alumno correspondiente 
# al rut ingresado por el usuario en la template home
@app.route("/alumno", methods=['POST','GET'])
def alumno():
    if request.method == 'POST':

        rutAlumno  = request.form['rut-alumno']

        if conexionBD.alumnoExiste(rutAlumno):
            alumno = conexionBD.getAlumno(rutAlumno)
            return render_template('alumno.html',rutAlumno=rutAlumno,nombreAlumno=alumno[1],
            montoActual=alumno[3], montoMeta=alumno[4])
        else:
            return jsonify({"estadoAlumno":"no existe"})
    else:
        return redirect(url_for('home'))


# recibe los datos de login del ejecutivo de ventas y en caso de exito lo redirecciona a 
# la template correspondiente, en caso de que falle el login lo redirecciona a una template
# de alerta notificandole que los datos ingresados no han sido correctos
@app.route("/ejecutivo", methods=['POST','GET'])
def ejecutivo():
    if request.method == 'POST':
        
        usuarioEjecutivo = request.form['usuario-ejecutivo']
        passEjecutivo = request.form['password-ejecutivo']

        if conexionBD.ejecutivoExiste(usuarioEjecutivo):
            objetoEjecutivo = conexionBD.getEjecutivo(usuarioEjecutivo)

            if usuarioEjecutivo == objetoEjecutivo[2] and passEjecutivo == objetoEjecutivo[3]:
                return render_template('ejecutivo.html',usuarioEjecutivo=usuarioEjecutivo)
            else:
                return "login incorrecto"
        else:
            return "El usuario no existe (login incorrecto)"

    else:
        return redirect(url_for('home'))

# recibe una peticion HTTP desde el cliente de tipo POST que trae un JSON que contiene 
# la informacion de un deposito (rut del alumno a depositar y el monto del deposito) y
# pasa esa informacion a la funcion que hace los procesos de modificacion en la BBDD 
# guardando el deposito
@app.route("/depositar", methods=['POST'])
def depositar():
    if request.method == 'POST':
        deposito = request.json
        rut = deposito['rut']
        monto = deposito['monto']

        conexionBD.depositar(rut,monto)
        return jsonify(deposito)

# recibe una peticion HTTP de tipo GET devolviendo un JSON con todos los depositos 
# asociados a un alumno (con el rut especificado en la ruta de la peticion como parametro)
@app.route("/deposito/<string:rutAlumno>", methods=['GET'])
def listarDepositos(rutAlumno):

    # espero antes de hacer la peticion a la base de datos y mandar lo archivos
    # para darle tiempo de cargar a los datos
    time.sleep(0.025)

    depositos = conexionBD.getDepositos(rutAlumno)
    return jsonify(depositos)

# recibe una peticion HTTP de tipo GET devolviendo un JSON con todos los cursos 
# asociados a un ejecutivo (con el rut especificado en la ruta de la peticion como parametro)
@app.route("/cursos/<string:userEjecutivo>", methods=['GET'])
def listarCursos(userEjecutivo):

    # espero antes de hacer la peticion a la base de datos y mandar lo archivos
    # para darle tiempo de cargar a los datos
    time.sleep(0.025)
    ejecutivo = conexionBD.getEjecutivo(userEjecutivo)
    rutEjecutivo = ejecutivo[0]
    cursos = conexionBD.getCursos(rutEjecutivo)
    return jsonify(cursos)

@app.route("/registrar-curso", methods=['POST'])
def registrarCurso():
    siglaCurso = request.form['sigla-curso']
    letraCurso = request.form['letra-curso']
    nombreColegio = request.form['nombre-colegio']
    ejecutivo = request.form['ejecutivo']
    cuotaAlumno = request.form['cuota-alumno']

    rutEjecutivo = conexionBD.getEjecutivo(ejecutivo)
    rutEjecutivo = rutEjecutivo[0]

    conexionBD.crearCurso(siglaCurso,letraCurso,nombreColegio,rutEjecutivo,cuotaAlumno)

    return redirect(url_for('ejecutivo'))

@app.route("/registrar-alumno", methods=['POST'])
def registrarAlumno():
    rutAlumno = request.form['rut-alumno']
    nombreAlumno = request.form['nombre-alumno']
    codigoCurso = request.form['codigo-curso']

    conexionBD.crearAlumno(rutAlumno,nombreAlumno,codigoCurso)

    return redirect(url_for('ejecutivo'))


if __name__ == "__main__":
    app.run(debug=True, port=3000)