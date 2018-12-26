using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class SchoolSectionValues
    {
        public int Id { get; set; }
        public int SectionId { get; set; }
        public string SectionValue { get; set; }
        public int SchoolId { get; set; }
    }
}
