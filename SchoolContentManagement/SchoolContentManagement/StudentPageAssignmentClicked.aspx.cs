using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SchoolContentManagement
{
    public partial class WebForm29 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Label fName = (Label)Master.FindControl("fName");
            Label mName = (Label)Master.FindControl("mName");
            Label lName = (Label)Master.FindControl("lName");
            Label rollNo = (Label)Master.FindControl("rollNo");
            Label standard = (Label)Master.FindControl("standard");
            Label dateOfBirth = (Label)Master.FindControl("dateOfBirth");
            Label bloodGroup = (Label)Master.FindControl("bloodGroup");
            Label gender = (Label)Master.FindControl("gender");

            fName.Text = Request.Cookies["StudentFirstName"].Value;
            mName.Text = Request.Cookies["StudentMiddleName"].Value;
            lName.Text = Request.Cookies["StudentLastName"].Value;
            rollNo.Text = Request.Cookies["RollNo"].Value;
            standard.Text = Request.Cookies["StudentStandard"].Value + "-" + Request.Cookies["StudentSection"].Value;
            dateOfBirth.Text = Request.Cookies["StudentDOB"].Value;
            dateOfBirth.Text = dateOfBirth.Text.Replace("%2F", "/");
            bloodGroup.Text = HttpUtility.UrlDecode(Request.Cookies["StudentBloodGroup"].Value);
          
            gender.Text = Request.Cookies["StudentGender"].Value;
        }
    }
}