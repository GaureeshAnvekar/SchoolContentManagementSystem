using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class SetAttendanceParams
    {
        public int schoolID { set; get; }
        public int studentID { set; get; }
        public int year { set; get; }
        public int month { set; get; }
        public int day { set; get; }
        public int isPresent { set; get; }
    }
}
