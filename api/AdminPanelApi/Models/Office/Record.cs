using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using Newtonsoft.Json;

namespace AdminPanelApi.Models.Office
{
    public class RecordConfiguration : IEntityTypeConfiguration<Record>
    {
        public void Configure(EntityTypeBuilder<Record> builder)
        {
            builder.HasKey(b => b.Id);
            // builder.Property(b => b.Active).IsRequired().HasDefaultValue(false);
            // builder.HasMany(b => b.Records).WithOne(b => b.Branch).HasForeignKey(b => b.BranchId);
        }
    }
    public class Record
    {
        public int Id { get; set; }
        public int CaseId { get; set; }
        [JsonIgnore]
        public Case Case { get; set; }
        public string RecordResult { get; set; }
        public string AdvertisingNo { get; set; }
        public DateTime Date { get; set; }
        public DateTime SessionDate { get; set; }
        public string Note { get; set; }
    }
}
