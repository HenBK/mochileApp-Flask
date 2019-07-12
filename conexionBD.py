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

    sql = f"""SELECT * FROM alumno INNER JOIN curso ON alumno.codigo_curso = curso.codigo_curso 
    where rut_alumno = '{rut}' """
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


# busca al ejecutivo en la base de datos por su rut si lo encuentra devuelve True sino 
# retorna false
def ejecutivoExiste(usuario):
    conn._open_connection()

    sql = ' SELECT * FROM ejecutivo WHERE usuario_ejecutivo = "{0}" '.format(usuario)
    cur.execute(sql)
    res = cur.fetchone()
    conn.close()
    if res != None:
        return True
    else:
        return False

#retorna los datos del ejecutivo en una coleccion
def getEjecutivo(usuario):
    conn._open_connection()

    sql = f" SELECT * FROM ejecutivo WHERE usuario_ejecutivo = '{usuario}' "
    cur.execute(sql)
    res = cur.fetchone()
    conn.close()
    return res

def getCursos(rutEjecutivo):
    conn._open_connection()

    sql = f" SELECT * FROM curso WHERE rut_ejecutivo = '{rutEjecutivo}' "
    cur.execute(sql)
    res = cur.fetchall()
    conn.close()
    return res

def crearCurso(siglaCurso,letraCurso,nombreColegio,rutEjecutivo, cuotaAlumno):
    conn._open_connection()

    sql = f""" INSERT INTO curso (sigla_curso,letra_curso,nombre_colegio,rut_ejecutivo, cuota_alumno)
    VALUES  ( '{siglaCurso}','{letraCurso}','{nombreColegio}','{rutEjecutivo}','{cuotaAlumno}' ) """
    cur.execute(sql)

    conn.commit()
    conn.close()

def crearAlumno(rutAlumno,nombreAlumno,codigoCurso):
    conn._open_connection()

    sql = f" SELECT cuota_alumno FROM curso WHERE codigo_curso = '{codigoCurso}' "
    cur.execute(sql)

    res = cur.fetchone()
    montoMeta = res[0]

    sql = f""" INSERT INTO alumno (rut_alumno, nombre_alumno, codigo_curso, monto_pagado, meta_a_pagar)
    VALUES ('{rutAlumno}','{nombreAlumno}',{codigoCurso},0,{montoMeta}) """
    cur.execute(sql)

    conn.commit()
    conn.close()

