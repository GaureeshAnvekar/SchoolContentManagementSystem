using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class ResultDetails
    {
        public SubjectWithMarks[] subjectsArray { set; get; }
        public int schoolID { set; get; }
        public int studentID { set; get; }
        public int examTypeID { set; get; }
    }
}
