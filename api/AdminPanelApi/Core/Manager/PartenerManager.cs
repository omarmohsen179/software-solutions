using AdminPanelApi.Models;


namespace AdminPanelApi.Core.Manager
{
    public class PartenerManager
: Repository<Partener, AppDbContext>  {
        public PartenerManager(AppDbContext context) : base(context)
        {

        }
    }
}
