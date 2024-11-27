START TRANSACTION;

-- Set timezone to UTC
SET time_zone = "+00:00";

-- Create table student if not exists
CREATE TABLE IF NOT EXISTS `students` (
  `code` int NOT NULL,
  `last_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `note1` float DEFAULT '0',
  `note2` float DEFAULT '0',
  `note3` float DEFAULT '0',
  `average` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create trigger to calculate average before insert or update 
DELIMITER $$
CREATE TRIGGER `calculate_average` BEFORE INSERT ON `students` FOR EACH ROW BEGIN
  SET NEW.average = (NEW.note1 + NEW.note2 + NEW.note3) / 3;
END
$$
DELIMITER ;

-- Create trigger to update average after update
DELIMITER $$
CREATE TRIGGER `update_average` BEFORE UPDATE ON `students` FOR EACH ROW BEGIN
  SET NEW.average = (NEW.note1 + NEW.note2 + NEW.note3) / 3;
END
$$
DELIMITER ;

COMMIT;