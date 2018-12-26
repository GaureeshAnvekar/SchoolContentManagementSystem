using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class FeesTypeAndAmountEntity
    {
        public int SchoolId { get; set; }
        public int StandardId { get; set; }
        public string AcademicYear { get; set; }
        public int FeeAccountHeadId { get; set; }
        public string FeeAccountHeadDesc { get; set; }
        public decimal FeeAmount { get; set; }
        public int FeeCollectionPeriodId { get; set; }
        public string FeeCollectionPeriodDesc { get; set; }
    }
}
