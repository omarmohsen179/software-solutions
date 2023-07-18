using AdminPanelApi.Models;
using AdminPanelApi.Models.Exist.Posts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AdminPanelApi.EntityConfiguration
{
    public class HeaderConfiguration : IEntityTypeConfiguration<Header>
    {
        public void Configure(EntityTypeBuilder<Header> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Title).IsRequired();
            builder.Property(b => b.TitleEn).IsRequired();
            builder.Property(b => b.Active).IsRequired().HasDefaultValue(false);
            builder.HasOne(b => b.HeaderPost).WithOne(builder => builder.Header).HasForeignKey<HeaderPost>(b => b.HeaderId);
        
        }
    }
}
