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
