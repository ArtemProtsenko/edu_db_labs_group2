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
