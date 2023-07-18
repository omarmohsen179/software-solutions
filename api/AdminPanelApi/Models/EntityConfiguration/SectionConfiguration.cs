﻿using System;
using AdminPanelApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AdminPanelApi.EntityConfiguration
{
    public class SectionConfiguration : IEntityTypeConfiguration<Section>
    {
        public void Configure(EntityTypeBuilder<Section> builder)
        {
            builder.HasKey(b => b.Id);
          //  builder.Property(b => b.SectionName).IsRequired();
            builder.HasOne(b => b.Image).WithOne(b => b.Section).HasForeignKey<SectionImages>(e => e.SectionId);
        }
    }
}
