from flask import Flask, render_template, url_for, request, redirect, url_for, flash, jsonify
import mysql.connector
import conexionBD
import json 

#incializar app
app = Flask(__name__)

#asegurar la sesion del usuario (para poder usar la funcion flash)
app.secret_key = 'clavesecreta'

@app.route("/")
def home():
    return render_template('home.html')

@app.route("/alumno", methods=['POST','GET'])
def alumno():
    if request.method == 'POST':

        rutAlumno  = request.form['rut-alumno']

        #cambiar origen de variables que se pasan por parametro para que vengan desde la coleccion alumno
        #pasar por parametro los datos del alumno por cada indice del arreglo alumno 
        if conexionBD.alumnoExiste(rutAlumno):
            alumno = conexionBD.getAlumno(rutAlumno)
            return render_template('alumno.html',rutAlumno=rutAlumno,nombreAlumno=alumno[1],
            montoActual=alumno[3], montoMeta=alumno[4])
        else:
            return jsonify({"estadoAlumno":"no existe"})
        
    else:
        return redirect(url_for('home'))

@app.route("/json")
def httpjs():
    #listarAlumnos() retorna coleccion de alumnos que viene de la query SQL
    data = conexionBD.listarAlumnos()
    
    return jsonify(data)
    # return json.dumps(data)
    # ambas formas sirven para retornar un json

@app.route("/deposito/<string:rutAlumno>", methods=['GET'])
def deposito(rutAlumno):
    depositos = conexionBD.getDepositos(rutAlumno)
    return jsonify(depositos)


if __name__ == "__main__":
    app.run(debug = True, port = 3000)
