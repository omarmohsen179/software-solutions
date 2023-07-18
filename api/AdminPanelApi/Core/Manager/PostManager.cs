using AdminPanelApi.Models;
using AdminPanelApi.Models.Exist.Posts;

namespace AdminPanelApi.Core.Manager
{
    public class PostManager
: Repository<Post, AppDbContext>
    {
        public PostManager(AppDbContext context) : base(context)
        {

        }
    }
}
