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
    /// Summary description for OpenAssignmentsHandler
    /// </summary>
    public class OpenAssignmentsHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            SqlConnection connection = null;
            DataSet assignmentsTable = null;
            
                connection = SQLConnection.GetConnection();
                assignmentsTable = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@assignmentID",context.Request["ID"]), 
                };

                assignmentsTable = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetAssignmentContentByID, spParams);


                Byte[] bytes = (Byte[])assignmentsTable.Tables[0].Rows[0]["AssignmentContent"];
                string fileName = assignmentsTable.Tables[0].Rows[0]["AssignmentName"].ToString();

                context.Response.Clear();
                context.Response.AddHeader("Content-Disposition", "attachment;filename="+fileName);
                context.Response.AddHeader("Content-Length", bytes.Length.ToString());
                context.Response.ContentType = MimeMapping.GetMimeMapping(fileName);
                context.Response.BinaryWrite(bytes);
                context.Response.Flush();
                context.Response.End();
               
           
               
            
            //catch (ThreadAbortException ex)
            //{
            //    throw ex;
            //}

          
                connection.Close();
                connection.Dispose();
            

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