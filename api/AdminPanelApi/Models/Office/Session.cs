using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using Newtonsoft.Json;

namespace AdminPanelApi.Models.Office
{
    public class SessionConfiguration : IEntityTypeConfiguration<Session>
    {
        public void Configure(EntityTypeBuilder<Session> builder)
        {
            builder.HasKey(b => b.Id);
            // builder.Property(b => b.Active).IsRequired().HasDefaultValue(false);
            // builder.HasMany(b => b.Records).WithOne(b => b.Branch).HasForeignKey(b => b.BranchId);
        }
    }
    public class Session
    {
        public int Id { get; set; }
        public int CaseId { get; set; }
        [JsonIgnore]
        public Case Case { get; set; }
        public string Result { get; set; }
        public string Note { get; set; }
        public DateTime Date { get; set; }
        public DateTime SessionDate { get; set; }

    }
}
