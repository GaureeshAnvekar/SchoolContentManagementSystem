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
    public partial class SchoolLogoUpload : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string a = SchoolID.Text;
        }

        protected void btnUpload_Click(object sender, EventArgs e)
        {
            HttpPostedFile postedFile = FileUpload1.PostedFile;
            string fileName = Path.GetFileName(postedFile.FileName);
            string fileExtension = Path.GetExtension(fileName);
            string schoolID = SchoolID.Text;
            

            Stream stream = postedFile.InputStream;
            BinaryReader binaryReader = new BinaryReader(stream);
            byte[] bytes = binaryReader.ReadBytes((int)stream.Length);

            if (ConfigurationManager.AppSettings["DBConnectionString"] != null)
            {
                string connectionString = ConfigurationManager.AppSettings["DBConnectionString"];
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("Usp_UploadSchoolLogo", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    SqlParameter param1 = new SqlParameter()
                    {
                        ParameterName = "@SchoolID",
                        Value = schoolID
                    };
                    cmd.Parameters.Add(param1);

                    SqlParameter param2 = new SqlParameter()
                    {
                        ParameterName = "@Logo",
                        Value = bytes
                    };
                    cmd.Parameters.Add(param2);

                    con.Open();
                    cmd.ExecuteNonQuery();
                    lblMessage.Text = "Upload successful";
                    lblMessage.ForeColor = System.Drawing.Color.Green;
                }
            }

        }

    }
}