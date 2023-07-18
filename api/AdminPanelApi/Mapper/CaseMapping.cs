using AdminPanelApi.DTOs.Office;
using AdminPanelApi.Models.Office;
using AutoMapper;
using System.Collections.Generic;

namespace OrderManagment.MappingProfiles
{
    public class CaseMapping : Profile
    {
        public CaseMapping()
        {
            CreateMap<Case, CaseDto>().ForMember(des => des.OtherSideCharacteristic,
                op => op.MapFrom(src => src.ClientCharacteristic == ECharacteristic.Defendant ? ECharacteristic.Plaintiff : ECharacteristic.Defendant));
               // .ForMember(des => des.CircuitAndInvitationNumber,
               // op => op.MapFrom(src => src.InvitationNumber.ToString()+" , " + src.InvitationCircuitNumber ))
               //.ForMember(des => des.CircuitAndAppealNumber,
               // op => op.MapFrom(src => src.CircuitAndInvitationNumber.ToString() + " , " + src.AppealCircuitNumber));
        }

    }
}
