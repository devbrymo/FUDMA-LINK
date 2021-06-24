/*
LIST OF TABLES IN DATABASE FUDMA BAZE

| admin_data           |
| user_data            |
| user_info            |
| cartoon              |
| gp_calculator        |
| message              |
| share_handout        |
| posts                |
| EDIT_PAGES           |

*/



CREATE TABLE `admin_data` (
  `USERNAME` varchar(30) NOT NULL,
  `PASSWORD` varchar(30) NOT NULL,
  UNIQUE KEY `USERNAME` (`USERNAME`)
);

INSERT INTO admin_data SET USERNAME='captain', PASSWORD='mubarakxxx2' ;

CREATE TABLE `advert` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ADVERT_NAME` varchar(40) NOT NULL,
  `ADVERT_TEXT` text NOT NULL,
  `ADVERT_LINK` varchar(40) NOT NULL,
  `ADVERT_PICTURE` varchar(40) NOT NULL,
  PRIMARY KEY (`ID`)
);


CREATE TABLE `blog` (
  `ID` int(6) NOT NULL AUTO_INCREMENT,
  `CAT_ID` int(3) NOT NULL,
  `TITLE` varchar(255) NOT NULL,
  `CONTENTS1` text NOT NULL,
  `CONTENTS2` text NOT NULL,
  `DATE_POSTED` varchar(40) NOT NULL,
  `COMMENT` text NOT NULL,
  PRIMARY KEY (`ID`)
);



CREATE TABLE `cartoon` (
  `EMAIL` varchar(30) NOT NULL,
  `PHONE` varchar(33) NOT NULL,
  `USER` varchar(30) NOT NULL,
  `PICTURE` mediumtext NOT NULL,
  `RESOLUTION` varchar(40) NOT NULL,
  `PAYMENT` varchar(40) NOT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `categories` (
  `ID` int(3) NOT NULL AUTO_INCREMENT,
  `NAME` text NOT NULL,
  PRIMARY KEY (`ID`)
);

INSERT INTO categories (ID, NAME) VALUES (1, 'School News');
INSERT INTO categories (ID, NAME) VALUES (2, 'New Student');

CREATE TABLE `message` (
  `USERNAME` varchar(40) NOT NULL,
  `MESSAGE` text NOT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `posts` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER` varchar(40) NOT NULL,
  `CAPTION` text NOT NULL,
  `LOVE` int(30) NOT NULL,
  `COMMENT` text,
  `COMMENT_COUNT` int(30) NOT NULL,
  `LOCATION` varchar(100) NOT NULL,
  `PICTURE` varchar(100) NOT NULL DEFAULT 'user_profile_pic.png',
  `NAME` varchar(100) NOT NULL,
  `LOVED_USER` text NOT NULL,
  `LOVED_NAME` text NOT NULL,
  `VIDEO` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `share_handout` (
  `DIR_NAME` varchar(50) NOT NULL,
  `ADDRESS` varchar(50) NOT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `user_data` (
  `NAME` varchar(30) DEFAULT NULL,
  `USERNAME` varchar(30) NOT NULL,
  `PASSWORD` varchar(30) NOT NULL,
  `EMAIL` varchar(30) NOT NULL,
  `PHONE` mediumtext NOT NULL,
  `QUESTION` varchar(50) NOT NULL,
  `ANSWER` varchar(50) NOT NULL,
  `PICTURE` varchar(150) NOT NULL DEFAULT 'user_picture/f4.png',
  PRIMARY KEY (`USERNAME`)
);

CREATE TABLE `user_info` (
  `USERNAME` varchar(30) NOT NULL,
  `PASSWORD` varchar(30) NOT NULL,
  PRIMARY KEY (`USERNAME`)
);






