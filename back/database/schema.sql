-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema kraken
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema kraken
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kraken` DEFAULT CHARACTER SET utf8mb3 ;
USE `kraken` ;

-- -----------------------------------------------------
-- Table `kraken`.`providers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kraken`.`providers` (
  `idproviders` INT NOT NULL AUTO_INCREMENT,
  `service` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `FirstName` VARCHAR(255) NOT NULL,
  `LastName` VARCHAR(255) NOT NULL,
  `Age` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `experience` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `region` VARCHAR(255) NOT NULL,
  `price` INT NOT NULL,
  PRIMARY KEY (`idproviders`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kraken`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kraken`.`users` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `FirstName` VARCHAR(255) NOT NULL,
  `LastName` VARCHAR(255) NOT NULL,
  `Age` INT NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `longitude` INT NOT NULL,
  `latitude` INT NOT NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kraken`.`booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kraken`.`booking` (
  `idbooking` INT NOT NULL AUTO_INCREMENT,
  `start_date` TIMESTAMP NOT NULL,
  `end_date` TIMESTAMP NOT NULL,
  `status` ENUM('pending', 'confirmed', 'cancelled') NOT NULL,
  `rating` INT NOT NULL,
  `users_iduser` INT NOT NULL,
  `providers_idproviders` INT NOT NULL,
  PRIMARY KEY (`idbooking`),
  INDEX `fk_booking_users1_idx` (`users_iduser` ASC) VISIBLE,
  INDEX `fk_booking_providers1_idx` (`providers_idproviders` ASC) VISIBLE,
  CONSTRAINT `fk_booking_providers1`
    FOREIGN KEY (`providers_idproviders`)
    REFERENCES `kraken`.`providers` (`idproviders`),
  CONSTRAINT `fk_booking_users1`
    FOREIGN KEY (`users_iduser`)
    REFERENCES `kraken`.`users` (`iduser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kraken`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kraken`.`posts` (
  `idposts` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `Bookmark` INT NOT NULL,
  `providers_idproviders` INT NOT NULL,
  PRIMARY KEY (`idposts`),
  INDEX `fk_posts_normalUser1_idx` (`Bookmark` ASC) VISIBLE,
  INDEX `fk_posts_providers1_idx` (`providers_idproviders` ASC) VISIBLE,
  CONSTRAINT `fk_posts_normalUser1`
    FOREIGN KEY (`Bookmark`)
    REFERENCES `kraken`.`users` (`iduser`),
  CONSTRAINT `fk_posts_providers1`
    FOREIGN KEY (`providers_idproviders`)
    REFERENCES `kraken`.`providers` (`idproviders`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kraken`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kraken`.`comments` (
  `idcomments` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `users_iduser` INT NOT NULL,
  `posts_idposts` INT NOT NULL,
  PRIMARY KEY (`idcomments`),
  INDEX `fk_comments_users1_idx` (`users_iduser` ASC) VISIBLE,
  INDEX `fk_comments_posts1_idx` (`posts_idposts` ASC) VISIBLE,
  CONSTRAINT `fk_comments_posts1`
    FOREIGN KEY (`posts_idposts`)
    REFERENCES `kraken`.`posts` (`idposts`),
  CONSTRAINT `fk_comments_users1`
    FOREIGN KEY (`users_iduser`)
    REFERENCES `kraken`.`users` (`iduser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kraken`.`followers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kraken`.`followers` (
  `users_iduser` INT NOT NULL,
  `providers_idproviders` INT NOT NULL,
  PRIMARY KEY (`users_iduser`, `providers_idproviders`),
  INDEX `fk_users_has_providers_providers1_idx` (`providers_idproviders` ASC) VISIBLE,
  INDEX `fk_users_has_providers_users1_idx` (`users_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_providers_providers1`
    FOREIGN KEY (`providers_idproviders`)
    REFERENCES `kraken`.`providers` (`idproviders`),
  CONSTRAINT `fk_users_has_providers_users1`
    FOREIGN KEY (`users_iduser`)
    REFERENCES `kraken`.`users` (`iduser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kraken`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kraken`.`images` (
  `idimages` INT NOT NULL AUTO_INCREMENT,
  `data` LONGBLOB NULL DEFAULT NULL,
  `posts_idposts` INT NOT NULL,
  PRIMARY KEY (`idimages`),
  INDEX `fk_images_posts1_idx` (`posts_idposts` ASC) VISIBLE,
  CONSTRAINT `fk_images_posts1`
    FOREIGN KEY (`posts_idposts`)
    REFERENCES `kraken`.`posts` (`idposts`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kraken`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kraken`.`likes` (
  `idlikes` INT NOT NULL AUTO_INCREMENT,
  `users_iduser` INT NOT NULL,
  `posts_idposts` INT NOT NULL,
  PRIMARY KEY (`idlikes`),
  INDEX `fk_likes_users1_idx` (`users_iduser` ASC) VISIBLE,
  INDEX `fk_likes_posts1_idx` (`posts_idposts` ASC) VISIBLE,
  CONSTRAINT `fk_likes_posts1`
    FOREIGN KEY (`posts_idposts`)
    REFERENCES `kraken`.`posts` (`idposts`),
  CONSTRAINT `fk_likes_users1`
    FOREIGN KEY (`users_iduser`)
    REFERENCES `kraken`.`users` (`iduser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
