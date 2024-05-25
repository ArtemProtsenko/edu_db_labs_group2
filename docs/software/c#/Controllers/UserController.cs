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
