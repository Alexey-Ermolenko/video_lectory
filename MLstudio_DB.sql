-- phpMyAdmin SQL Dump
-- version 4.0.10.6
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 22 2015 г., 06:31
-- Версия сервера: 5.5.41-log
-- Версия PHP: 5.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `db1`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Commands`
--

CREATE TABLE IF NOT EXISTS `Commands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number_lection` int(11) DEFAULT NULL,
  `command` varchar(255) DEFAULT NULL,
  `time` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=66313 ;

-- --------------------------------------------------------

--
-- Структура таблицы `Demonstrations`
--

CREATE TABLE IF NOT EXISTS `Demonstrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `string_parameter` text,
  `autor` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `icon` varchar(100) DEFAULT NULL,
  `commentary` text,
  `typeID` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=34 ;

-- --------------------------------------------------------

--
-- Структура таблицы `DemonstrationsTypes`
--

CREATE TABLE IF NOT EXISTS `DemonstrationsTypes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `library_file_links` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

-- --------------------------------------------------------

--
-- Структура таблицы `Demonstrations_In_Scenario`
--

CREATE TABLE IF NOT EXISTS `Demonstrations_In_Scenario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_demonstration` int(11) DEFAULT NULL,
  `id_scenario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=61 ;

-- --------------------------------------------------------

--
-- Структура таблицы `Demonstrations_Time`
--

CREATE TABLE IF NOT EXISTS `Demonstrations_Time` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_demonstration` int(11) DEFAULT NULL,
  `number_lection` int(11) DEFAULT NULL,
  `time` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=259 ;

-- --------------------------------------------------------

--
-- Структура таблицы `Lections`
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
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Структура таблицы `Scenario`
--

CREATE TABLE IF NOT EXISTS `Scenario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `autor` varchar(50) DEFAULT NULL,
  `specification` text,
  `dateCreate` datetime DEFAULT NULL,
  `dateAlter` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- Структура таблицы `Video`
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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
