﻿using AdminPanelApi.Models.Exist.Posts;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminPanelApi.Models
{
    public class Header
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string TitleEn { get; set; }
        public string Description { get; set; }
        public string DescriptionEn { get; set; }
        public string ImagePath { get; set; }
        public bool Active { get; set; }
        public int TempPostId { get; set; }
        [JsonIgnore]
        public HeaderPost HeaderPost { get; set; }
        public int Rank { get; set; }

    }
}
