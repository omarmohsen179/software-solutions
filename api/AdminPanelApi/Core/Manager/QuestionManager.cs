using AdminPanelApi.Models;

namespace AdminPanelApi.Core.Manager
{
    public class QuestionManager: Repository<Question, AppDbContext>
    {
        public QuestionManager(AppDbContext context) : base(context)
        {

        }
    }
}
