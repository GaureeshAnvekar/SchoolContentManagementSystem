using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class LibraryBook
    {
        public int schoolID { get; set; }
        public string bookID { get; set; }
        public string title { get; set; }
        public string author { get; set; }
        public string publisher { get; set; }
        public int MRP { get; set; }
        public int cost { get; set; }
        public int yearOfPurchase { get; set; }
    }
}
