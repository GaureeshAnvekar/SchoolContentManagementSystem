using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class IssueBook
    {
        public int schoolID { get; set; }
        public string bookID { get; set; }
        public string loanDate { get; set; }
        public string dueDays { get; set; }
        public string dueDate { get; set; }
        public string regID { get; set; }
        public string type { get; set; }
    }
}
