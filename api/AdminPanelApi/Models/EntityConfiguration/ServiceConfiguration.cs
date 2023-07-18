using AdminPanelApi.Models;
using AdminPanelApi.Models.Exist;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AdminPanelApi.EntityConfiguration
{
    public class ServiceConfiguration : IEntityTypeConfiguration<Service>
    {
        public void Configure(EntityTypeBuilder<Service> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Title).IsRequired();
            builder.Property(b => b.TitleEn).IsRequired();
            builder.Property(b => b.Active).IsRequired().HasDefaultValue(false);
        }
    }
}
