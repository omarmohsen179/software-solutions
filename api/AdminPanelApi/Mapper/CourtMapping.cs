using AdminPanelApi.DTOs.Office;
using AdminPanelApi.Models.Office;
using AutoMapper;

namespace OrderManagment.MappingProfiles
{
    public class CourtMapping : Profile
    {
        public CourtMapping()
        {
            CreateMap<Court, CourtDto>().ReverseMap();
        }

    }
}
