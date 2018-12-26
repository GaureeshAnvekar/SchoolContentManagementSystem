using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class TransportDetails
    {
        public string TransportType { set; get; }
        public string RouteDescription { set; get; }
        public string VehicleNo { set; get; }
        public string DriverFirstName { set; get; }
        public string DriverLastName { set; get; }
        public string DriverNumber { set; get; }
        public int schoolID { set; get; }
        public int studentID { set; get; }
    }
}

