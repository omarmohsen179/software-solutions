using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminPanelApi.Models
{
    public class ContactUs
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Reason { get; set; }
        public DateTime Date { get; set; }

        public string Message { get; set; }

        public bool Active { get; set; }
        public int Rank { get; set; }
    }
}
