using AdminPanelApi.DTOs.Office;
using AdminPanelApi.Models.Office;
using AutoMapper;

namespace OrderManagment.MappingProfiles
{
    public class ClientMapping : Profile
    {
        public ClientMapping()
        {
            CreateMap<Client, ClientDto>().ReverseMap();
        }

    }
}
