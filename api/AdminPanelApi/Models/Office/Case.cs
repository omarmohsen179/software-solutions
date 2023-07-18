using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace AdminPanelApi.Models.Office
{
    public class CaseConfiguration : IEntityTypeConfiguration<Case>
    {
        public void Configure(EntityTypeBuilder<Case> builder)
        {
            builder.HasKey(b => b.Id);

            // builder.Property(b => b.Active).IsRequired().HasDefaultValue(false);
            builder.HasMany(b => b.Records).WithOne(b => b.Case).HasForeignKey(b => b.CaseId);
            builder.HasMany(b => b.Sessions).WithOne(b => b.Case).HasForeignKey(b => b.CaseId);
        }
    }
    public enum ECharacteristic
    {

        Plaintiff,
        Defendant
    }
    public class Case 
    {
        public int Id { get; set; }
        public string CircuitAndAppealNumber { get; set; }
        public string CircuitAndInvitationNumber { get; set; }
        public string ClientName { get; set; }
        public ECharacteristic ClientCharacteristic { get; set; }
        public string OtherSideName { get; set; }
        public string Subject { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public string Result { get; set; }
        public string Note { get; set; }

        public int ClientId { get; set; }
        [JsonIgnore]
        public Client Client { get; set; }
        public int CourtId { get; set; }
        [JsonIgnore]
        public Court Court { get; set; }
        [JsonIgnore]
        public IEnumerable<Record> Records { get; set; }
        [JsonIgnore]
        public IEnumerable<Session> Sessions { get; set; }
    }
}
