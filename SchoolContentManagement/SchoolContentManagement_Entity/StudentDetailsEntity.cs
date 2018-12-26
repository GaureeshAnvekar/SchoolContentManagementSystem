using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class StudentDetailsEntity
    {
        public int schoolID { get; set; }
        public string academicYear { get; set; }
        public string standardID { get; set; }
        public string sectionID { get; set; }
        public int rollNumber { get; set; }
        public string regNo { get; set; }
        public string firstName { get; set; }
        public string middleName { get; set; }
        public string lastName { get; set; }
        public string gender { get; set; }
        public string bloodGroup { get; set; }
        public string DOB { get; set; }
        
    }
}
