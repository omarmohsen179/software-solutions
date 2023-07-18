using AdminPanelApi.Models;
using AdminPanelApi.Models.Exist;

namespace AdminPanelApi.Core.Manager
{
    public class SocialManager : Repository<Social, AppDbContext>
    {
        public SocialManager(AppDbContext context) : base(context)
        {

        }
    }
}
