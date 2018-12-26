using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.IO;
using System.Data.OleDb;
using System.Configuration;
using System.Data.SqlClient;
using SchoolContentManagement_DAL;


namespace SchoolContentManagement
{
    /// <summary>
    /// Summary description for UploadExcelDataHandler
    /// </summary> 
    public class UploadExcelDataHandler : IHttpHandler
    {
        OleDbConnection Econ = null;
        SqlConnection con = null;

        string constr, Query, sqlconn;

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                HttpFileCollection files = context.Request.Files;
                HttpPostedFile excelSheet = files[0];
                string CurrentFilePath = HttpContext.Current.Server.MapPath("~/excelData(Temp)/" + excelSheet.FileName);
                excelSheet.SaveAs(CurrentFilePath);

                constr = string.Format(@"Provider=Microsoft.ACE.OLEDB.12.0;Data Source={0};Extended Properties=""Excel 12.0 Xml;HDR=YES;""", CurrentFilePath);
                Econ = new OleDbConnection(constr);

                Query = string.Format("Select * FROM [{0}]", "Sheet1$");
                OleDbCommand Ecom = new OleDbCommand(Query, Econ);
                Econ.Open();

                DataSet ds = new DataSet();
                OleDbDataAdapter oda = new OleDbDataAdapter(Query, Econ);
                Econ.Close();
                oda.Fill(ds);
                DataTable Exceldt = ds.Tables[0];


                sqlconn = ConfigurationManager.AppSettings["DBConnectionString"];
                con = new SqlConnection(sqlconn);

                SqlCommand cmd = new SqlCommand("Usp_ImportStudentDetails", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@excelTable", Exceldt);

                con.Open();
                cmd.ExecuteNonQuery();
                Array.ForEach(Directory.GetFiles((HttpContext.Current.Server.MapPath("~/excelData(Temp)/"))), File.Delete);

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                con.Close();
                con.Dispose();
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