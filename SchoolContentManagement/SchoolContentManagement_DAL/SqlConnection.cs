using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;


namespace SchoolContentManagement_DAL
{
    public class SQLConnection
    {
        public static SqlConnection GetConnection()
        {
            SqlConnection connection = null;
            string connectionstring = string.Empty;
            if (ConfigurationManager.AppSettings["DBConnectionString"] != null)
            {
                connectionstring = ConfigurationManager.AppSettings["DBConnectionString"];
                connection = new SqlConnection(connectionstring);
                connection.Open();
            }                 
            
            return connection;
        }

    }
}
