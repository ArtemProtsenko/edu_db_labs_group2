# Реалізація інформаційного та програмного забезпечення


## SQL-скрипт для створення на початкового наповнення бази даних

```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mcas
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mcas` ;

-- -----------------------------------------------------
-- Schema mcas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mcas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mcas` ;

-- -----------------------------------------------------
-- Table `mcas`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`role` ;

CREATE TABLE IF NOT EXISTS `mcas`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `nameIndex` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`user` ;

CREATE TABLE IF NOT EXISTS `mcas`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `roleId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  INDEX `roleId` (`roleId` ASC) VISIBLE,
  CONSTRAINT `user_ibfk_1`
    FOREIGN KEY (`roleId`)
    REFERENCES `mcas`.`role` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`action`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`action` ;

CREATE TABLE IF NOT EXISTS `mcas`.`action` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `action_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `mcas`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`publicrequest`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`publicrequest` ;

CREATE TABLE IF NOT EXISTS `mcas`.`publicrequest` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `actionId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `actionId` (`actionId` ASC) VISIBLE,
  CONSTRAINT `publicrequest_ibfk_1`
    FOREIGN KEY (`actionId`)
    REFERENCES `mcas`.`action` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`mediadata`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`mediadata` ;

CREATE TABLE IF NOT EXISTS `mcas`.`mediadata` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `fileType` TEXT NOT NULL,
  `requestId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `requestId` (`requestId` ASC) VISIBLE,
  CONSTRAINT `mediadata_ibfk_1`
    FOREIGN KEY (`requestId`)
    REFERENCES `mcas`.`publicrequest` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`permision`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`permision` ;

CREATE TABLE IF NOT EXISTS `mcas`.`permision` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`permisionhasrole`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`permisionhasrole` ;

CREATE TABLE IF NOT EXISTS `mcas`.`permisionhasrole` (
  `permisionId` INT NOT NULL,
  `roleName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`permisionId`, `roleName`),
  INDEX `roleName` (`roleName` ASC) VISIBLE,
  CONSTRAINT `permisionhasrole_ibfk_1`
    FOREIGN KEY (`permisionId`)
    REFERENCES `mcas`.`permision` (`id`),
  CONSTRAINT `permisionhasrole_ibfk_2`
    FOREIGN KEY (`roleName`)
    REFERENCES `mcas`.`role` (`name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```

## RESTfull сервіс для управління даними

### appsettings.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Port=3306;Database=mcas;Uid=root;Pwd=12345;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

### Program.cs
```csharp
using Microsoft.EntityFrameworkCore;
using DB.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), new MySqlServerVersion(new Version(8,0,37))));

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();
```

### Data
#### AplicationDbContext.cs
```csharp
using Microsoft.EntityFrameworkCore;
using System.Data;
using DB.Model;


namespace DB.Data
{
    public class AplicationDbContext : DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<role> Roles { get; set; }
    }
}
```

### Controllers
#### UserController
```csharp
using DB.Data;
using DB.Model;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Configuration;

namespace DB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AplicationDbContext _db;

        public UserController(AplicationDbContext db)
        {
            _db = db;
        }

        [HttpPost("Registration")]
        public async Task<IActionResult> Registration([FromBody] UserDTO regUserDto)
        {
            var user = new User(regUserDto.email, regUserDto.password);

            Random rand = new Random();

            var x = rand.Next(1, 4);

            user.roleId = x;

            var testUserEmail = _db.Users.FirstOrDefault(u => u.Email == user.Email);

            if (testUserEmail != null)
            {
                return BadRequest("User with this email already exists.");
            }

            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();

            return Ok("Registered successfully.");
        }

        [HttpGet("Get all users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = _db.Users;

            return Ok(users);
        }
    }
}
```

### Model
#### role.cs
```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DB.Model
{
    public class role
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
    }
}
```

#### User.cs
```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DB.Model
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int roleId { get; set; }
        [ForeignKey("roleId")]
        public role role_id { get; set; }
        public User(string email, string password)
        {
            this.Email = email;
            this.Password = password;
        }
    }
}
```

#### UserDTO.cs
```csharp
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace DB.Model
{
    public class UserDTO
    {
        [Required]
        public string email { get; set; }
        [Required]
        public string password { get; set; }
    }
}
```
