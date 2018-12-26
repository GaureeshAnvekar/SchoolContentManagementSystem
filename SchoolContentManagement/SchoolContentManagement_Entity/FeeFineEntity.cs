using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class FeeFineEntity
    {
        public int Id { get; set; }
        public string Desc { get; set; }
        public decimal FineAmount { get; set; }
        public int FineStartDay { get; set; }
        public int FineEndDay { get; set; }
        public int SchoolId { get; set; }
        public int StandardId { get; set; }
    }
}
