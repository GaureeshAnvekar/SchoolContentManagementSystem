using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SchoolContentManagement_Entity;
using SchoolContentManagement_BAL;
using System.Data;
using System.Data.SqlClient;

namespace SchoolContentManagement
{
    public partial class SchoolInformationToUpdate : System.Web.UI.Page
    {
        #region VariableDeclaration

        AuthenticationBAL objBal = null;
        SchoolSectionValues schoolSectionValuesEntity = null;
        DataSet dsResult = null;

        #endregion
        protected void Page_Load(object sender, EventArgs e)
        {
        /*    schoolSectionValuesEntity = new SchoolSectionValues();*/

            fName.Text = Request.Cookies["FirstName"].Value;
            lName.Text = Request.Cookies["LastName"].Value;
            loginPageType.Text = Request.Cookies["Type"].Value;

            
            /*if (Request.Cookies["SchoolID"] != null)
            {
                schoolSectionValuesEntity.SchoolId = Convert.ToInt32(Request.Cookies["SchoolID"].Value);
            }*/
            /*
            if (!Page.IsPostBack)
            {
                GetSectionToUpdate();
            }*/

        }
        /*
        private void GetSectionToUpdate()
        {
            objBal = new AuthenticationBAL();
            dsResult = objBal.GetSectionToUpdate();

            if (dsResult != null)
            {
                if (dsResult.Tables.Count > 0 && dsResult.Tables[0].Rows.Count > 0)
                {
                    ddlSelect.DataSource = dsResult;
                    ddlSelect.DataTextField = "SectionDescription";
                    ddlSelect.DataValueField = "SectionId";
                    ddlSelect.DataBind();

                    ddlSelect.Items.Insert(0, new ListItem("Select A Section To Update", ""));
                }
            }
        }*/
    }
}