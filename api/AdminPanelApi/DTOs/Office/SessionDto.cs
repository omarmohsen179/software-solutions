using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using Newtonsoft.Json;

namespace AdminPanelApi.DTOs.Office
{
    public class SessionDto
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public int CaseId { get; set; }
        public string Result { get; set; }
        public string Note { get; set; }
        public DateTime Date { get; set; }
        public DateTime SessionDate { get; set; }
        public string ClientName { get; set; }
        public string OtherSideName { get; set; }

    }
}
