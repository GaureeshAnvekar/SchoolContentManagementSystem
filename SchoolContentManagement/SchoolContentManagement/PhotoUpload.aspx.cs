using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;

namespace SchoolContentManagement
{
    public partial class PhotoUpload : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
         string a = schoolID.Text; 
        }

        protected void Upload(object sender, EventArgs e)
        {
            HttpPostedFile postedFile = FileUpload1.PostedFile;
            string fileName = Path.GetFileName(postedFile.FileName);
            string fileExtension = Path.GetExtension(fileName);
            string SchoolID = schoolID.Text;
            string StudentID = studentID.Text;

            //if (fileExtension.ToLower() == "jpg" || fileExtension.ToLower() == "png" || fileExtension.ToLower() == "bmp" || fileExtension.ToLower() == "gif" || fileExtension.ToLower() == "jpeg" )
            //{
                Stream stream = postedFile.InputStream;
                BinaryReader binaryReader = new BinaryReader(stream);
                byte[] bytes = binaryReader.ReadBytes((int)stream.Length);

                if (ConfigurationManager.AppSettings["DBConnectionString"] != null)
                {
                    string connectionString = ConfigurationManager.AppSettings["DBConnectionString"];
                    using (SqlConnection con = new SqlConnection(connectionString))
                    {
                        SqlCommand cmd = new SqlCommand("Usp_UploadStudentPhoto", con);
                        cmd.CommandType = CommandType.StoredProcedure;

                        SqlParameter param1 = new SqlParameter()
                        {
                            ParameterName = "@schoolID",
                            Value = SchoolID
                        };
                        cmd.Parameters.Add(param1);

                        SqlParameter param2 = new SqlParameter()
                        {
                            ParameterName = "@studentID",
                            Value = StudentID
                        };
                        cmd.Parameters.Add(param2);

                        SqlParameter param3 = new SqlParameter()
                        {
                            ParameterName = "@photo",
                            Value = bytes
                        };
                        cmd.Parameters.Add(param3);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        msg.Text = "Upload successful";
                    }
                }                
            //}
            //else
            //{
            //    msg.Text = "Only images can be uploaded";
            //}
        }
    }
}