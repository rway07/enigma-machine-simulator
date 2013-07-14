-- Progettazione Web 
DROP DATABASE if exists enigma; 
CREATE DATABASE enigma; 
USE enigma; 
-- MySQL dump 10.13  Distrib 5.5.17, for Win32 (x86)
--
-- Host: localhost    Database: enigma
-- ------------------------------------------------------
-- Server version	5.5.17

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
-- Table structure for table `configuration`
--

DROP TABLE IF EXISTS `configuration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `configuration` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `walzenlage_1` int(11) NOT NULL,
  `walzenlage_2` int(11) NOT NULL,
  `walzenlage_3` int(11) NOT NULL,
  `ringstellung_1` int(11) NOT NULL,
  `ringstellung_2` int(11) NOT NULL,
  `ringstellung_3` int(11) NOT NULL,
  `steckerverbindungen_1` varchar(2) NOT NULL,
  `steckerverbindungen_2` varchar(2) NOT NULL,
  `steckerverbindungen_3` varchar(2) NOT NULL,
  `steckerverbindungen_4` varchar(2) NOT NULL,
  `steckerverbindungen_5` varchar(2) NOT NULL,
  `steckerverbindungen_6` varchar(2) NOT NULL,
  `steckerverbindungen_7` varchar(2) NOT NULL,
  `steckerverbindungen_8` varchar(2) NOT NULL,
  `steckerverbindungen_9` varchar(2) NOT NULL,
  `steckerverbindungen_10` varchar(2) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuration`
--

LOCK TABLES `configuration` WRITE;
/*!40000 ALTER TABLE `configuration` DISABLE KEYS */;
INSERT INTO `configuration` VALUES (1,1,3,2,4,18,6,'ZN','OM','CR','UI','KP','WQ','SE','JV','LX','TF'),(2,3,1,2,12,22,17,'DW','UO','PY','GR','FS','EQ','KT','CL','AI','ZB'),(3,1,2,5,5,16,3,'FW','DL','NX','BV','KM','RZ','HY','IQ','RC','JU'),(4,4,3,5,7,1,12,'QS','YA','XW','KR','MP','HT','DU','OV','CL','FZ'),(5,1,5,4,26,9,14,'VW','LT','PB','FO','ZK','GS','RI','QJ','HM','XE'),(6,4,1,3,2,17,20,'KZ','FI','WY','MP','DS','HR','CU','XE','QV','NT'),(7,5,1,4,18,11,25,'TS','IK','AV','QP','HW','FM','DX','NG','CY','UE'),(8,4,5,1,22,4,16,'PV','XS','ZU','EQ','BW','CH','AO','RL','JN','TD'),(9,1,4,5,14,10,25,'VK','DW','LH','RF','JS','CX','PT','YB','ZG','MU'),(10,5,2,1,9,20,19,'FN','TA','YJ','EO','RG','PC','VD','KI','XH','WZ'),(11,1,5,4,13,15,11,'NX','EO','RV','GP','SU','DK','IT','FY','BL','AZ'),(12,2,5,1,7,19,2,'HR','NC','IU','DM','TW','GV','FB','ZL','EQ','OX'),(13,5,1,2,14,4,12,'AN','IV','LH','YP','WM','TR','XU','FO','ZB','BD'),(14,3,2,4,10,23,21,'WT','RE','PC','FY','JA','VD','OI','HK','NX','ZS'),(15,1,4,2,15,4,25,'TM','IJ','VE','OY','NX','PR','WL','GA','BU','SF'),(16,4,3,5,7,1,13,'IN','YJ','SD','UV','GF','BH','TK','QE','AR','OP'),(17,3,2,5,21,24,15,'UT','ZC','YN','BE','PK','JX','RS','GF','IA','QH'),(18,4,5,1,23,9,20,'XF','PZ','SQ','GR','AJ','UO','CN','BV','TM','KI'),(19,5,1,3,13,24,21,'HA','GM','DI','VK','JP','YU','EF','TB','ZL','XQ'),(20,4,1,3,15,22,12,'PO','TV','QC','ZS','EX','WR','BJ','DK','FU','LA'),(21,4,1,5,17,24,3,'XC','AQ','OT','UZ','HD','RG','KM','BL','NS','JW'),(22,1,5,2,13,2,26,'GP','XH','IW','BO','NU','MD','SA','ZK','QR','LT'),(23,4,3,2,8,11,7,'SX','TD','QP','HU','FB','YN','CO','IK','WE','GZ'),(24,3,2,4,22,2,6,'PI','KM','JB','YU','QS','OV','ZA','GW','CH','XF'),(25,2,1,4,5,1,16,'KA','ZH','QP','GR','MF','LJ','OT','EN','BD','YW'),(26,1,3,5,19,26,8,'GS','VD','CQ','LE','HI','BO','JP','UZ','FT','RN'),(27,3,2,1,6,3,15,'BF','GR','SZ','OM','WQ','TY','HE','JU','XN','KD'),(28,1,3,2,9,16,12,'NE','MT','RL','OY','HV','IU','GK','FW','PZ','XC'),(29,3,5,2,13,11,6,'ZM','BQ','TP','YX','FK','AR','WH','SO','NJ','DG'),(30,5,4,1,4,25,1,'DI','ZL','RX','UH','QK','PC','VY','GA','SO','EM'),(31,1,2,5,10,14,2,'BF','SD','AY','HG','OU','QC','WI','RL','XP','ZK');
/*!40000 ALTER TABLE `configuration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `ID` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `clear_message` varchar(256) NOT NULL,
  `crypted_message` varchar(256) NOT NULL,
  `decrypted_message_server` varchar(256) NOT NULL,
  `decrypted_message_client` varchar(256) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  UNIQUE KEY `date_UNIQUE` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-07-14 22:04:40
