using AdminPanelApi.Models;
using AdminPanelApi.Models.Exist.Posts;

namespace AdminPanelApi.Core.Manager
{
    public class HeaderPostManager
: Repository<HeaderPost, AppDbContext>
    {
        public HeaderPostManager(AppDbContext context) : base(context)
        {

        }
    }
}
