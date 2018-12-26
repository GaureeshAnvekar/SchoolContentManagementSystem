using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class ClassStudentNames
    {
        public Student[] studentNames { set; get; }
        public string standard { set; get; }
        public int schoolID { set; get; }
        public string section { set; get; }
    }
}
