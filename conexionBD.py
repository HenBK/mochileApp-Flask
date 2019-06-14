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
        
#busca al alumno en la base de datos por su rut si lo encuentra devuelve True si no False
def alumnoExiste(rut):
    conn._open_connection()

    sql = ' SELECT * FROM alumno WHERE rut_alumno = "{0}" '.format(rut)
    cur.execute(sql)
    res = cur.fetchone()
    conn.close()
    if res != None:
        return True
    else:
        return False

#retorna los datos del alumno en una coleccion
def getAlumno(rut):
    conn._open_connection()

    sql = ' SELECT * FROM alumno WHERE rut_alumno = "{0}" '.format(rut)
    cur.execute(sql)
    res = cur.fetchone()
    conn.close()
    return res

    
#retorna los depositos asociados a un alumno en una coleccion
def getDepositos(rut):
    conn._open_connection()

    sql = """ SELECT DATE_FORMAT(fecha_deposito,'%d/%m/%Y %h:%i%p'),
    monto_deposito FROM deposito WHERE rut_alumno = '{0}' 
    ORDER BY fecha_deposito DESC """.format(rut)

    cur.execute(sql)
    res = cur.fetchall()
    conn.close()
    return res

#registra el deposito en la tabla deposito y suma el pago al alumno en la tabla alumno 
def depositar(rut, monto):
    conn._open_connection()

    sql = f""" INSERT INTO deposito (fecha_deposito, monto_deposito, rut_alumno)
    VALUES (sysdate(), {monto},'{rut}')"""
    cur.execute(sql)

    sql = f" update alumno set monto_pagado = {monto} + monto_pagado where rut_alumno = '{rut}' "
    cur.execute(sql)

    conn.commit()
    conn.close()
