using AdminPanelApi.Models;
using AdminPanelApi.Models.Exist;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AdminPanelApi.EntityConfiguration
{
    public class QuestionConfiguration : IEntityTypeConfiguration<Question>
    {
        public void Configure(EntityTypeBuilder<Question> builder)
        {
            builder.HasKey(b => b.Id);
        }
    }
}
