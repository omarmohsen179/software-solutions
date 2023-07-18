using System;

namespace AdminPanelApi.DTOs.Office
{
    public class PerioriyStatmentDto
    {
        public int Id { get; set; }
        public string PriorityStatementName { get; set; }
        public string RequestAgainst { get; set; }
        public DateTime ReceiveDate { get; set; }
        public DateTime ProvidingDate { get; set; }
        public DateTime RequestDate { get; set; }
        public string Documents { get; set; }
        public string UnlocatedDocuments { get; set; }
        public string Result { get; set; }
        public string Note { get; set; }
        public int ClientId { get; set; }
    }
}
