using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Data;
using System.Data.SqlClient;
using SchoolContentManagement_Entity;

namespace FileUploadTest
{
    /// <summary>
    /// Summary description for UploadFileHandler
    /// </summary>


    public class UploadFileHandler : IHttpHandler
    {
        string conStr = @"Data Source=GAUREESH;Initial Catalog=SchoolInfo2;Integrated Security=True;Connect Timeout=15;Encrypt=False;TrustServerCertificate=False";

        public void ProcessRequest(HttpContext UploadData)
        {
         try {
                
            using(SqlConnection cn = new SqlConnection(conStr))
            {
            HttpFileCollection files = UploadData.Request.Files;
            for (int i = 0; i < files.Count; i++)
            {
                string fullFileName = files.AllKeys[0];
                char[] separator = {'.'};
                string[] array = fullFileName.Split(separator);
                string extension = array[1];

                SqlCommand cmd = new SqlCommand("Usp_UploadAssignment", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@schoolID", Convert.ToInt32(UploadData.Request.Cookies["SchoolID"].Value));
                cmd.Parameters.AddWithValue("@sectionID", Convert.ToInt32(UploadData.Request.Cookies["SectionID"].Value));
                cmd.Parameters.AddWithValue("@standardID", Convert.ToInt32(UploadData.Request.Cookies["StandardID"].Value));
                cmd.Parameters.AddWithValue("@subjectID", Convert.ToInt32(UploadData.Request.Cookies["SubjectID"].Value));
                cmd.Parameters.AddWithValue("@assignmentName", HttpUtility.UrlDecode((UploadData.Request.Cookies["AssignmentName"].Value).ToString()) + '.'+extension);
                cmd.Parameters.AddWithValue("@date", (UploadData.Request.Cookies["Date"].Value).ToString());
                cmd.Parameters.AddWithValue("@employeeID", Convert.ToInt32(UploadData.Request.Cookies["EmployeeID"].Value));
                cmd.Parameters.AddWithValue("@allottedBy", (UploadData.Request.Cookies["StaffFirstName"].Value).ToString() + ' ' + (UploadData.Request.Cookies["StaffLastName"].Value).ToString());
                ////cmd.Parameters.Add("@sectionID", SqlDbType.Int).Value = Convert.ToInt32(UploadData.Request.Cookies["SectionID"].Value);
                //cmd.Parameters.Add("@standardID", SqlDbType.Int).Value = Convert.ToInt32(UploadData.Request.Cookies["StandardID"].Value);
                //cmd.Parameters.Add("@subject", SqlDbType.NVarChar).Value = UploadData.Request.Cookies["Subject"].Value;
                //cmd.Parameters.Add("@date", SqlDbType.NVarChar).Value = UploadData.Request.Cookies["Date"].Value;
                //cmd.Parameters.Add("@allottedBy", SqlDbType.NVarChar).Value = UploadData.Request.Cookies["StaffFirstName"].Value + ' ' + UploadData.Response.Cookies["StaffLastName"].Value;

             
                HttpPostedFile file = files[i];
                Stream stream = file.InputStream;
                BinaryReader binaryReader = new BinaryReader(stream);
                byte[] bytes = binaryReader.ReadBytes((int)stream.Length);
           
                cmd.Parameters.AddWithValue("@content", bytes);

                cn.Open();
                cmd.ExecuteNonQuery();
                
            }
            }
         }
             catch(SqlException ex)
            {
                 throw ex;
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