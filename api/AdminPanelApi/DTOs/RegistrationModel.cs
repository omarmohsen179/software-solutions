using System.Collections.Generic;

namespace AdminPanelApi.DTOs
{
    public class RegisterModel
    {

        public string Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public List<string> Roles { get; set; }

    }
}
