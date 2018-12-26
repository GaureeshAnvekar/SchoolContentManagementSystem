using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SchoolContentManagement
{
    public partial class WebForm5 : System.Web.UI.Page
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
            bloodGroup.Text = Request.Cookies["StudentBloodGroup"].Value;
            gender.Text = Request.Cookies["StudentGender"].Value;
            //fName.Text = Request.Cookies["FirstName"].Value;
            //mName.Text = Request.Cookies["MiddleName"].Value;
            //lName.Text = Request.Cookies["LastName"].Value;
            //rollNo.Text = Request.Cookies["RollNo"].Value;
            //standard.Text = Request.Cookies["Standard"].Value;
            //dateOfBirth.Text = Request.Cookies["DOB"].Value;
            //dateOfBirth.Text = dateOfBirth.Text.Replace("%2F", "/");
            //bloodGroup.Text = Request.Cookies["BloodGroup"].Value;
            //gender.Text = Request.Cookies["Gender"].Value;
        }
    }
}