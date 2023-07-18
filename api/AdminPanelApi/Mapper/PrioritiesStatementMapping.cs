using AdminPanelApi.DTOs.Office;
using AdminPanelApi.Models.Office;
using AutoMapper;

namespace OrderManagment.MappingProfiles
{
    public class PrioritiesStatementMapping : Profile
    {
        public PrioritiesStatementMapping()
        {
            CreateMap<PrioritiesStatement, PerioriyStatmentDto>().ReverseMap();
        }

    }
}
