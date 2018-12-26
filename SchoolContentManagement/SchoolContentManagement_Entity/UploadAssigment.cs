using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class UploadAssigment
    {
        public int schoolID { get; set; }
        public int standardID { get; set; }
        public int sectionID { get; set; }
        public string subject { get; set; }
        public string date { get; set; }
        public string allottedBy { get; set; }
        public HttpContext content { get; set; }
    }
}
