using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AdminPanelApi.Models.Office
{
    public class CourtConfiguration : IEntityTypeConfiguration<Court>
    {
        public void Configure(EntityTypeBuilder<Court> builder)
        {
            builder.HasKey(b => b.Id);
            builder.HasIndex(b => b.CourtName).IsUnique();
            builder.Property(b => b.CourtName).IsRequired();
            // builder.Property(b => b.Active).IsRequired().HasDefaultValue(false);
            builder.HasMany(b => b.Cases).WithOne(b => b.Court).HasForeignKey(b => b.CourtId);
        }
    }
    public class Court
    {
        public int Id { get; set; }
        public string CourtName { get; set; }
        public IEnumerable<Case> Cases { get; set; }
    }
}
