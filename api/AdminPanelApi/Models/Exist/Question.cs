using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminPanelApi.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string QuestionText { get; set; }
        public string QuestionTextEn { get; set; }
        public bool Active { get; set; }
        public string AnswerEn { get; set; }
        public string Answer { get; set; }
        public int Rank { get; set; }

    }
}
