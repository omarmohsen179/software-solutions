using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using Newtonsoft.Json;

namespace AdminPanelApi.Models.Office
{
    public class PerioriyStatmentConfiguration : IEntityTypeConfiguration<PrioritiesStatement>
    {
        public void Configure(EntityTypeBuilder<PrioritiesStatement> builder)
        {
            builder.HasKey(b => b.Id);
            // builder.Property(b => b.Active).IsRequired().HasDefaultValue(false);
            // builder.HasMany(b => b.Records).WithOne(b => b.Branch).HasForeignKey(b => b.BranchId);
        }
    }
    public class PrioritiesStatement
    {

        public int Id { get; set; }
        public string PriorityStatementName { get; set; }
        public string RequestAgainst { get; set; }
        public DateTime ReceiveDate { get; set; }
        public DateTime ProvidingDate { get; set; }
        public DateTime RequestDate { get; set; }
        public string Documents { get; set; }
        public string UnlocatedDocuments { get; set; }
        public string Result { get; set; }
        public string Note { get; set; }
        public int ClientId { get; set; }
        [JsonIgnore]
        public Client Client { get; set; }
    }
}
