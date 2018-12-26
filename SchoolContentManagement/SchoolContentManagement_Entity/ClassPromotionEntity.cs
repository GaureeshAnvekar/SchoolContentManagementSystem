using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
   public class ClassPromotionEntity
    {
        public string SchoolID { get; set; }
        public string SectionID { get; set; }
        public string AcademicYearId { get; set; }
        public string StandardId { get; set; }
        public string[] regNoArray { get; set; }
    }
}
