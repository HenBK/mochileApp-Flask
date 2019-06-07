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
        
# lista a los alumnos por la consola (solo para probar la base de datos) retorna una list 
def listarAlumnos():
    cur.execute('select * from alumno')
    res = cur.fetchall()
    for fila in res:
        print(fila)
    return res

#busca al alumno en la base de datos por su rut si lo encuentra devuelve True si no False
def alumnoExiste(rut):
    sql = ' SELECT * FROM alumno WHERE rut_alumno = "{0}" '.format(rut)
    cur.execute(sql)
    res = cur.fetchone()

    if res != None:
        return True
    else:
        return False

#retorna los datos del alumno en una coleccion
def getAlumno(rut):
    sql = ' SELECT * FROM alumno WHERE rut_alumno = "{0}" '.format(rut)
    cur.execute(sql)
    res = cur.fetchone()
    print(res)
    return res

#retorna una coleccion de los depositos asociados a un alumno
def getDepositos(rut):
    sql = """ SELECT DATE_FORMAT(fecha_deposito,'%d / %m / %Y'),
    monto_deposito FROM deposito WHERE rut_alumno = '{0}' """.format(rut)

    cur.execute(sql)
    res = cur.fetchall()
    print(res)
    return res

