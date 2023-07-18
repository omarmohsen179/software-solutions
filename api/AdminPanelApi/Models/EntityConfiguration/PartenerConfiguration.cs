using System;
using AdminPanelApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AdminPanelApi.EntityConfiguration
{
    public class PartenerConfiguration : IEntityTypeConfiguration<Partener>
    {
        public void Configure(EntityTypeBuilder<Partener> builder)
        {
            builder.HasKey(b => b.Id);

            builder.Property(b => b.Active).IsRequired().HasDefaultValue(false);
        }
    }
}
