using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_Entity
{
    public class FeesDetails
    {
        public int FeeAmount { set; get; }
        public string IsPaid { set; get; }
        public string Date_of_payment { set; get; }
        public string Due_Date { set; get; }
        public string Mode_of_payment { set; get; }
        public int Cheque_Number { set; get; }
        public int DD_Number { set; get; }
        public string Collectors_Name { set; get; }
        public int SchoolID { set; get; }
        public int StudentID { set; get; }
    }
}


