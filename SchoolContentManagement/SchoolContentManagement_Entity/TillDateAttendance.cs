using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class TillDateAttendance
    {
        public int schoolID { set; get; }
        public int studentID { set; get; }
        public string status { set; get; }
    }
}
