using AdminPanelApi.Core.Manager;
using AdminPanelApi.Models;

namespace AdminPanelApi.Core
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext context;

        public UnitOfWork(AppDbContext context)
        {
            this.context = context;
        }
        private HeaderManager headerManager;

        public HeaderManager HeaderManager
        {

            get
            {
                if (headerManager == null)
                {
                    headerManager = new HeaderManager(context);
                }
                return headerManager;
            }

        }
        private BenefitManager benefitsManager;

        public BenefitManager BenefitsManager
        {

            get
            {
                if (benefitsManager == null)
                {
                    benefitsManager = new BenefitManager(context);
                }
                return benefitsManager;
            }

        }
        private MemberManager memberManager;

        public MemberManager MemberManager
        {

            get
            {
                if (memberManager == null)
                {
                    memberManager = new MemberManager(context);
                }
                return memberManager;
            }

        }

        private PartenerManager partenerManager;

        public PartenerManager PartenerManager
        {

            get
            {
                if (partenerManager == null)
                {
                    partenerManager = new PartenerManager(context);
                }
                return partenerManager;
            }

        }
        private ServiceManager serviceManager;

        public ServiceManager ServiceManager
        {

            get
            {
                if (serviceManager == null)
                {
                    serviceManager = new ServiceManager(context);
                }
                return serviceManager;
            }

        }
        private BranchManager branchManager;

        public BranchManager BranchManager
        {

            get
            {
                if (branchManager == null)
                {
                    branchManager = new BranchManager(context);
                }
                return branchManager;
            }

        }
        private ContactUsManager contactUsManager;

        public ContactUsManager ContactUsManager
        {

            get
            {
                if (contactUsManager == null)
                {
                    contactUsManager = new ContactUsManager(context);
                }
                return contactUsManager;
            }

        }
        private SocialManager socialManager;

        public SocialManager SocialManager
        {

            get
            {
                if (socialManager == null)
                {
                    socialManager = new SocialManager(context);
                }
                return socialManager;
            }

        }
        private QuestionManager questionManager;

        public QuestionManager QuestionManager
        {

            get
            {
                if (questionManager == null)
                {
                    questionManager = new QuestionManager(context);
                }
                return questionManager;
            }

        }
        private NumberManager numberManager;

        public NumberManager NumberManager
        {

            get
            {
                if (numberManager == null)
                {
                    numberManager = new NumberManager(context);
                }
                return numberManager;
            }

        }
        private SectionImagesManager sectionImagesManager;

        public SectionImagesManager SectionImagesManager
        {

            get
            {
                if (sectionImagesManager == null)
                {
                    sectionImagesManager = new SectionImagesManager(context);
                }
                return sectionImagesManager;
            }


        }
        private SectionManager sectionManager;

        public SectionManager SectionManager
        {

            get
            {
                if (sectionManager == null)
                {
                    sectionManager = new SectionManager(context);
                }
                return sectionManager;
            }

        }
        private StepsManager stepsManager;

        public StepsManager StepsManager
        {

            get
            {
                if (stepsManager == null)
                {
                    stepsManager = new StepsManager(context);
                }
                return stepsManager;
            }

        }
        private TextManager textManager;

        public TextManager TextManager
        {

            get
            {
                if (textManager == null)
                {
                    textManager = new TextManager(context);
                }
                return textManager;
            }

        }

        private HeaderPostManager headerPostManager;

        public HeaderPostManager HeaderPostManager
        {

            get
            {
                if (headerPostManager == null)
                {
                    headerPostManager = new HeaderPostManager(context);
                }
                return headerPostManager;
            }

        }

        private PostManager postManager;

        public PostManager PostManager
        {

            get
            {
                if (postManager == null)
                {
                    postManager = new PostManager(context);
                }
                return postManager;
            }

        }
    }
}
