namespace AdminPanelApi.Models
{
    public class ItemDetailsFather
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string TitleEn { get; set; }
        public string Description { get; set; }
        public string DescriptionEn { get; set; }
        public bool FullWidth { get; set; }
        public string ImagePath { get; set; }
        public bool Active { get; set; }
        public int Rank { get; set; }
    }
}
