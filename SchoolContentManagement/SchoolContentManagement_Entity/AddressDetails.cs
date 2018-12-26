using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class AddressDetails
    {
        public int schoolID { set; get; }
        public int studentID { set; get; }
        public int employeeID { set; get; }
        public string houseNoName { set; get; }
        public string streetName { set; get; }
        public string area { set; get; }
        public string city { set; get; }
        public string state { set; get; }
        public int pinCode { set; get; }
    }
}
