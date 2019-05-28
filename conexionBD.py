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
        
def listarAlumnos():
    cur.execute('select * from alumno')
    res = cur.fetchall()
    for fila in res:
        print(fila)

def alumnoExiste(rut):
    sql = ' SELECT * FROM alumno WHERE rut_alumno = "{0}" '.format(rut)
    cur.execute(sql)
    res = cur.fetchone()

    if res != None:
        return True
    else:
        return False
