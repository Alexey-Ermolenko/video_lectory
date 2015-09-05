-- phpMyAdmin SQL Dump
-- version 4.0.10
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 04, 2015 at 10:53 AM
-- Server version: 5.5.37-log
-- PHP Version: 5.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `DB`
--

-- --------------------------------------------------------

--
-- Table structure for table `Actions`
--

CREATE TABLE IF NOT EXISTS `Actions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `action` varchar(20) DEFAULT NULL,
  `number_lection` int(11) DEFAULT NULL,
  `width` float DEFAULT NULL,
  `height` float DEFAULT NULL,
  `xold` float DEFAULT NULL,
  `yold` float DEFAULT NULL,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `time` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14147 ;

-- --------------------------------------------------------

--
-- Table structure for table `Lections`
--

CREATE TABLE IF NOT EXISTS `Lections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `specification` text,
  `keys` text,
  `content` text,
  `task_group` text,
  `autor` varchar(50) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `poster` varchar(100) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

-- --------------------------------------------------------

--
-- Table structure for table `Scenario`
--

CREATE TABLE IF NOT EXISTS `Scenario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `autor` varchar(50) DEFAULT NULL,
  `specification` text,
  `dateCreate` datetime DEFAULT NULL,
  `dateAlter` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

-- --------------------------------------------------------

--
-- Table structure for table `Slides`
--

CREATE TABLE IF NOT EXISTS `Slides` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT NULL,
  `autor` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `2Dicon` varchar(100) DEFAULT NULL,
  `2Dpic` varchar(100) DEFAULT NULL,
  `3Dicon` varchar(100) DEFAULT NULL,
  `3Dtexture` varchar(100) DEFAULT NULL,
  `3Dobject` varchar(100) DEFAULT NULL,
  `commentary` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=136 ;

-- --------------------------------------------------------

--
-- Table structure for table `SlidesInScenario`
--

CREATE TABLE IF NOT EXISTS `SlidesInScenario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_slide` int(11) DEFAULT NULL,
  `id_scenario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=150 ;

-- --------------------------------------------------------

--
-- Table structure for table `SlidesTime`
--

CREATE TABLE IF NOT EXISTS `SlidesTime` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_slide` int(11) DEFAULT NULL,
  `number_lection` int(11) DEFAULT NULL,
  `time` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=250 ;

-- --------------------------------------------------------

--
-- Table structure for table `Video`
--

CREATE TABLE IF NOT EXISTS `Video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number_lection` int(11) DEFAULT NULL,
  `autor` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `realname` varchar(255) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `resolution` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=39 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
