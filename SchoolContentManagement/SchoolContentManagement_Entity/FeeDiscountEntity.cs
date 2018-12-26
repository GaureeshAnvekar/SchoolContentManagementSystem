using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class FeeDiscountEntity
    {
        public int Id { get; set; }
        public decimal DiscountAmount { get; set; }
        public int DiscountPercent { get; set; }
        public int SchoolId { get; set; }
        public int StandardId { get; set; }

    }
}
