using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace AdminPanelApi.Models.Office
{
    public class ClientConfiguration : IEntityTypeConfiguration<Client>
    {
        public void Configure(EntityTypeBuilder<Client> builder)
        {
            builder.HasKey(b => b.Id);
            builder.HasIndex(b => b.ClientName).IsUnique();
            builder.Property(b => b.ClientName).IsRequired();
            // builder.Property(b => b.Active).IsRequired().HasDefaultValue(false);
            builder.HasMany(b => b.Cases).WithOne(b => b.Client).HasForeignKey(b => b.ClientId);
            builder.HasMany(b => b.PrioritiesStatements).WithOne(b => b.Client).HasForeignKey(b => b.ClientId);
        }
    }
    public class Client
    {
        public int Id { get; set; }
        public string ClientName { get; set; }
        [JsonIgnore]
        public IEnumerable<Case> Cases { get; set; }
        [JsonIgnore]
        public IEnumerable<PrioritiesStatement> PrioritiesStatements { get; set; }
        [JsonIgnore]
        public IEnumerable<UserClients> UserClients { get; set; }
    }
}
