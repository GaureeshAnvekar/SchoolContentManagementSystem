using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class Assignments
    {
        public int ID { get; set; }
        public string assignmentName { get; set; }
        public string submissionDate { get; set; }
        public string subjectName { get; set; }
        public string standard { get; set; }
        public string section { get; set; }
    }
}
