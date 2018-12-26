using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SchoolContentManagement
{
    public partial class WebForm11 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Label fName = (Label)Master.FindControl("fName");
            Label mName = (Label)Master.FindControl("mName");
            Label lName = (Label)Master.FindControl("lName");
            Label qualification = (Label)Master.FindControl("qualification");
            Label dateOfJoining = (Label)Master.FindControl("dateOfJoining");
            Label dateOfBirth = (Label)Master.FindControl("dateOfBirth");
            Label bloodGroup = (Label)Master.FindControl("bloodGroup");
            Label gender = (Label)Master.FindControl("gender");
            Label classTeacher = (Label)Master.FindControl("classTeacher");

            fName.Text = Request.Cookies["StaffFirstName"].Value;
            mName.Text = Request.Cookies["StaffMiddleName"].Value;
            lName.Text = Request.Cookies["StaffLastName"].Value;
            qualification.Text = Request.Cookies["Qualification"].Value;
            dateOfJoining.Text = Request.Cookies["DateOfJoining"].Value;
            dateOfJoining.Text = dateOfJoining.Text.Replace("%2F", "/");
            dateOfBirth.Text = Request.Cookies["StaffDOB"].Value;
            dateOfBirth.Text = dateOfBirth.Text.Replace("%2F", "/");
            bloodGroup.Text = Request.Cookies["StaffBloodGroup"].Value;
            gender.Text = Request.Cookies["StaffGender"].Value;
            classTeacher.Text = Request.Cookies["ClassTeacherOfStd"].Value + "-" + Request.Cookies["ClassTeacherOfSection"].Value;
        }
    }
}