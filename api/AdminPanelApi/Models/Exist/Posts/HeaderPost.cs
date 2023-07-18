using AdminPanelApi.Models;
using AdminPanelApi.Models.Exist;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace AdminPanelApi.Models.Exist.Posts
{
    public class HeaderPostConfiguration : IEntityTypeConfiguration<HeaderPost>
    {
        public void Configure(EntityTypeBuilder<HeaderPost> builder)
        {

            builder.HasKey(b => b.Id);
          //  builder.HasOne(b => b.Header).WithOne(builder => builder.HeaderPost).HasForeignKey<Header>(b => b.TempPostId);
        }
    }
    public class HeaderPost
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public Post Post { get; set; }
        public int HeaderId { get; set; }
        public Header Header { get; set; }
    }
}
