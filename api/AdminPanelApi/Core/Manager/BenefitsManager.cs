using AdminPanelApi.Models;
using AdminPanelApi.Models.Exist;

namespace AdminPanelApi.Core.Manager
{
    public class BenefitManager : Repository<Benefit, AppDbContext>
    {
        public BenefitManager(AppDbContext context) : base(context)
        {

        }
    }
}
