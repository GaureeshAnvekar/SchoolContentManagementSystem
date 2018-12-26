using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using SchoolContentManagement_Entity;
using SchoolContentManagement_DAL;
using System.Web.Script.Serialization;
using System.Threading;

namespace SchoolContentManagement
{
    public partial class WebForm15 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            SqlConnection connection = null;
            DataSet assignmentsTable = null;
            try
            {
                connection = SQLConnection.GetConnection();
                assignmentsTable = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@assignmentID",149), 
                };

                assignmentsTable = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetAssignmentContentByID, spParams);


                Byte[] bytes = (Byte[])assignmentsTable.Tables[0].Rows[0]["AssignmentContent"];

                Response.Clear();
                Response.Buffer = true;
                Response.ContentType = @"application/pdf";

                Response.AddHeader("Content-Disposition", "attachment; filename=MySampleFile.pdf");
                Response.AddHeader("Content-Length", bytes.Length.ToString());

                Response.BinaryWrite(bytes);
                Response.Flush();
                Response.End();



            }
            catch (ThreadAbortException ex)
            {
                throw ex;
            }
            finally
            {
                connection.Close();
                connection.Dispose();
            }
        }
    }
}