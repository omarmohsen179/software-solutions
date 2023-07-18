using AdminPanelApi.Models;

namespace AdminPanelApi.Core.Manager
{
    public class HeaderManager : Repository<Header, AppDbContext>
    {
        public HeaderManager(AppDbContext context) : base(context)
        {

        }
    }
}
