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
  `idproviders` VARCHAR(255) NOT NULL,
  `service` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `age` VARCHAR(255) NOT NULL,
  `experience` VARCHAR(255) NOT NULL,
  `adresse` VARCHAR(255) NOT NULL,
  `price` INT NOT NULL,
  `image` BLOB NOT NULL,
  `aboutMe` LONGTEXT NOT NULL,
  `phoneNumber` INT NOT NULL,
  `confirmed` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`idproviders`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kraken`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kraken`.`users` (
  `iduser` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `FirstName` VARCHAR(255) NOT NULL,
  `LastName` VARCHAR(255) NOT NULL,
  `age` INT NOT NULL,
  `image` BLOB NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  PRIMARY KEY (`iduser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kraken`.`booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kraken`.`booking` (
  `idbooking` INT NOT NULL AUTO_INCREMENT,
  `start_date` TIMESTAMP NOT NULL,
  `status` ENUM('pending', 'confirmed', 'cancelled') NOT NULL,
  `users_iduser` VARCHAR(255) NOT NULL,
  `providers_idproviders` VARCHAR(255) NOT NULL,
  `adresse` VARCHAR(255) NOT NULL,
  `workingHours` INT NOT NULL,
  `price` INT NOT NULL,
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
-- Table `kraken`.`bookmarks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kraken`.`bookmarks` (
  `providers_idproviders` VARCHAR(255) NOT NULL,
  `users_iduser` VARCHAR(255) NOT NULL,
  INDEX `fk_followers_providers1_idx` (`providers_idproviders` ASC) VISIBLE,
  INDEX `fk_bookmarks_users1_idx` (`users_iduser` ASC) VISIBLE,
  CONSTRAINT `fk_bookmarks_users1`
    FOREIGN KEY (`users_iduser`)
    REFERENCES `kraken`.`users` (`iduser`),
  CONSTRAINT `fk_followers_providers1`
    FOREIGN KEY (`providers_idproviders`)
    REFERENCES `kraken`.`providers` (`idproviders`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kraken`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kraken`.`images` (
  `idimages` INT NOT NULL AUTO_INCREMENT,
  `data` BLOB NOT NULL,
  `providers_idproviders` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idimages`),
  INDEX `fk_images_providers1_idx` (`providers_idproviders` ASC) VISIBLE,
  CONSTRAINT `fk_images_providers1`
    FOREIGN KEY (`providers_idproviders`)
    REFERENCES `kraken`.`providers` (`idproviders`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kraken`.`reviews`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kraken`.`reviews` (
  `idreview` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `users_iduser` VARCHAR(255) NOT NULL,
  `providers_idproviders` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idreview`),
  INDEX `fk_comments_users1_idx` (`users_iduser` ASC) VISIBLE,
  INDEX `fk_reviews_providers1_idx` (`providers_idproviders` ASC) VISIBLE,
  CONSTRAINT `fk_comments_users1`
    FOREIGN KEY (`users_iduser`)
    REFERENCES `kraken`.`users` (`iduser`),
  CONSTRAINT `fk_reviews_providers1`
    FOREIGN KEY (`providers_idproviders`)
    REFERENCES `kraken`.`providers` (`idproviders`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kraken`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kraken`.`likes` (
  `idlikes` INT NOT NULL AUTO_INCREMENT,
  `users_iduser` VARCHAR(255) NOT NULL,
  `comments_idcomments` INT NOT NULL,
  `reviews_idreview` INT NOT NULL,
  PRIMARY KEY (`idlikes`, `comments_idcomments`),
  INDEX `fk_likes_users1_idx` (`users_iduser` ASC) VISIBLE,
  INDEX `fk_likes_reviews1_idx` (`reviews_idreview` ASC) VISIBLE,
  CONSTRAINT `fk_likes_reviews1`
    FOREIGN KEY (`reviews_idreview`)
    REFERENCES `kraken`.`reviews` (`idreview`),
  CONSTRAINT `fk_likes_users1`
    FOREIGN KEY (`users_iduser`)
    REFERENCES `kraken`.`users` (`iduser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kraken`.`rating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kraken`.`rating` (
  `idRating` INT NOT NULL AUTO_INCREMENT,
  `users_iduser` VARCHAR(255) NOT NULL,
  `providers_idproviders` VARCHAR(255) NOT NULL,
  `rate` INT NOT NULL,
  PRIMARY KEY (`idRating`),
  INDEX `fk_rating_users1_idx` (`users_iduser` ASC) VISIBLE,
  INDEX `fk_rating_providers1_idx` (`providers_idproviders` ASC) VISIBLE,
  CONSTRAINT `fk_rating_providers1`
    FOREIGN KEY (`providers_idproviders`)
    REFERENCES `kraken`.`providers` (`idproviders`),
  CONSTRAINT `fk_rating_users1`
    FOREIGN KEY (`users_iduser`)
    REFERENCES `kraken`.`users` (`iduser`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `kraken`.`ratings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kraken`.`ratings` (
  `idRating` INT NOT NULL AUTO_INCREMENT,
  `users_iduser` VARCHAR(255) NOT NULL,
  `providers_idproviders` VARCHAR(255) NOT NULL,
  `rate` INT NOT NULL,
  PRIMARY KEY (`idRating`),
  INDEX `users_iduser` (`users_iduser` ASC) VISIBLE,
  INDEX `providers_idproviders` (`providers_idproviders` ASC) VISIBLE,
  CONSTRAINT `ratings_ibfk_1`
    FOREIGN KEY (`users_iduser`)
    REFERENCES `kraken`.`users` (`iduser`)
    ON UPDATE CASCADE,
  CONSTRAINT `ratings_ibfk_2`
    FOREIGN KEY (`providers_idproviders`)
    REFERENCES `kraken`.`providers` (`idproviders`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 30
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
