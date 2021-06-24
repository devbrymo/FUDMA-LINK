--
-- Brymo Tech
-- Databaze fudmadropbox
--

--
-- CREATING TABLE MEMBERS
--

CREATE TABLE IF NOT EXISTS `members` (
  `memberId` int(20) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `userName` varchar(25) NOT NULL UNIQUE KEY,
  `accessKey` varchar(80) NOT NULL,
  `fullName` varchar(30) NOT NULL,
  `address` varchar(200) NOT NULL,
  `phoneNumber` varchar(14) NOT NULL,
  `birthdate` varchar(20) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `dateAdded` date NOT NULL,
  `profilePic` varchar(100) NOT NULL DEFAULT '../profilePic/default.png',
  `hometown` varchar(50) NOT NULL,
  `language` varchar(30) NOT NULL,
  `aboutme` text NOT NULL,
  `status` varchar(30) NOT NULL,
  `keyQuestion` varchar(50) NOT NULL,
  `keyAnswer` varchar(50) NOT NULL

);

INSERT INTO members (fullName,userName,accessKey,phoneNumber,keyQuestion,keyAnswer) VALUES
("Aisha Ali","debby","12345678910","07011111111","What Is 2+2 ?","4");
INSERT INTO members (fullName,userName,accessKey,phoneNumber,keyQuestion,keyAnswer) VALUES
("Aminat Morenikeji","morenijeki","12345678910","07022222222","What Is 2+2 ?","4");
INSERT INTO members (fullName,userName,accessKey,phoneNumber,keyQuestion,keyAnswer) VALUES
("Paul Omelu","paul","12345678910","07033333333","What Is 2+2 ?","4");
INSERT INTO members (fullName,userName,accessKey,phoneNumber,keyQuestion,keyAnswer) VALUES
("Miz Kabzey","kabzey","12345678910","07044444444","What Is 2+2 ?","4");
INSERT INTO members (fullName,userName,accessKey,phoneNumber,keyQuestion,keyAnswer) VALUES
("Amina Omenesa","omenesa","12345678910","07055555555","What Is 2+2 ?","4");
INSERT INTO members (fullName,userName,accessKey,phoneNumber,keyQuestion,keyAnswer) VALUES
("Amina","minah","12345678910","07066666666","What Is 2+2 ?","4");
INSERT INTO members (fullName,userName,accessKey,phoneNumber,keyQuestion,keyAnswer) VALUES
("Ibrahim Yusuf ","brymo","12345","07032529431","What Is 2+2 ?","4");
INSERT INTO members (fullName,userName,accessKey,phoneNumber,keyQuestion,keyAnswer) VALUES
("Idris Suliman","mando","12345678910","07077777777","What Is 2+2 ?","4");
INSERT INTO members (fullName,userName,accessKey,phoneNumber,keyQuestion,keyAnswer) VALUES
("Idris Oladimeji","oladimeji","12345678910","07088888888","What Is 2+2 ?","4");
INSERT INTO members (fullName,userName,accessKey,phoneNumber,keyQuestion,keyAnswer) VALUES
("James Moses","compiler","12345678910","070999999","What Is 2+2 ?","4");

--
-- CREATING TABLE FOR FRIENDS
--

CREATE TABLE IF NOT EXISTS `buddies` (
  `id` int(50) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `requesterId` int(50) NOT NULL,
  `accepterId` int(50) NOT NULL,
  `status` int(2) NOT NULL
);

--
-- CREATING TABLE FOR FEEDS POST
--

CREATE TABLE IF NOT EXISTS `postFeed` (
  `feedId` int(50) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `feedType` varchar(10) NOT NULL,
  `posterId` int(50) NOT NULL,
  `posterUsername` varchar(25) NOT NULL,
  `posterPic` varchar(100) NOT NULL,
  `feedLike` int(10) NOT NULL,
  `feedComment` int(10) NOT NULL,
  `feedText` text NOT NULL,
  `feedUrl` varchar(100) NOT NULL,
  `datePosted` datetime NOT NULL
);


--
-- CREATING TABLE FOR FEEDS LIKES
--

CREATE TABLE IF NOT EXISTS `feedLikes` (
  `id` int(50) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `postFeedId` int(50) NOT NULL,
  `loverId` int(50) NOT NULL,
  `loverUsername` varchar(25) NOT NULL,
  `profilePic` varchar(100) NOT NULL
);

--
-- CREATING TABLE FOR FEEDS COMMENTS
--

CREATE TABLE IF NOT EXISTS `feedComment` (
  `id` int(50) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `postFeedId` int(50) NOT NULL,
  `commenterId` int(50) NOT NULL,
  `commenterUsername` varchar(25) NOT NULL,
  `comment` text NOT NULL,
  `datePosted` datetime NOT NULL,
  `profilePic` varchar(100) NOT NULL
);

--
-- BUDDY CHAT LIST 
--

CREATE TABLE IF NOT EXISTS `buddyChatList` (
  `id` int(50) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `firstBuddy` varchar(16) NOT NULL,
  `secondBuddy` varchar(32) NOT NULL,
  `lastActivity` datetime NOT NULL
);

--
-- BUDDY CHAT Message 
--

CREATE TABLE IF NOT EXISTS `buddyChat` (
  `id` int(50) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `senderId` varchar(16) NOT NULL,
  `receiverId` varchar(32) NOT NULL,
  `message` varchar(250) NOT NULL,
  `datePosted` datetime NOT NULL,
  `status` int(2) NOT NULL
);


--
-- USER Report 
--
CREATE TABLE IF NOT EXISTS `report` (
  `id` int(50) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `fullName` varchar(50) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `message` varchar(250) NOT NULL,
  `datePosted` datetime NOT NULL
);

--
-- Handout Department
--

CREATE TABLE IF NOT EXISTS `deptList` (
  `id` int(100) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `deptName` varchar(50) NOT NULL
);


--
-- Handout List
--

CREATE TABLE IF NOT EXISTS `handoutList` (
  `id` int(100) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `deptId` int(100) NOT NULL,
  `course` varchar(100) NOT NULL,
  `level` char(5) NOT NULL,
  `dir` varchar(100) NOT NULL
);

