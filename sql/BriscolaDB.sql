-- Progettazione Web 
DROP DATABASE if exists BriscolaDB; 
CREATE DATABASE BriscolaDB; 
USE BriscolaDB; 
-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: BriscolaDB
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game` (
  `id` int NOT NULL AUTO_INCREMENT,
  `result` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `player_points` int NOT NULL,
  `playerid` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `playerid` (`playerid`),
  CONSTRAINT `game_ibfk_1` FOREIGN KEY (`playerid`) REFERENCES `player` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'W',61,'Alfredo'),(2,'W',69,'Alfredo'),(3,'W',71,'Alfredo'),(4,'L',42,'Orazio'),(5,'W',88,'Orazio'),(6,'D',60,'Orazio'),(7,'W',78,'MarioST'),(8,'L',50,'MarioST'),(9,'W',69,'MarioST'),(10,'W',72,'MarioST'),(11,'W',70,'MarioST'),(12,'L',47,'MarioST'),(13,'L',47,'MarioST'),(14,'D',60,'Alfredo'),(15,'L',38,'Franco'),(16,'L',55,'Franco'),(17,'L',56,'Alfredo'),(18,'W',79,'Alfredo'),(19,'W',77,'Alfredo'),(20,'W',64,'Marco00'),(21,'L',49,'Marco00'),(22,'W',78,'Marco00'),(23,'W',65,'Marco00'),(24,'W',71,'Marco00'),(25,'L',38,'Marco00'),(26,'W',63,'Marco00'),(27,'D',60,'Marco00'),(28,'W',71,'Marco00'),(29,'D',60,'Marco00'),(30,'W',71,'Marco00'),(31,'W',72,'Marco00'),(32,'W',61,'Alfredo'),(33,'L',32,'Alfredo'),(34,'W',61,'Alfredo'),(35,'L',36,'Alfredo'),(36,'W',66,'Alfredo'),(37,'L',38,'Alfredo'),(38,'L',52,'Marco00'),(39,'W',65,'Marco00'),(40,'L',57,'Marco00'),(41,'W',85,'Marco00'),(42,'L',34,'Marco00'),(43,'L',54,'Marco00'),(44,'L',51,'Marco00'),(45,'W',69,'Marco00'),(46,'D',60,'Marco00'),(47,'W',83,'Marco00'),(48,'W',79,'Marcus'),(49,'W',71,'Marcus'),(50,'W',67,'Marcus'),(51,'D',60,'Marcus'),(52,'W',73,'Marcus'),(53,'W',84,'Marcus'),(54,'L',57,'Marcus');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `player` (
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES ('Franco','$2y$10$bp1srS75QAjHgWcIRK8qNOV8mlrmVVlMyKBdgYU.QYDOPlhcd1EvG'),('Alfredo','$2y$10$xX3HCI6ZqdWJBxgVXeoV2u7reand2o5MErdVAJHCXCWiVpb7i/b/K'),('Orazio','$2y$10$McVjd.9wGXiJ5BdPAcXrx.JgVPE7Jdc4wwLQlTh3VO3pjvd57YLpS'),('Marco00','$2y$10$0ooK6zV12H6rtgEpCsZVvu4ad1/nqavgrp3ZkosFdGRuZ4fu0PNKi'),('MarioST','$2y$10$R5Po5zl3W/uc0CvY.u9TUORtzh/YQglbLuMpi53MYAQR20rhqZk6y'),('Marcus','$2y$10$49KsbPjXo9XQGVImCa3PsuKB8Yz1IkdyNrzwhWQFRAcDCnPlZw6Qe');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-07 21:01:43
