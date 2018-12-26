using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class FeeTypeEntity
    {
        public int Id { get; set; }
        public int FeesAccountHeadTypeId { get; set; }
        public decimal FeeAmount { get; set; }
        public int FeeCollectionPeriodId { get; set; }
        public int SchoolId { get; set; }
        public int StandardId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string AcademicYear { get; set; }
    }
}
