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

# recibe una peticion HTTP desde el cliente de tipo POST que trae un JSON que contiene 
# la informacion de un deposito (rut del alumno a depositar y el monto del deposito) y
# pasa esa informacion a la funcion que hace los procesos de modificacion en la BBDD 
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
    time.sleep(0.02)

    depositos = conexionBD.getDepositos(rutAlumno)
    return jsonify(depositos)

if __name__ == "__main__":
    app.run(debug=True, port=3000)