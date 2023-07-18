using AdminPanelApi.Models;
using AdminPanelApi.Models.Exist;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AdminPanelApi.EntityConfiguration
{
    public class BenefitsConfiguration : IEntityTypeConfiguration<Benefit>
    {
        public void Configure(EntityTypeBuilder<Benefit> builder)
        {
            builder.HasKey(b => b.Id);

            builder.Property(b => b.Active).IsRequired().HasDefaultValue(false);
        }
    }
}
