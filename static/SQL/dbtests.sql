-- inserts de prueba

-- crear alumno
insert into alumno values (
	'11.111.111-1',
    'Henrique Kubenda',
    1,
    0,
    100000
);

-- crear ejecutivo
insert into ejecutivo values (
	'22.222.222-2',
    'Juan Perez',
    'ejecutivo01',
    '123'
);

-- crear curso
insert into curso(sigla_curso,letra_curso,nombre_colegio,rut_ejecutivo,cuota_alumno) values (
	'III',
    'B',
    'Liceo Gabriela Mistral',
    '22.222.222-2',
    100000
);


-- crear deposito 
insert into deposito (fecha_deposito, monto_deposito, rut_alumno)
values (
	sysdate(),
    2000,
    '11.111.111-1'
);

-- queries de prueba
delete from deposito;
delete from alumno;
delete from curso;
select * from alumno;
select monto_pagado from alumno where rut_alumno = '11.111.111-1';
update alumno set monto_pagado = monto + monto_pagado where rut_alumno = 'rut';
select 
codigo_deposito,
DATE_FORMAT(fecha_deposito,'%d / %m / %Y') AS fecha_formateada,
monto_deposito,
rut_alumno 
from deposito;
delete from deposito where rut_alumno = '11.111.111-1';
update  alumno set monto_pagado = 5000 where rut_alumno = '11.111.111-1';
alter table alumno add foreign key (codigo_curso) references curso(codigo_curso);
alter table curso add foreign key (rut_ejecutivo) references ejecutivo(rut_ejecutivo);
drop table alumno;
commit;


-- crear tabla alumno 
CREATE TABLE alumno (
	rut_alumno VARCHAR(12) PRIMARY KEY,
    nombre_alumno VARCHAR(30) NOT NULL,
    codigo_curso INT NOT NULL,
    monto_pagado INT NOT NULL,
    meta_a_pagar INT NOT NULL
);

-- crear tabla curso
CREATE TABLE curso (
	codigo_curso INT PRIMARY KEY AUTO_INCREMENT,
    sigla_curso VARCHAR(3) NOT NULL,
    letra_curso VARCHAR(1) NOT NULL,
    nombre_colegio VARCHAR(30) NOT NULL,
    rut_ejecutivo VARCHAR(12) NOT NULL,
    cuota_alumno INT NOT NULL
);

-- crear tabla deposito 
CREATE TABLE deposito (
	codigo_deposito INT PRIMARY KEY AUTO_INCREMENT,
    fecha_deposito DATETIME NOT NULL,
    monto_deposito INT NOT NULL,
    rut_alumno VARCHAR(12) NOT NULL,
    
    CONSTRAINT FK_rut_alumno FOREIGN KEY (rut_alumno)
    REFERENCES alumno(rut_alumno)
);

-- crear tabla ejecutivo
CREATE TABLE ejecutivo (
	rut_ejecutivo VARCHAR(12) PRIMARY KEY,
    nombre_ejecutivo VARCHAR(30) NOT NULL,
    usuario_ejecutivo VARCHAR(30) NOT NULL,
    pass_ejecutivo VARCHAR(30) NOT NULL
);
