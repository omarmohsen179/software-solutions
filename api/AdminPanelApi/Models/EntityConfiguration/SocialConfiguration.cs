using AdminPanelApi.Models;
using AdminPanelApi.Models.Exist;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace AdminPanelApi.EntityConfiguration
{
    public class SocialConfiguration : IEntityTypeConfiguration<Social>
    {
        public void Configure(EntityTypeBuilder<Social> builder)
        {
            builder.HasKey(builder => builder.Id);
            //builder.HasOne(b => b.Section).WithOne(b => b.Image).HasForeignKey<Section>(e=>e.Id);

        }
    }
}
