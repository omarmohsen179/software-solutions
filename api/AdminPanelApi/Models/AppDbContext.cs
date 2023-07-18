using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AdminPanelApi.EntityConfiguration;
using AdminPanelApi.Models.Exist;
using AdminPanelApi.Models.Exist.Posts;
using AdminPanelApi.Models.Office;

namespace AdminPanelApi.Models
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            //public DbSet<Name> Name { get; set; }

        }

        public DbSet<Number> Number { get; set; }

        public DbSet<Section> Section { get; set; }
        public DbSet<SectionImages> SectionImages { get; set; }



        public DbSet<Header> Headers { get; set; }
        public DbSet<Benefit> Benefits { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Partener> Parteners { get; set; }
        public DbSet<Service> Service { get; set; }



        public DbSet<Step> Step { get; set; }
        public DbSet<Text> Text { get; set; }

        public DbSet<Question> Questions { get; set; }
        public DbSet<Branch> Branch { get; set; }

        public DbSet<ContactUs> ContactUs { get; set; }
        public DbSet<HeaderPost> HeaderPost { get; set; }
        public DbSet<Post> Posts { get; set; }
        //public DbSet<PrioritiesStatement> PerioriyStatment { get; set; }
        //public DbSet<Case> Cases { get; set; }
        //public DbSet<Record> Records { get; set; }
        //public DbSet<Client> Clients { get; set; }
        //public DbSet<Session> Sessions { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new HeaderConfiguration());
            modelBuilder.ApplyConfiguration(new BenefitsConfiguration());
            modelBuilder.ApplyConfiguration(new MemeberConfiguration());
            modelBuilder.ApplyConfiguration(new PartenerConfiguration());
            modelBuilder.ApplyConfiguration(new ServiceConfiguration());
            modelBuilder.ApplyConfiguration(new BranchConfiguration());
            modelBuilder.ApplyConfiguration(new ContactUsConfiguration());
            modelBuilder.ApplyConfiguration(new NumberConfiguration());
            modelBuilder.ApplyConfiguration(new SectionConfiguration());
            modelBuilder.ApplyConfiguration(new SectionImagesConfiguration());
            modelBuilder.ApplyConfiguration(new SocialConfiguration());
            modelBuilder.ApplyConfiguration(new TextConfiguration());
            modelBuilder.ApplyConfiguration(new HeaderPostConfiguration());
            modelBuilder.ApplyConfiguration(new PostConfiguration());

            modelBuilder.ApplyConfiguration(new ApplicationUserConfiguration());
            //modelBuilder.ApplyConfiguration(new CaseConfiguration());
            //modelBuilder.ApplyConfiguration(new ClientConfiguration());
            //modelBuilder.ApplyConfiguration(new CourtConfiguration());
            //modelBuilder.ApplyConfiguration(new PerioriyStatmentConfiguration());
            //modelBuilder.ApplyConfiguration(new RecordConfiguration());
            //modelBuilder.ApplyConfiguration(new UserClientConfiguration());
            //modelBuilder.ApplyConfiguration(new SessionConfiguration());




            modelBuilder.Entity<IdentityRole>().HasData(
     new IdentityRole() { Id = "0E50AF81-221B-43A5-9DA0-B0F2CF5A7DD2", Name = RolesHelpers.Users, ConcurrencyStamp = "5", NormalizedName = RolesHelpers.Users },
  new IdentityRole() { Id = "0E50AF81-221B-43A5-9DA0-B0F2CF5A7DL9", Name = RolesHelpers.Admin, ConcurrencyStamp = "10", NormalizedName = RolesHelpers.Admin }

);
            SeedRoles(modelBuilder);

            //modelBuilder.ApplyConfiguration(new ProductControlConfigurations());

        }

        private void SeedRoles(ModelBuilder builder)
        {




            builder.Entity<Section>().HasData(
                    new Section() { Id = 1, SectionName = "Home", Title = "Header" },
                            new Section() { Id = 2, SectionName = "Home", Title = "About Us" }
                    );

            builder.Entity<Service>().HasData(
    new Service()
    {
        Id = 1,
        TitleEn = "RPA Services",
        Title = "RPA Services",
        ImagePath = "\\Uplode\\ss1.png",
        Active = true
    }, new Service()
    {
        Id = 2,
        TitleEn = "WE Software™",
        Title = "WE Software™",
        ImagePath = "\\Uplode\\ss2.png",
        Active = true
    }, new Service()
    {
        Id = 3,
        TitleEn = "After-Sales Solutions",
        Title = "After-Sales Solutions",
        ImagePath = "\\Uplode\\ss3.png",
        Active = true
    }, new Service()
    {
        Id = 4,
        TitleEn = "Web Development",
        Title = "Web Development",
        ImagePath = "\\Uplode\\ss4.png",
        Active = true
    }
    );
            builder.Entity<Question>().HasData(new Question()
            {
                Id = 1,
                QuestionTextEn = "What we use?",
                QuestionText = "نص السؤال",
                AnswerEn = "GSA Analytics is using the latest technology and programming to provides the best solution, Machine learning, robotic process automation, Database management system.",
                Answer = "GSA Analytics is using the latest technology and programming to provides the best solution, Machine learning, robotic process automation, Database management system.",
                Active = true
            }, new Question()
            {
                Id = 2,
                QuestionTextEn = "Why to choose GSA Analytics?",
                QuestionText = "نص السؤال",
                AnswerEn = "We are a Software development team focusing on Digital transformation using Business Applications, RPA Automation, Cloud, and Analytics. We are helping small to medium organization build their Web Application SW which customized and fit with their needs using a variety of new technology tools to help them improve business efficiency and profitability.",
                Answer = "We are a Software development team focusing on Digital transformation using Business Applications, RPA Automation, Cloud, and Analytics. We are helping small to medium organization build their Web Application SW which customized and fit with their needs using a variety of new technology tools to help them improve business efficiency and profitability.",
                Active = true
            }
            );
            builder.Entity<Benefit>().HasData(new Benefit()
            {
                Id = 1,
                TitleEn = "title",
                Title = "عنوان",
                DescriptionEn = "Description",
                Description = "وصف",
                ImagePath = "\\temp.png",
                Active = true
            }, new Benefit()
            {
                Id = 2,
                TitleEn = "title",
                Title = "عنوان",
                DescriptionEn = "Description",
                Description = "وصف",
                ImagePath = "\\temp.png",
                Active = true
            }, new Benefit()
            {
                Id = 3,
                TitleEn = "title",
                Title = "عنوان",
                DescriptionEn = "Description",
                Description = "وصف",
                ImagePath = "\\temp.png",
                Active = true
            }

            );
            builder.Entity<Partener>().HasData(new Partener()
            {
                Id = 1,
                Title = "عنوان",
                TitleEn = "title",
                DescriptionEn = "Description",
                Description = "وصف",
                Link = "/",
                ImagePath = "\\temp.png",
                Active = true
            },
            new Partener()
            {
                Id = 2,
                Title = "عنوان",
                TitleEn = "title",
                DescriptionEn = "Description",
                Description = "وصف",
                Link = "/",
                ImagePath = "\\temp.png",
                Active = true
            },new Partener()
            {
    Id = 3,
    Title = "عنوان",
    TitleEn = "title",
    DescriptionEn = "Description",
    Description = "وصف",
    Link = "/",
    ImagePath = "\\temp.png",
    Active = true
}
                       );

            builder.Entity<Branch>().HasData(new Branch()
            {
                Id = 1,
                AddressEn = "Address",
                Address = "عنوان",
                CityEn = "City",
                City = "وصف",
                Country = "بلد",
                CountryEn = "Country",
                Active = true
            });

            builder.Entity<Number>().HasData(new Number() { Id = 1, BranchId = 1, Active = true, PhoneNumber = "0100000000", PhoneNumberEn = "0100000000" }
             );
            builder.Entity<Social>().HasData(
                new Social() { Id = 1, Link = "Home", Type = "fab fa-facebook-f" },
                new Social() { Id = 2, Link = "Home", Type = "fab fa-twitter" },
                new Social() { Id = 3, Link = "Home", Type = "fab fa-instagram" },
                new Social() { Id = 4, Link = "Home", Type = "fab fa-linkedin-in" },
                new Social() { Id = 5, Link = "Home", Type = "Video" });
            builder.Entity<Text>().HasData(
                 new Text() { Id = 1, SectionId = 1, 
                     Title = " Digital Transformation",
                     TitleEn = " Digital Transformation",
                     Content = "At Custom Solutions Analytics, we unlock your business transformation for more efficiency and profitability.",
                     ContentEn = "At Custom Solutions Analytics, we unlock your business transformation for more efficiency and profitability."
                 },
                 new Text() { Id = 2, SectionId = 2, 
                     Title = "About Custom Solutions Analytics", TitleEn = "About Custom Solutions Analytics",
                     Content = "We are a Software development team focusing on Digital transformation using Business Applications, " +
                     "RPA Automation, Cloud, and Analytics. We are helping small to " +
                     "medium organization build their Web Application SW which " +
                     "customized and fit with their needs using a variety of new technology tools to help them improve business efficiency and profitability",
                     ContentEn = "We are a Software development team focusing on Digital transformation using Business Applications, " +
                     "RPA Automation, Cloud, and Analytics. We are helping small to " +
                     "medium organization build their Web Application SW which " +
                     "customized and fit with their needs using a variety of new technology tools to help them improve business efficiency and profitability"
                 });

        }

    }
}
