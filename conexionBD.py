import mysql.connector

#crear conexion con base de datos
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="123password",
    database="testdb"
)

#inicilizar cursor (objeto que ejecuta las sentencias SQL)
cur = conn.cursor()
        
# lista a los alumnos por la consola (solo para probar la base de datos)
def listarAlumnos():
    cur.execute('select * from alumno')
    res = cur.fetchall()
    for fila in res:
        print(fila)

#busca al alumno en la base de datos por su rut si lo encuentra devuelve True si no False
def alumnoExiste(rut):
    sql = ' SELECT * FROM alumno WHERE rut_alumno = "{0}" '.format(rut)
    cur.execute(sql)
    res = cur.fetchone()

    if res != None:
        return True
    else:
        return False

#retorna los datos del alumno (de momento solo el nombre aun no hago la tabla completa xd)
def retornarAlumno(rut):
    sql = ' SELECT * FROM alumno WHERE rut_alumno = "{0}" '.format(rut)
    cur.execute(sql)
    res = cur.fetchone()
    nombreAlumno = res[2]
    return nombreAlumno