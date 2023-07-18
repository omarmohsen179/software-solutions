using System;

namespace AdminPanelApi.DTOs.Office
{

    public class RecordDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string RecordResult { get; set; }
        public string AdvertisingNo { get; set; }
        public string ClientName { get; set; }
        public string OtherSideName { get; set; }
        public int CaseId { get; set; }

        public DateTime SessionDate { get; set; }
        public string Note { get; set; }    
    }
}
