using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using AdminPanelApi.Models.Office;
namespace AdminPanelApi.Models
{
    public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            //   builder.Ignore(e => e.PasswordStored);
        }
    }
    public class ApplicationUser : IdentityUser
    {
        public virtual string PasswordStored
        {
            get;
            set;
        }
        [NotMapped]
        public string Password
        {
            get { return Encryption.DecryptString(PasswordStored); }
            set { PasswordStored = Encryption.EnryptString(value); }
        }
    }
}
