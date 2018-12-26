using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using SchoolContentManagement_Entity;
using SchoolContentManagement_DAL;
using System.Web.Script.Serialization;

namespace SchoolContentManagement
{
    /// <summary>
    /// Summary description for ViewDeleteAssignmentsHandler
    /// </summary>
    public class ViewDeleteAssignmentsHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            SqlConnection connection = null;
            DataSet assignmentsTable = null;
            Assignments[] setOfAssignments = null;
            try
            {
                connection = SQLConnection.GetConnection();
                assignmentsTable = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@schoolID",context.Request.Cookies["SchoolID"].Value), 
                   new SqlParameter("@employeeID",context.Request.Cookies["EmployeeID"].Value)
                };

                assignmentsTable = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetAssignmentsByEmployee, spParams);

                setOfAssignments = new Assignments[assignmentsTable.Tables[0].Rows.Count];

                foreach (DataTable table in assignmentsTable.Tables)
                {
                    int i = 0;

                    foreach (DataRow dr in table.Rows)
                    {
                        Assignments obj = new Assignments();
                        obj.ID = Convert.ToInt32(dr["ID"]);
                        obj.assignmentName = (dr["AssignmentName"]).ToString();
                        obj.subjectName = (dr["SubjectName"]).ToString();
                        obj.standard = (dr["Standard"]).ToString();
                        obj.section = (dr["Section"]).ToString();
                        obj.submissionDate = ((DateTime)dr["SubmissionDate"]).ToString("MM/dd/yyyy");
                       

                        setOfAssignments[i] = obj;
                        i++;
                    }
                }

                JavaScriptSerializer javaScriptSerializer = new JavaScriptSerializer();
                string result = javaScriptSerializer.Serialize(setOfAssignments);
                context.Response.ContentType = "text/html";
                context.Response.Write(result);
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