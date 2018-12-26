using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class LibraryDetails
    {
        public Book[] booksArray { set; get; }
        public int schoolID { set; get; }
        public string bookName { set; get; }
    }
}
