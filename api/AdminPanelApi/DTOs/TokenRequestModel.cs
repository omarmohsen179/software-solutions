﻿using System.ComponentModel.DataAnnotations;

namespace AdminPanelApi.DTOs
{
    public class TokenRequestModel
    {
        [Required]
        //       [EmailAddress]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
