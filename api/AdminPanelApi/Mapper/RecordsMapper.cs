using AdminPanelApi.DTOs.Office;
using AdminPanelApi.Models.Office;
using AutoMapper;

namespace OrderManagment.MappingProfiles
{
    public class RecordsMapper : Profile
    {
        public RecordsMapper()
        {
            CreateMap<Record, RecordDto>().ReverseMap();
        }

    }
}
