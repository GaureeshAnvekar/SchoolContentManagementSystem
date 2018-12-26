using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using SchoolContentManagement_Entity;
using SchoolContentManagement_DAL;
using System.Web.Script.Serialization;
using System.Threading;

namespace SchoolContentManagement
{
    /// <summary>
    /// Summary description for DeleteAssignmentsHandler
    /// </summary>
    public class DeleteAssignmentsHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            SqlConnection connection = null;
            try
            {
                connection = SQLConnection.GetConnection();

                int ID = Convert.ToInt32(context.Request.Form["ID"]);

                    SqlParameter[] spParams = new SqlParameter[]
                    {   
                        new SqlParameter("@assignmentID",ID)
                    };


                    int result = SQLHelper.ExecuteNonQuery(connection, CommandType.StoredProcedure, SPName_Constants.DeleteAssignmentByID, spParams);
                   
                }
            
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                connection.Close();
                connection.Dispose();
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}