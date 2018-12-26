using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class FeeCollectionPeriodEntity
    {
        public int Id { get; set; }
        public string Desc { get; set; }
        public string ShortDesc { get; set; }
        public int SchoolId { get; set; }
        public int StandardId { get; set; }
    }
}
