using AdminPanelApi.Models;
using AdminPanelApi.Models.Exist;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace AdminPanelApi.Models.Exist.Posts
{
    public class PostConfiguration : IEntityTypeConfiguration<Post>
    {
        public void Configure(EntityTypeBuilder<Post> builder)
        {

            builder.HasKey(b => b.Id);
            builder.HasOne(b => b.HeaderPost).WithOne(builder => builder.Post).HasForeignKey<HeaderPost>(b => b.PostId);
            builder.Property(b => b.Active).IsRequired().HasDefaultValue(false);
            builder.Property(b => b.IsArticle).IsRequired().HasDefaultValue(false);
         builder.Property(b => b.Rank).IsRequired().HasDefaultValue(0);
        }
    }
    public class Post
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string TitleEn { get; set; }
        public string SubTitle { get; set; }
        public string SubTitleEn { get; set; }
        public string OuterDescription { get; set; }
        public string OuterDescriptionEn { get; set; }
        public string Description { get; set; }
        public string DescriptionEn { get; set; }
        public string ImagePath { get; set; }
        public int Rank { get; set; }
        public bool IsArticle { get; set; }
        public bool Active { get; set; }
        [JsonIgnore]
        public HeaderPost HeaderPost { get; set; }
    }
}
