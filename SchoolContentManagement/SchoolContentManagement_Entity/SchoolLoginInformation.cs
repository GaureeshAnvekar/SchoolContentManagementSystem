using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace SchoolContentManagement_Entity
{
    public class SchoolLoginInformation
    {
        public int Id { get; set; }
        public string SchoolName { get; set; }
        //public string AffiliationNumber { get; set; }
       
        public string UserID { get; set; }
        public string Password { get; set; }
        public string firstName { get; set; }
        public string middleName { set; get; }
        public string lastName { get; set; }
        public int rollNo { get; set; }
        public string standard { get; set; }
        public string section { get; set; }
        public string DOB { get; set; }
        public string bloodGroup { set; get; }
        public string gender { set; get; }
        public string type { get; set; }
        public int studentID { get; set; }
        public string photoBase64Student { get; set; }
        public string qualification { get; set; }
        public string dateOfJoining { get; set; }
        public string classTeacherOfStd { get; set; }
        public string classTeacherOfSection { get; set; }
        public int employeeID { get; set; }
        public string photoBase64Emp { get; set; }
      
        
    }
}
