using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
   public class SectionTransferEntity
    {
       public int SchoolID { get; set; }
       public string StudentRegNo { get; set; }
       public int SectionID { get; set; }
       public int AcademicYearId { get; set; }
       public int StandardId { get; set; }
    }
}
