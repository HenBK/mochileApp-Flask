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

        if conexionBD.alumnoExiste(rutAlumno):
            nombreAlumno = conexionBD.retornarAlumno(rutAlumno)
            return render_template('alumno.html',rutAlumno=rutAlumno,nombreAlumno=nombreAlumno)
        else:
            return jsonify({"estadoAlumno":"no existe"})
        
    else:
        return render_template('alumno.html')

if __name__ == "__main__":
    app.run(debug = True, port = 3000)
