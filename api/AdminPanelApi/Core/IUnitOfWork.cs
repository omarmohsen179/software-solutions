using AdminPanelApi.Core.Manager;
namespace AdminPanelApi.Core
{
    public interface IUnitOfWork
    {
        HeaderManager HeaderManager { get; }
        BenefitManager BenefitsManager { get; }
        MemberManager MemberManager { get; }
        PartenerManager PartenerManager { get; }
        ServiceManager ServiceManager { get; }
        QuestionManager QuestionManager { get; }
        BranchManager BranchManager { get; }
        ContactUsManager ContactUsManager { get; }
        SocialManager SocialManager { get; }


        NumberManager NumberManager { get; }
        SectionImagesManager SectionImagesManager { get; }
        SectionManager SectionManager { get; }
        StepsManager StepsManager { get; }
        TextManager TextManager { get; }
        HeaderPostManager HeaderPostManager { get; }
        PostManager PostManager { get; }

    }
}
