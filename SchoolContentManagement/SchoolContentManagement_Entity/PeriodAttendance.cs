using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class PeriodAttendance
    {
        public int schoolID { set; get; }
        public int studentID { set; get; }
        public string status { set; get; }
        public int startDay { set; get; }
        public int startMonth { set; get; }
        public int startYear { set; get; }
        public int endDay { set; get; }
        public int endMonth { set; get; }
        public int endYear { set; get; }
    }
}
