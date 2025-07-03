using System.ComponentModel.DataAnnotations;

namespace ACWebApp.Models
{
    public class Idea
    {
        public int Id { get; set; }
        [Display(Name = "Idea Title")]
        public string IdeaTitle { get; set; }
        [Display(Name = "Description")]
        public string IdeaDescription { get; set; }
        [Display(Name = "Pros")]
        public string IdeaPros { get; set; }
        [Display(Name = "Cons")]
        public string IdeaCons { get; set; }

        public Idea()
        {
                
        }
    }
}
