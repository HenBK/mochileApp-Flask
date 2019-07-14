-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: testdb
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumno`
--

DROP TABLE IF EXISTS `alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `alumno` (
  `rut_alumno` varchar(12) NOT NULL,
  `nombre_alumno` varchar(30) NOT NULL,
  `codigo_curso` int(11) NOT NULL,
  `monto_pagado` int(11) NOT NULL,
  `meta_a_pagar` int(11) NOT NULL,
  PRIMARY KEY (`rut_alumno`),
  KEY `codigo_curso` (`codigo_curso`),
  CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`codigo_curso`) REFERENCES `curso` (`codigo_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno`
--

LOCK TABLES `alumno` WRITE;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` VALUES ('12.345.678-9','Juanito Cabezas',22,60699,190000),('21.222.222-2','Henrique Flores',24,0,1000000),('22.222.222-2','Juan Perez',18,141300,150000),('33.333.333-3','kk',22,200,190000),('3333333333','juan',25,0,30000),('55.555.555-5','jjjjjjjjjjjj',21,313,333),('6767776','kk',18,0,150000);
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `curso` (
  `codigo_curso` int(11) NOT NULL AUTO_INCREMENT,
  `sigla_curso` varchar(3) NOT NULL,
  `letra_curso` varchar(1) NOT NULL,
  `nombre_colegio` varchar(30) NOT NULL,
  `rut_ejecutivo` varchar(12) NOT NULL,
  `cuota_alumno` int(11) NOT NULL,
  PRIMARY KEY (`codigo_curso`),
  KEY `rut_ejecutivo` (`rut_ejecutivo`),
  CONSTRAINT `curso_ibfk_1` FOREIGN KEY (`rut_ejecutivo`) REFERENCES `ejecutivo` (`rut_ejecutivo`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (18,'III','Z','DuocUC','22.222.222-2',150000),(19,'IV','C','Colegio Alcantara','22.222.222-2',3000000),(20,'I','B','Otro Mas','22.222.222-2',300000),(21,'8vo','A','Henrique Kubenda','22.222.222-2',333),(22,'III','B','Colegio Divina Pastora','22.222.222-2',190000),(23,'IV','A','kkck','22.222.222-2',150000),(24,'III','B','Colegio 123','22.222.222-2',1000000),(25,'I','F','colegio prueba','22.222.222-2',30000);
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deposito`
--

DROP TABLE IF EXISTS `deposito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `deposito` (
  `codigo_deposito` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_deposito` datetime NOT NULL,
  `monto_deposito` int(11) NOT NULL,
  `rut_alumno` varchar(12) NOT NULL,
  PRIMARY KEY (`codigo_deposito`),
  KEY `FK_rut_alumno` (`rut_alumno`),
  CONSTRAINT `FK_rut_alumno` FOREIGN KEY (`rut_alumno`) REFERENCES `alumno` (`rut_alumno`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deposito`
--

LOCK TABLES `deposito` WRITE;
/*!40000 ALTER TABLE `deposito` DISABLE KEYS */;
INSERT INTO `deposito` VALUES (4,'2019-07-10 23:49:58',10000,'22.222.222-2'),(5,'2019-07-10 23:50:09',30000,'22.222.222-2'),(6,'2019-07-10 23:50:17',80000,'22.222.222-2'),(7,'2019-07-10 23:50:22',20000,'22.222.222-2'),(8,'2019-07-11 13:04:02',1200,'22.222.222-2'),(9,'2019-07-11 13:04:14',100,'22.222.222-2'),(10,'2019-07-11 13:12:57',1200,'12.345.678-9'),(11,'2019-07-11 13:13:06',5000,'12.345.678-9'),(12,'2019-07-11 13:13:12',9000,'12.345.678-9'),(13,'2019-07-11 13:13:18',10000,'12.345.678-9'),(14,'2019-07-11 13:13:22',23000,'12.345.678-9'),(15,'2019-07-12 15:43:46',200,'33.333.333-3'),(16,'2019-07-14 08:50:05',2000,'12.345.678-9'),(17,'2019-07-14 11:06:30',1000,'12.345.678-9'),(18,'2019-07-14 11:06:36',100,'12.345.678-9'),(19,'2019-07-14 11:08:22',100,'12.345.678-9'),(20,'2019-07-14 11:08:27',1299,'12.345.678-9'),(21,'2019-07-14 11:08:39',300,'55.555.555-5'),(22,'2019-07-14 11:08:44',12,'55.555.555-5'),(23,'2019-07-14 11:09:05',1,'55.555.555-5'),(24,'2019-07-14 12:35:49',1000,'12.345.678-9'),(25,'2019-07-14 12:35:53',2000,'12.345.678-9'),(26,'2019-07-14 12:38:26',5000,'12.345.678-9');
/*!40000 ALTER TABLE `deposito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ejecutivo`
--

DROP TABLE IF EXISTS `ejecutivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ejecutivo` (
  `rut_ejecutivo` varchar(12) NOT NULL,
  `nombre_ejecutivo` varchar(30) NOT NULL,
  `usuario_ejecutivo` varchar(30) NOT NULL,
  `pass_ejecutivo` varchar(30) NOT NULL,
  PRIMARY KEY (`rut_ejecutivo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ejecutivo`
--

LOCK TABLES `ejecutivo` WRITE;
/*!40000 ALTER TABLE `ejecutivo` DISABLE KEYS */;
INSERT INTO `ejecutivo` VALUES ('22.222.222-2','Juan Perez','ejecutivo01','123');
/*!40000 ALTER TABLE `ejecutivo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-14 14:17:12
