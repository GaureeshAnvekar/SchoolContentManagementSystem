using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class BorrowedBook
    {
        public int schoolID { get; set; }
        public string bookID { get; set; }
        public string regID { get; set; }
        public string type { get; set; }
        public string returnDate { get; set; }
        public int perDayDueCharge { get; set; }
    }
}
