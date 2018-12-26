using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class ContactDetails
    {
        public int schoolID { get; set; }
        public int studentID { get; set; }
        public int employeeID { get; set; }
        public string mobileNumber { get; set; }
        public string landLineNumber { get; set; }
        public string emailID { get; set; }
        public string emergencyNumber { get; set; }
    }
}
