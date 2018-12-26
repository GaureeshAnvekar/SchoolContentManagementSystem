using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class MonthlyAttendance
    {
        public string month { get; set; }
        public int monthNumber { get; set; }
        public string status { get; set; }
        public int schoolID { get; set; }
        public int studentID { get; set; }
        public string result { get; set; }
        public int year { get; set; }
    }
}
