using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace AdminPanelApi.Models.Office
{
    public class UserClientConfiguration : IEntityTypeConfiguration<UserClients>
    {
        public void Configure(EntityTypeBuilder<UserClients> builder)
        {
            builder.HasKey(b => b.Id);
            // builder.Property(b => b.Active).IsRequired().HasDefaultValue(false);
            builder.HasOne(b => b.Client).WithMany(b => b.UserClients).HasForeignKey(b => b.ClientId);
            builder.HasOne(b => b.Client).WithMany(b => b.UserClients).HasForeignKey(b => b.ClientId);
        }
    }
    public class UserClients
    {
        public int Id { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public int ClientId { get; set; }
        public Client Client { get; set; }
    }
}
