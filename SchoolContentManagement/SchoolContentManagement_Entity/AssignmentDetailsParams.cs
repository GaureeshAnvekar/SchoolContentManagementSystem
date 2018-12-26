using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class AssignmentDetailsParams
    {
        public int schoolID { get; set; }
        public int employeeID { get; set; }
        public string standard { get; set; }
        public string section { get; set; }
    }
}
