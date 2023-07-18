using System;
using System.Collections.Generic;
using AdminPanelApi.Models.Office;

namespace AdminPanelApi.DTOs.Office
{
    public class CaseDto : Case
    {
      public ECharacteristic OtherSideCharacteristic { get; set; }
    }
}
