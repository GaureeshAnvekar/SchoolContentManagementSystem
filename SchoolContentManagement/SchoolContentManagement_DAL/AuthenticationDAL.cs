using SchoolContentManagement_Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_DAL
{
    /// <summary>
    /// Description: This class is used to provide schools to do content management by logging in to the site.
    /// Author: Robin Apoto
    /// Date: 16/Dec/2015.
    /// </summary>
    public class AuthenticationDAL
    {
        #region Variable Declaration
        SqlConnection connection = null;
        #endregion

        /// <summary>
        /// Allow Schools to Login.
        /// </summary>
        /// <param name="schoolLoginInformationEntity"></param>
        /// <returns></returns>
        public SchoolLoginInformation GetLoginEmployeeDetail(SchoolLoginInformation schoolLoginInformationEntity)
        {
            DataSet dsLoginEmpDetail = null;
            SchoolLoginInformation schoolLogin = null;

            try
            {
                connection = SQLConnection.GetConnection();
                dsLoginEmpDetail = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@UserID",schoolLoginInformationEntity.UserID), 
                   new SqlParameter("@Password",schoolLoginInformationEntity.Password),
                   new SqlParameter("@type",schoolLoginInformationEntity.type)
           
                };

                dsLoginEmpDetail = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetSchoolLoginControlPanel, spParams);
                if (dsLoginEmpDetail != null && dsLoginEmpDetail.Tables.Count > 0 && dsLoginEmpDetail.Tables[0].Rows.Count > 0)
                {
                    schoolLogin = new SchoolLoginInformation();

                    if (schoolLoginInformationEntity.type == "student")
                    {
                        schoolLogin.Id = Convert.ToInt32(dsLoginEmpDetail.Tables[0].Rows[0]["SchoolID"]);
                        //  schoolLogin.SchoolName = dsLoginEmpDetail.Tables[0].Rows[0]["SchoolName"].ToString();
                        schoolLogin.firstName = dsLoginEmpDetail.Tables[0].Rows[0]["FirstName"].ToString();
                        schoolLogin.middleName = dsLoginEmpDetail.Tables[0].Rows[0]["StudentMiddleName"].ToString();
                        schoolLogin.lastName = dsLoginEmpDetail.Tables[0].Rows[0]["LastName"].ToString();
                        schoolLogin.rollNo = Convert.ToInt32(dsLoginEmpDetail.Tables[0].Rows[0]["RollNumber"]);
                        schoolLogin.standard = dsLoginEmpDetail.Tables[0].Rows[0]["Standard"].ToString();
                        schoolLogin.section = dsLoginEmpDetail.Tables[0].Rows[0]["Section"].ToString();
                        schoolLogin.DOB = ((DateTime)dsLoginEmpDetail.Tables[0].Rows[0]["DateOfBirth"]).ToString("M/d/yyyy");
                        schoolLogin.bloodGroup = dsLoginEmpDetail.Tables[0].Rows[0]["BloodGroup"].ToString();
                        schoolLogin.gender = dsLoginEmpDetail.Tables[0].Rows[0]["Gender"].ToString();
                        //   schoolLogin.rollNo = Convert.ToInt32(dsLoginEmpDetail.Tables[0].Rows[0]["RollNumber"]);
                        schoolLogin.type = dsLoginEmpDetail.Tables[0].Rows[0]["LoginType"].ToString();
                        schoolLogin.studentID = Convert.ToInt32(dsLoginEmpDetail.Tables[0].Rows[0]["StudentId"]);
                        byte[] photoBinaryStudent = (byte[])dsLoginEmpDetail.Tables[0].Rows[0]["Photo"];
                        schoolLogin.photoBase64Student = Convert.ToBase64String(photoBinaryStudent);
                    }
                    else if (schoolLoginInformationEntity.type == "staff")
                    {
                        schoolLogin.Id = Convert.ToInt32(dsLoginEmpDetail.Tables[0].Rows[0]["SchoolID"]);
                        schoolLogin.firstName = dsLoginEmpDetail.Tables[0].Rows[0]["FirstName"].ToString();
                        schoolLogin.middleName = dsLoginEmpDetail.Tables[0].Rows[0]["EmpMiddleName"].ToString();
                        schoolLogin.lastName = dsLoginEmpDetail.Tables[0].Rows[0]["LastName"].ToString();
                        schoolLogin.qualification = dsLoginEmpDetail.Tables[0].Rows[0]["Qualification"].ToString();
                        schoolLogin.dateOfJoining = ((DateTime)dsLoginEmpDetail.Tables[0].Rows[0]["DateOfJoining"]).ToString("M/d/yyyy");
                        schoolLogin.DOB = ((DateTime)dsLoginEmpDetail.Tables[0].Rows[0]["DateOfBirth"]).ToString("M/d/yyyy");
                        schoolLogin.gender = dsLoginEmpDetail.Tables[0].Rows[0]["Gender"].ToString();
                        schoolLogin.classTeacherOfStd = dsLoginEmpDetail.Tables[0].Rows[0]["Standard"].ToString();
                        schoolLogin.classTeacherOfSection = dsLoginEmpDetail.Tables[0].Rows[0]["Section"].ToString();
                        schoolLogin.employeeID = Convert.ToInt32(dsLoginEmpDetail.Tables[0].Rows[0]["EmpID"]);
                        schoolLogin.bloodGroup = dsLoginEmpDetail.Tables[0].Rows[0]["BloodGroup"].ToString();
                        byte[] photoBinaryEmp = (byte[])dsLoginEmpDetail.Tables[0].Rows[0]["Photo"];
                        schoolLogin.photoBase64Emp = Convert.ToBase64String(photoBinaryEmp);
                        schoolLogin.type = dsLoginEmpDetail.Tables[0].Rows[0]["LoginType"].ToString();
                    }
                    else if (schoolLoginInformationEntity.type == "librarian")
                    {
                        schoolLogin.Id = Convert.ToInt32(dsLoginEmpDetail.Tables[0].Rows[0]["SchoolID"]);
                        schoolLogin.type = dsLoginEmpDetail.Tables[0].Rows[0]["LoginType"].ToString();
                    }
                    else if (schoolLoginInformationEntity.type == "admin")
                    {
                        schoolLogin.Id = Convert.ToInt32(dsLoginEmpDetail.Tables[0].Rows[0]["SchoolID"]);
                        schoolLogin.type = dsLoginEmpDetail.Tables[0].Rows[0]["LoginType"].ToString();
                    }


                }
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
            return schoolLogin;
        }



        public MonthlyAttendance GetMonthlyAttendance(MonthlyAttendance monthlyAttendanceParams)
        {

            //MonthlyAttendance objMonthlyAttendance = null;
            try
            {

                connection = SQLConnection.GetConnection();

                SqlParameter[] spParams = new SqlParameter[5];
                //{   
                //   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                //   new SqlParameter("@schoolID",monthlyAttendanceParams.schoolID), 
                //   new SqlParameter("@studentID",monthlyAttendanceParams.studentID),
                //   new SqlParameter("@month",monthlyAttendanceParams.monthNumber),

                //};

                spParams[0] = new SqlParameter("@schoolID", monthlyAttendanceParams.schoolID);
                spParams[1] = new SqlParameter("@studentID", monthlyAttendanceParams.studentID);
                spParams[2] = new SqlParameter("@month", monthlyAttendanceParams.monthNumber);
                spParams[3] = new SqlParameter("@year", monthlyAttendanceParams.year);

                SqlParameter outPutParameter = new SqlParameter();
                outPutParameter.ParameterName = "@result";
                outPutParameter.SqlDbType = System.Data.SqlDbType.NVarChar;
                outPutParameter.Direction = System.Data.ParameterDirection.Output;
                outPutParameter.Size = 50;

                spParams[4] = outPutParameter;




                object objStatus = SQLHelper.ExecuteScalar(connection, CommandType.StoredProcedure, SPName_Constants.GetMonthlyAttendanceStatus, spParams);

                string status;

                if (objStatus == null)
                    status = "N/A";
                else
                    status = objStatus.ToString();

                MonthlyAttendance objMonthlyAttendance = new MonthlyAttendance();

                objMonthlyAttendance.status = status;
                objMonthlyAttendance.month = monthlyAttendanceParams.month;


                return objMonthlyAttendance;
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
            //return objMonthlyAttendance;
        }

        public MonthsEachDayAttendance GetMonthsEachDayAttendance(MonthlyAttendance monthlyAttendanceParams)
        {
            DataSet monthsTable = null;
            MonthsEachDayAttendance objMonthsEachDayAttendance = null;
            try
            {
                connection = SQLConnection.GetConnection();
                monthsTable = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@schoolID",monthlyAttendanceParams.schoolID), 
                   new SqlParameter("@studentID",monthlyAttendanceParams.studentID),
                   new SqlParameter("@month",monthlyAttendanceParams.monthNumber),
                   new SqlParameter("@year",monthlyAttendanceParams.year)
                };

                monthsTable = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetMonthsEachDayAttendance, spParams);

                objMonthsEachDayAttendance = new MonthsEachDayAttendance();
                objMonthsEachDayAttendance.setOfDays = new EachDayAttendance[monthsTable.Tables[0].Rows.Count];

                foreach (DataTable table in monthsTable.Tables)
                {
                    int i = 0;

                    foreach (DataRow dr in table.Rows)
                    {
                        EachDayAttendance obj = new EachDayAttendance();
                        obj.day = Convert.ToInt32(dr["Day"]);
                        obj.month = Convert.ToInt32(dr["Month"]);
                        obj.year = Convert.ToInt32(dr["Year"]);
                        obj.isPresent = Convert.ToInt32(dr["IsPresent"]);

                        objMonthsEachDayAttendance.setOfDays[i] = obj;
                        i++;
                    }
                }


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
            return objMonthsEachDayAttendance;
        }

        public List<Assignments> GetStudentAssignmentDetails(AssignmentDetailsParams assignmentDetailsParams)
        {
            DataSet dsResult = null;
            Assignments objAssignment = null;
            List<Assignments> assignmentsList = new List<Assignments>();
            try
            {
                connection = SQLConnection.GetConnection();
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter("@schoolID",assignmentDetailsParams.schoolID),
                    new SqlParameter("@standard",assignmentDetailsParams.standard),
                    new SqlParameter("@section",assignmentDetailsParams.section)
                };

                dsResult = new DataSet();

                dsResult = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetStudentAssignments, parameters);
                if (dsResult != null && dsResult.Tables.Count > 0 && dsResult.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsResult.Tables[0].Rows)
                    {
                        objAssignment = new Assignments();
                        objAssignment.ID = Convert.ToInt32(dr["ID"]);
                        objAssignment.assignmentName = Convert.ToString(dr["AssignmentName"]);
                        objAssignment.subjectName = Convert.ToString(dr["SubjectName"]);
                        objAssignment.standard = Convert.ToString(dr["standard"]);
                        objAssignment.section = Convert.ToString(dr["Section"]);
                        objAssignment.submissionDate = ((DateTime)(dr["SubmissionDate"])).ToString("dd/MM/yyyy");

                        assignmentsList.Add(objAssignment);
                    }
                }
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
            return assignmentsList;
        }



        public ParentDetails GetParentDetails(ParentDetails parentDetailsParams)
        {
            DataSet dsParentDetails = null;
            ParentDetails objParentDetails = null;
            try
            {
                connection = SQLConnection.GetConnection();
                dsParentDetails = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@schoolID",parentDetailsParams.schoolID), 
                   new SqlParameter("@studentID",parentDetailsParams.studentID)
                };

                dsParentDetails = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetParentDetails, spParams);
                if (dsParentDetails != null && dsParentDetails.Tables.Count > 0 && dsParentDetails.Tables[0].Rows.Count > 0)
                {
                    objParentDetails = new ParentDetails();
                    objParentDetails.FatherFirstName = dsParentDetails.Tables[0].Rows[0]["FatherFirstName"].ToString();
                    //  schoolLogin.SchoolName = dsLoginEmpDetail.Tables[0].Rows[0]["SchoolName"].ToString();
                    objParentDetails.FatherMiddleName = dsParentDetails.Tables[0].Rows[0]["FatherMiddleName"].ToString();
                    objParentDetails.MotherFirstName = dsParentDetails.Tables[0].Rows[0]["MotherFirstName"].ToString();
                    objParentDetails.MotherMiddleName = dsParentDetails.Tables[0].Rows[0]["MotherMiddleName"].ToString();
                    objParentDetails.LastName = dsParentDetails.Tables[0].Rows[0]["LastName"].ToString();
                    objParentDetails.Father_Occupation = dsParentDetails.Tables[0].Rows[0]["Father_Occupation"].ToString();
                    objParentDetails.Mother_Occupation = dsParentDetails.Tables[0].Rows[0]["Mother_Occupation"].ToString();
                    objParentDetails.GuardiansFullName = dsParentDetails.Tables[0].Rows[0]["GuardiansFullName"].ToString();
                    objParentDetails.GuardiansOccupation = dsParentDetails.Tables[0].Rows[0]["GuardiansOccupation"].ToString();



                }
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
            return objParentDetails;
        }

        public FeesDetails GetFeesDetails(FeesDetails feesDetailsParams)
        {

            DataSet dsFeesDetails = null;
            FeesDetails objFeesDetails = null;
            try
            {
                connection = SQLConnection.GetConnection();
                dsFeesDetails = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@schoolID",feesDetailsParams.SchoolID), 
                   new SqlParameter("@studentID",feesDetailsParams.StudentID)
                };

                dsFeesDetails = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetFeesDetails, spParams);
                if (dsFeesDetails != null && dsFeesDetails.Tables.Count > 0 && dsFeesDetails.Tables[0].Rows.Count > 0)
                {
                    objFeesDetails = new FeesDetails();
                    objFeesDetails.FeeAmount = Convert.ToInt32(dsFeesDetails.Tables[0].Rows[0]["FeeAmount"]);
                    objFeesDetails.IsPaid = dsFeesDetails.Tables[0].Rows[0]["IsPaid"].ToString();
                    objFeesDetails.Date_of_payment = ((DateTime)dsFeesDetails.Tables[0].Rows[0]["Date_of_payment"]).ToString("M/d/yyyy");
                    objFeesDetails.Due_Date = ((DateTime)dsFeesDetails.Tables[0].Rows[0]["Due_Date"]).ToString("M/d/yyyy");
                    objFeesDetails.Mode_of_payment = dsFeesDetails.Tables[0].Rows[0]["Mode_of_payment"].ToString();
                    //objFeesDetails.Cheque_Number = Convert.ToInt32(dsFeesDetails.Tables[0].Rows[0]["Cheque_Number"]);

                    objFeesDetails.Cheque_Number = dsFeesDetails.Tables[0].Rows[0]["Cheque_Number"].Equals(DBNull.Value) ? 0 : Convert.ToInt32(dsFeesDetails.Tables[0].Rows[0]["Cheque_Number"]);
                    objFeesDetails.DD_Number = dsFeesDetails.Tables[0].Rows[0]["DD_Number"].Equals(DBNull.Value) ? 0 : Convert.ToInt32(dsFeesDetails.Tables[0].Rows[0]["DD_Number"]);

                    //if (Convert.(dsFeesDetails.Tables[0].Rows[0]["DD_Number"]) == null)
                    //    objFeesDetails.DD_Number = 0;
                    //else
                    //    objFeesDetails.DD_Number = Convert.ToInt32(dsFeesDetails.Tables[0].Rows[0]["DD_Number"]);

                    objFeesDetails.Collectors_Name = dsFeesDetails.Tables[0].Rows[0]["Collectors_Name"].ToString();

                    //  schoolLogin.SchoolName = dsLoginEmpDetail.Tables[0].Rows[0]["SchoolName"].ToString();




                }
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
            return objFeesDetails;
        }

        public ResultDetails GetResultDetails(ResultDetails resultDetailsParams)
        {
            DataSet resultTable = null;
            ResultDetails objResultDetails = null;
            try
            {
                connection = SQLConnection.GetConnection();
                resultTable = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@schoolID",resultDetailsParams.schoolID), 
                   new SqlParameter("@studentID",resultDetailsParams.studentID),
                   new SqlParameter("@examTypeID",resultDetailsParams.examTypeID)
                };

                resultTable = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetResultDetails, spParams);

                objResultDetails = new ResultDetails();
                objResultDetails.subjectsArray = new SubjectWithMarks[resultTable.Tables[0].Rows.Count];

                foreach (DataTable table in resultTable.Tables)
                {
                    int i = 0;

                    foreach (DataRow dr in table.Rows)
                    {
                        SubjectWithMarks obj = new SubjectWithMarks();
                        obj.subName = dr["SubjectName"].ToString();
                        obj.totalMarks = Convert.ToInt32(dr["TotalMarks"]);
                        obj.securedMarks = Convert.ToInt32(dr["SecuredMarks"]);

                        objResultDetails.subjectsArray[i] = obj;
                        i++;
                    }
                }


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
            return objResultDetails;
        }

        public EventDetails GetEventDetails(EventDetails eventDetailsParams)
        {
            DataSet eventTable = null;
            EventDetails objEventDetails = null;
            try
            {
                connection = SQLConnection.GetConnection();
                eventTable = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@schoolID",eventDetailsParams.schoolID), 
                };

                eventTable = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetEventDetails, spParams);

                objEventDetails = new EventDetails();
                objEventDetails.eventsArray = new EventWithDate[eventTable.Tables[0].Rows.Count];

                foreach (DataTable table in eventTable.Tables)
                {
                    int i = 0;

                    foreach (DataRow dr in table.Rows)
                    {
                        EventWithDate obj = new EventWithDate();
                        obj.eventName = dr["EventName"].ToString();
                        obj.eventDate = ((DateTime)dr["EventDate"]).ToString("M/d/yyyy");

                        objEventDetails.eventsArray[i] = obj;
                        i++;
                    }
                }


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
            return objEventDetails;
        }


        public TransportDetails GetTransportDetails(TransportDetails transportDetailsParams)
        {

            DataSet dsTransportDetails = null;
            TransportDetails objTransportDetails = null;
            try
            {
                connection = SQLConnection.GetConnection();
                dsTransportDetails = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@schoolID",transportDetailsParams.schoolID), 
                   new SqlParameter("@studentID",transportDetailsParams.studentID)
                };

                dsTransportDetails = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetTransportDetails, spParams);
                if (dsTransportDetails != null && dsTransportDetails.Tables.Count > 0 && dsTransportDetails.Tables[0].Rows.Count > 0)
                {
                    if (dsTransportDetails.Tables[0].Rows[0]["TransportType"] == "Private")
                    {
                        objTransportDetails = new TransportDetails();
                        objTransportDetails.TransportType = "Private";
                    }
                    else
                    {
                        objTransportDetails = new TransportDetails();
                        objTransportDetails.TransportType = dsTransportDetails.Tables[0].Rows[0]["TransportType"].ToString();
                        objTransportDetails.RouteDescription = dsTransportDetails.Tables[0].Rows[0]["RouteDescription"].ToString();
                        objTransportDetails.VehicleNo = dsTransportDetails.Tables[0].Rows[0]["VehicleNo"].ToString();
                        objTransportDetails.DriverFirstName = dsTransportDetails.Tables[0].Rows[0]["DriverFirstName"].ToString();
                        objTransportDetails.DriverLastName = dsTransportDetails.Tables[0].Rows[0]["DriverLastName"].ToString();
                        objTransportDetails.DriverNumber = dsTransportDetails.Tables[0].Rows[0]["DriverNumber"].ToString();
                    }


                }
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
            return objTransportDetails;
        }

        public LibraryDetails GetLibraryDetails(LibraryDetails libraryDetailsParams)
        {
            DataSet booksTable = null;
            LibraryDetails objLibraryDetails = null;
            try
            {
                connection = SQLConnection.GetConnection();
                booksTable = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@schoolID",libraryDetailsParams.schoolID),
                   new SqlParameter("@bookName",libraryDetailsParams.bookName)
                };

                booksTable = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetLibraryDetails, spParams);

                if (booksTable != null && booksTable.Tables.Count > 0 && booksTable.Tables[0].Rows.Count > 0)
                {
                    objLibraryDetails = new LibraryDetails();
                    objLibraryDetails.booksArray = new Book[booksTable.Tables[0].Rows.Count];

                    foreach (DataTable table in booksTable.Tables)
                    {
                        int i = 0;

                        foreach (DataRow dr in table.Rows)
                        {
                            Book obj = new Book();
                            obj.bookTitle = dr["BookTitle"].ToString();
                            obj.isAvailable = dr["IsAvailable"].ToString();

                            objLibraryDetails.booksArray[i] = obj;
                            i++;
                        }
                    }
                }


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
            return objLibraryDetails;
        }

        public PeriodAttendance GetPeriodAttendance(PeriodAttendance periodAttendanceParams)
        {

            PeriodAttendance objPeriodAttendance = null;
            try
            {

                connection = SQLConnection.GetConnection();

                SqlParameter[] spParams = new SqlParameter[9];
                //{   
                //   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                //   new SqlParameter("@schoolID",monthlyAttendanceParams.schoolID), 
                //   new SqlParameter("@studentID",monthlyAttendanceParams.studentID),
                //   new SqlParameter("@month",monthlyAttendanceParams.monthNumber),

                //};

                spParams[0] = new SqlParameter("@schoolID", periodAttendanceParams.schoolID);
                spParams[1] = new SqlParameter("@studentID", periodAttendanceParams.studentID);
                spParams[2] = new SqlParameter("@startDay", periodAttendanceParams.startDay);
                spParams[3] = new SqlParameter("@startMonth", periodAttendanceParams.startMonth);
                spParams[4] = new SqlParameter("@startYear", periodAttendanceParams.startYear);
                spParams[5] = new SqlParameter("@endDay", periodAttendanceParams.endDay);
                spParams[6] = new SqlParameter("@endMonth", periodAttendanceParams.endMonth);
                spParams[7] = new SqlParameter("@endYear", periodAttendanceParams.endYear);

                SqlParameter outPutParameter = new SqlParameter();
                outPutParameter.ParameterName = "@result";
                outPutParameter.SqlDbType = System.Data.SqlDbType.NVarChar;
                outPutParameter.Direction = System.Data.ParameterDirection.Output;
                outPutParameter.Size = 50;

                spParams[8] = outPutParameter;




                object objStatus = SQLHelper.ExecuteScalar(connection, CommandType.StoredProcedure, SPName_Constants.GetPeriodAttendanceStatus, spParams);

                string status;

                if (objStatus == null)
                    status = "N/A";
                else
                    status = objStatus.ToString();

                objPeriodAttendance = new PeriodAttendance();

                objPeriodAttendance.status = status;




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
            return objPeriodAttendance;
            //return objMonthlyAttendance;
        }

        public PeriodsEachDayAttendance GetPeriodsEachDayAttendance(PeriodAttendance periodAttendanceParams)
        {
            DataSet periodsTable = null;
            PeriodsEachDayAttendance objPeriodsEachDayAttendance = null;
            try
            {
                connection = SQLConnection.GetConnection();
                periodsTable = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@schoolID",periodAttendanceParams.schoolID), 
                   new SqlParameter("@studentID",periodAttendanceParams.studentID),
                   new SqlParameter("@startDay",periodAttendanceParams.startDay),
                   new SqlParameter("@startMonth",periodAttendanceParams.startMonth),
                   new SqlParameter("@startYear",periodAttendanceParams.startYear),
                   new SqlParameter("@endDay",periodAttendanceParams.endDay),
                   new SqlParameter("@endMonth",periodAttendanceParams.endMonth),
                   new SqlParameter("@endYear",periodAttendanceParams.endYear)
                };

                periodsTable = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetPeriodsEachDayAttendance, spParams);

                objPeriodsEachDayAttendance = new PeriodsEachDayAttendance();
                objPeriodsEachDayAttendance.setOfDays = new EachDayAttendance[periodsTable.Tables[0].Rows.Count];

                foreach (DataTable table in periodsTable.Tables)
                {
                    int i = 0;

                    foreach (DataRow dr in table.Rows)
                    {
                        EachDayAttendance obj = new EachDayAttendance();
                        obj.day = Convert.ToInt32(dr["Day"]);
                        obj.month = Convert.ToInt32(dr["Month"]);
                        obj.year = Convert.ToInt32(dr["Year"]);
                        obj.isPresent = Convert.ToInt32(dr["IsPresent"]);

                        objPeriodsEachDayAttendance.setOfDays[i] = obj;
                        i++;
                    }
                }


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
            return objPeriodsEachDayAttendance;
        }

        public TillDateAttendance GetTillDateAttendance(TillDateAttendance tillDateAttendanceParams)
        {

            TillDateAttendance objTillDateAttendance = null;
            try
            {

                connection = SQLConnection.GetConnection();

                SqlParameter[] spParams = new SqlParameter[3];
                //{   
                //   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                //   new SqlParameter("@schoolID",monthlyAttendanceParams.schoolID), 
                //   new SqlParameter("@studentID",monthlyAttendanceParams.studentID),
                //   new SqlParameter("@month",monthlyAttendanceParams.monthNumber),

                //};

                spParams[0] = new SqlParameter("@schoolID", tillDateAttendanceParams.schoolID);
                spParams[1] = new SqlParameter("@studentID", tillDateAttendanceParams.studentID);


                SqlParameter outPutParameter = new SqlParameter();
                outPutParameter.ParameterName = "@result";
                outPutParameter.SqlDbType = System.Data.SqlDbType.NVarChar;
                outPutParameter.Direction = System.Data.ParameterDirection.Output;
                outPutParameter.Size = 50;

                spParams[2] = outPutParameter;




                object objStatus = SQLHelper.ExecuteScalar(connection, CommandType.StoredProcedure, SPName_Constants.GetTillDateAttendanceStatus, spParams);

                string status;

                if (objStatus == null)
                    status = "N/A";
                else
                    status = objStatus.ToString();

                objTillDateAttendance = new TillDateAttendance();

                objTillDateAttendance.status = status;




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
            return objTillDateAttendance;
            //return objMonthlyAttendance;
        }

        public TillDateEachDayAttendance GetTillDateEachDayAttendance(TillDateAttendance tillDateAttendanceParams)
        {
            DataSet tillDateTable = null;
            TillDateEachDayAttendance objTillDateEachDayAttendance = null;
            try
            {
                connection = SQLConnection.GetConnection();
                tillDateTable = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@schoolID",tillDateAttendanceParams.schoolID), 
                   new SqlParameter("@studentID",tillDateAttendanceParams.studentID),
                 
                };

                tillDateTable = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetTillDateEachDayAttendance, spParams);

                objTillDateEachDayAttendance = new TillDateEachDayAttendance();
                objTillDateEachDayAttendance.setOfDays = new EachDayAttendance[tillDateTable.Tables[0].Rows.Count];

                foreach (DataTable table in tillDateTable.Tables)
                {
                    int i = 0;

                    foreach (DataRow dr in table.Rows)
                    {
                        EachDayAttendance obj = new EachDayAttendance();
                        obj.day = Convert.ToInt32(dr["Day"]);
                        obj.month = Convert.ToInt32(dr["Month"]);
                        obj.year = Convert.ToInt32(dr["Year"]);
                        obj.isPresent = Convert.ToInt32(dr["IsPresent"]);

                        objTillDateEachDayAttendance.setOfDays[i] = obj;
                        i++;
                    }
                }


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
            return objTillDateEachDayAttendance;
        }

        public AddressDetails GetAddressDetails(AddressDetails addressDetailsParams)
        {

            DataSet dsAddressDetails = null;
            AddressDetails objAddressDetails = null;
            try
            {
                connection = SQLConnection.GetConnection();
                dsAddressDetails = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@schoolID",addressDetailsParams.schoolID), 
                   new SqlParameter("@studentID",addressDetailsParams.studentID)
                };

                dsAddressDetails = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetAddressDetails, spParams);
                if (dsAddressDetails != null && dsAddressDetails.Tables.Count > 0 && dsAddressDetails.Tables[0].Rows.Count > 0)
                {
                    objAddressDetails = new AddressDetails();
                    objAddressDetails.houseNoName = dsAddressDetails.Tables[0].Rows[0]["HouseNoName"].ToString();
                    objAddressDetails.streetName = dsAddressDetails.Tables[0].Rows[0]["StreetName"].ToString();
                    objAddressDetails.area = dsAddressDetails.Tables[0].Rows[0]["Area"].ToString();
                    objAddressDetails.city = dsAddressDetails.Tables[0].Rows[0]["City"].ToString();
                    objAddressDetails.pinCode = Convert.ToInt32(dsAddressDetails.Tables[0].Rows[0]["Pincode"].ToString());
                    objAddressDetails.state = dsAddressDetails.Tables[0].Rows[0]["States"].ToString();

                }
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
            return objAddressDetails;
        }

        public ClassStudentNames GetClassStudentNames(ClassStudentNames classStudentNamesParams)
        {

            DataSet dsStudentNames = null;
            ClassStudentNames objClassStudentNames = null;
            try
            {
                connection = SQLConnection.GetConnection();
                dsStudentNames = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@schoolID",classStudentNamesParams.schoolID), 
                   new SqlParameter("@standard",classStudentNamesParams.standard),
                   new SqlParameter("@section",classStudentNamesParams.section)
                };

                dsStudentNames = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetClassStudentNames, spParams);

                objClassStudentNames = new ClassStudentNames();
                objClassStudentNames.studentNames = new Student[dsStudentNames.Tables[0].Rows.Count];

                foreach (DataTable table in dsStudentNames.Tables)
                {
                    int i = 0;

                    foreach (DataRow dr in table.Rows)
                    {
                        Student obj = new Student();
                        obj.firstName = dr["FirstName"].ToString();
                        obj.middleName = dr["StudentMiddleName"].ToString();
                        obj.lastName = dr["LastName"].ToString();
                        obj.rollNo = Convert.ToInt32(dr["RollNumber"]);
                        obj.studentID = Convert.ToInt32(dr["StudentId"]);

                        objClassStudentNames.studentNames[i] = obj;
                        i++;
                    }
                }
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
            return objClassStudentNames;
        }

        public void SetClassAttendance(SetAttendanceParams[] students)
        {
            try
            {
                connection = SQLConnection.GetConnection();

                for (int i = 0; i < students.Length; i++)
                {
                    SqlParameter[] spParams = new SqlParameter[]
                    {   
                        new SqlParameter("@schoolID",students[i].schoolID),                   
                        new SqlParameter("@studentID",students[i].studentID), 
                        new SqlParameter("@year",students[i].year),
                        new SqlParameter("@month",students[i].month),
                        new SqlParameter("@day",students[i].day),
                        new SqlParameter("@isPresent",students[i].isPresent)
                    };


                    int result = SQLHelper.ExecuteNonQuery(connection, CommandType.StoredProcedure, SPName_Constants.SetClassAttendance, spParams);
                }
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

        public ContactDetails GetContactDetails(ContactDetails contactDetailsParams)
        {

            DataSet dsContactDetails = null;
            ContactDetails objContactDetails = null;
            try
            {
                connection = SQLConnection.GetConnection();
                dsContactDetails = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@schoolID",contactDetailsParams.schoolID), 
                   new SqlParameter("@studentID",contactDetailsParams.studentID)
                };

                dsContactDetails = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetContactDetails, spParams);
                if (dsContactDetails != null && dsContactDetails.Tables.Count > 0 && dsContactDetails.Tables[0].Rows.Count > 0)
                {
                    objContactDetails = new ContactDetails();
                    objContactDetails.mobileNumber = dsContactDetails.Tables[0].Rows[0]["MobileNumber"].ToString();
                    objContactDetails.landLineNumber = dsContactDetails.Tables[0].Rows[0]["LandLineNumber"].ToString();
                    objContactDetails.emailID = dsContactDetails.Tables[0].Rows[0]["EmailID"].ToString();
                    objContactDetails.emergencyNumber = dsContactDetails.Tables[0].Rows[0]["EmergencyNumber"].ToString();


                }
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
            return objContactDetails;
        }

        public AddressDetails GetStaffAddressDetails(AddressDetails staffAddressDetailsParams)
        {

            DataSet dsAddressDetails = null;
            AddressDetails objAddressDetails = null;
            try
            {
                connection = SQLConnection.GetConnection();
                dsAddressDetails = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@schoolID",staffAddressDetailsParams.schoolID), 
                   new SqlParameter("@employeeID",staffAddressDetailsParams.employeeID)
                };

                dsAddressDetails = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetStaffAddressDetails, spParams);
                if (dsAddressDetails != null && dsAddressDetails.Tables.Count > 0 && dsAddressDetails.Tables[0].Rows.Count > 0)
                {
                    objAddressDetails = new AddressDetails();
                    objAddressDetails.houseNoName = dsAddressDetails.Tables[0].Rows[0]["HouseNoName"].ToString();
                    objAddressDetails.streetName = dsAddressDetails.Tables[0].Rows[0]["StreetName"].ToString();
                    objAddressDetails.area = dsAddressDetails.Tables[0].Rows[0]["Area"].ToString();
                    objAddressDetails.city = dsAddressDetails.Tables[0].Rows[0]["City"].ToString();
                    objAddressDetails.pinCode = Convert.ToInt32(dsAddressDetails.Tables[0].Rows[0]["Pincode"].ToString());
                    objAddressDetails.state = dsAddressDetails.Tables[0].Rows[0]["States"].ToString();

                }
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
            return objAddressDetails;
        }

        public ContactDetails GetStaffContactDetails(ContactDetails staffContactDetailsParams)
        {

            DataSet dsContactDetails = null;
            ContactDetails objContactDetails = null;
            try
            {
                connection = SQLConnection.GetConnection();
                dsContactDetails = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   /*new SqlParameter("@AffiliationNumber",schoolLoginInformationEntity.AffiliationNumber),*/                   
                   new SqlParameter("@schoolID",staffContactDetailsParams.schoolID), 
                   new SqlParameter("@employeeID",staffContactDetailsParams.employeeID)
                };

                dsContactDetails = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetStaffContactDetails, spParams);
                if (dsContactDetails != null && dsContactDetails.Tables.Count > 0 && dsContactDetails.Tables[0].Rows.Count > 0)
                {
                    objContactDetails = new ContactDetails();
                    objContactDetails.mobileNumber = dsContactDetails.Tables[0].Rows[0]["MobileNumber"].ToString();
                    objContactDetails.landLineNumber = dsContactDetails.Tables[0].Rows[0]["LandLineNumber"].ToString();
                    objContactDetails.emailID = dsContactDetails.Tables[0].Rows[0]["EmailID"].ToString();
                    objContactDetails.emergencyNumber = dsContactDetails.Tables[0].Rows[0]["EmergencyNumber"].ToString();


                }
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
            return objContactDetails;
        }

        /// <summary>
        /// To get sections to update.
        /// </summary>
        /// <returns></returns>
        public DataSet GetSectionToUpdate()
        {
            DataSet dsSectionToUpdate = null;
            try
            {
                connection = SQLConnection.GetConnection();
                dsSectionToUpdate = new DataSet();
                dsSectionToUpdate = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetSectionToUpdate);
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
            return dsSectionToUpdate;
        }

        /// <summary>
        /// To insert and update section values.
        /// </summary>
        /// <param name="schoolSectionValuesEntity"></param>
        /// <returns></returns>
        public void InsertUpdateSectionToUpdate(SchoolSectionValues schoolSectionValuesEntity)
        {
            try
            {
                connection = SQLConnection.GetConnection();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   new SqlParameter("@SchoolId",schoolSectionValuesEntity.SchoolId),                   
                   new SqlParameter("@SectionId",schoolSectionValuesEntity.SectionId), 
                   new SqlParameter("@SectionValue",schoolSectionValuesEntity.SectionValue)
                };

                int result = SQLHelper.ExecuteNonQuery(connection, CommandType.StoredProcedure, SPName_Constants.InsertUpdateSchoolSectionValues, spParams);

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

        /// <summary>
        /// To Get value of selected Section.
        /// </summary>
        /// <param name="SectionId"></param>
        /// <returns></returns>
        public SchoolSectionValues GetSelectedSectionValue(SchoolSectionValues schoolSectionIDEntity)
        {
            DataSet dsSelectedSection = null;
            SchoolSectionValues objSchoolSectionValues = null;
            try
            {
                connection = SQLConnection.GetConnection();
                dsSelectedSection = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                    new SqlParameter("@SchoolId",schoolSectionIDEntity.SchoolId),
                    new SqlParameter("@SectionId",schoolSectionIDEntity.SectionId)
                };

                dsSelectedSection = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetSelectedSectionValue, spParams);

                if (dsSelectedSection != null && dsSelectedSection.Tables.Count > 0 && dsSelectedSection.Tables[0].Rows.Count > 0)
                {
                    objSchoolSectionValues = new SchoolSectionValues();
                    objSchoolSectionValues.SectionValue = dsSelectedSection.Tables[0].Rows[0]["SectionValue"].ToString();
                }
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
            return objSchoolSectionValues;
        }

        /// <summary>
        /// To get the school name and school logo.
        /// </summary>
        /// <param name="schoolLogoInfoEntity"></param>
        /// <returns></returns>
        public SchoolLogoEntity GetSchoollogoWithName(SchoolLogoEntity schoolLogoInfoEntity)
        {
            DataSet dsSchoolLogo = null;
            SchoolLogoEntity objSchoolLogo = null;
            try
            {
                connection = SQLConnection.GetConnection();
                dsSchoolLogo = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                    new SqlParameter("@SchoolID",schoolLogoInfoEntity.SchoolID)
                    
                };

                dsSchoolLogo = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetSchoollogoWithName, spParams);

                if (dsSchoolLogo != null && dsSchoolLogo.Tables.Count > 0 && dsSchoolLogo.Tables[0].Rows.Count > 0)
                {
                    objSchoolLogo = new SchoolLogoEntity();
                    objSchoolLogo.SchoolName = dsSchoolLogo.Tables[0].Rows[0]["SchoolName"].ToString();
                    byte[] LogoBinary = (byte[])dsSchoolLogo.Tables[0].Rows[0]["Logo"];
                    objSchoolLogo.Logo = Convert.ToBase64String(LogoBinary);
                }
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
            return objSchoolLogo;
        }

        public void NewBookEntry(LibraryBook newBookEntryParams)
        {
            try
            {
                connection = SQLConnection.GetConnection();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   new SqlParameter("@schoolID",newBookEntryParams.schoolID), 
                   new SqlParameter("@bookID",newBookEntryParams.bookID),
                   new SqlParameter("@title",newBookEntryParams.title), 
                   new SqlParameter("@author",newBookEntryParams.author),
                   new SqlParameter("@publisher",newBookEntryParams.publisher),
                   new SqlParameter("@MRP",newBookEntryParams.MRP),
                   new SqlParameter("@cost",newBookEntryParams.cost),
                   new SqlParameter("@yearOfPurchase",newBookEntryParams.yearOfPurchase),
                };

                int result = SQLHelper.ExecuteNonQuery(connection, CommandType.StoredProcedure, SPName_Constants.InsertNewLibraryBook, spParams);

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

        public int DeleteBook(LibraryBook deleteBookParams)
        {
            int result;
            try
            {
                connection = SQLConnection.GetConnection();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   new SqlParameter("@schoolID",deleteBookParams.schoolID), 
                   new SqlParameter("@bookID",deleteBookParams.bookID)
                };

                result = SQLHelper.ExecuteNonQuery(connection, CommandType.StoredProcedure, SPName_Constants.DeleteLibraryBook, spParams);

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
            return result;
        }

        public int IssueBook(IssueBook issueBookParams)
        {
            int result;
            try
            {
                connection = SQLConnection.GetConnection();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   new SqlParameter("@schoolID",issueBookParams.schoolID), 
                   new SqlParameter("@bookID",issueBookParams.bookID),
                   new SqlParameter("@loanDate",issueBookParams.loanDate),
                   new SqlParameter("@dueDays",issueBookParams.dueDays),
                   new SqlParameter("@dueDate",issueBookParams.dueDate),
                   new SqlParameter("@regID",issueBookParams.regID),
                   new SqlParameter("@type",issueBookParams.type)
                };

                result = SQLHelper.ExecuteNonQuery(connection, CommandType.StoredProcedure, SPName_Constants.IssueLibraryBook, spParams);

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
            return result;
        }

        public double ReceiveBook(BorrowedBook receiveBookParams)
        {
            object result;
            double duePerBook;
            try
            {
                connection = SQLConnection.GetConnection();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   new SqlParameter("@schoolID",receiveBookParams.schoolID), 
                   new SqlParameter("@bookID",receiveBookParams.bookID),
                   new SqlParameter("@regID",receiveBookParams.regID),
                   new SqlParameter("@type",receiveBookParams.type)
                };

                result = SQLHelper.ExecuteScalar(connection, CommandType.StoredProcedure, SPName_Constants.ReceiveLibraryBook, spParams);

                if (result == null)
                {
                    duePerBook = -1;
                }
                else
                {
                    DateTime dueDate = (DateTime)result;
                    DateTime returnDate = DateTime.ParseExact(receiveBookParams.returnDate, "dd-MM-yyyy", null);

                    if (returnDate.Date > dueDate.Date)
                    {
                        double daysDiff = (returnDate - dueDate).TotalDays;
                        duePerBook = (double)receiveBookParams.perDayDueCharge * daysDiff;
                    }
                    else
                    {
                        duePerBook = 0;
                    }
                }
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
            return duePerBook;
        }


        public string StudentRegistration(StudentRegistrationDetails studentRegistrationDetails)
        {
            object regNo;
            string result;

            try
            {
                connection = SQLConnection.GetConnection();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   new SqlParameter("@schoolID",studentRegistrationDetails.schoolID), 
                   new SqlParameter("@regNoUpdate",studentRegistrationDetails.regNo),
                   new SqlParameter("@firstName",studentRegistrationDetails.firstName),
                   new SqlParameter("@middleName",studentRegistrationDetails.middleName), 
                   new SqlParameter("@lastName",studentRegistrationDetails.lastName),
                   new SqlParameter("@DOB",studentRegistrationDetails.DOB),
                   new SqlParameter("@gender",studentRegistrationDetails.gender),
                   new SqlParameter("@bloodGroup",studentRegistrationDetails.bloodGroup),
                   new SqlParameter("@standard",studentRegistrationDetails.standard),
                   new SqlParameter("@section",studentRegistrationDetails.section),
                   new SqlParameter("@academicYear",studentRegistrationDetails.academicYear),
                   new SqlParameter("@fatherFirstName",studentRegistrationDetails.fatherFirstName),
                   new SqlParameter("@fatherMiddleName",studentRegistrationDetails.fatherMiddleName),
                   new SqlParameter("@motherFirstName",studentRegistrationDetails.motherFirstName),
                   new SqlParameter("@motherMiddleName",studentRegistrationDetails.motherMiddleName),
                   new SqlParameter("@parentLastName",studentRegistrationDetails.parentLastName),
                   new SqlParameter("@fatherOccupation",studentRegistrationDetails.fatherOccupation),
                   new SqlParameter("@motherOccupation",studentRegistrationDetails.motherOccupation),
                   new SqlParameter("@guardianName",studentRegistrationDetails.guardianName),
                   new SqlParameter("@guardianOccupation",studentRegistrationDetails.guardianOccupation),
                   new SqlParameter("@houseNumber",studentRegistrationDetails.houseNumber),
                   new SqlParameter("@streetName",studentRegistrationDetails.streetName),
                   new SqlParameter("@area",studentRegistrationDetails.area),
                   new SqlParameter("@city",studentRegistrationDetails.city),
                   new SqlParameter("@state",studentRegistrationDetails.state),
                   new SqlParameter("@pinCode",studentRegistrationDetails.pinCode),
                   new SqlParameter("@mobileNumber",studentRegistrationDetails.mobileNumber),
                   new SqlParameter("@landlineNumber",studentRegistrationDetails.landlineNumber),
                   new SqlParameter("@emailID",studentRegistrationDetails.emailID),
                   new SqlParameter("@emergencyNumber",studentRegistrationDetails.emergencyNumber),
                   new SqlParameter("@transportType",studentRegistrationDetails.transportType),
                   new SqlParameter("@routeDescription",studentRegistrationDetails.routeDescription),
                   new SqlParameter("@driverRegID",studentRegistrationDetails.driverRegID),
                   new SqlParameter("@vehicleNumber",studentRegistrationDetails.vehicleNumber)                   
                };

                regNo = SQLHelper.ExecuteScalar(connection, CommandType.StoredProcedure, SPName_Constants.StudentRegistration, spParams);

                if (regNo == null)
                    result = "Registration Failed, Inappropriate data!";
                else
                    result = regNo.ToString();

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
            return result;
        }

        public List<SearchStudentEntity> SearchStudent(StudentDetailsEntity searchStudentParams)
        {
            DataSet dsResult = null;
            SearchStudentEntity objSearchStudentEntity = null;
            List<SearchStudentEntity> searchStudentEntityList = new List<SearchStudentEntity>();
            try
            {
                connection = SQLConnection.GetConnection();
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter("@schoolID",searchStudentParams.schoolID),
                    new SqlParameter("@academicYear",searchStudentParams.academicYear),
                    new SqlParameter("@standard",searchStudentParams.standardID),
                    new SqlParameter("@section",searchStudentParams.sectionID)
                };

                dsResult = new DataSet();

                dsResult = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.SearchStudent, parameters);
                if (dsResult != null && dsResult.Tables.Count > 0 && dsResult.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsResult.Tables[0].Rows)
                    {
                        objSearchStudentEntity = new SearchStudentEntity();
                        objSearchStudentEntity.FirstName = Convert.ToString(dr["FirstName"]);
                        objSearchStudentEntity.MiddleName = Convert.ToString(dr["StudentMiddleName"]);
                        objSearchStudentEntity.LastName = Convert.ToString(dr["LastName"]);
                        objSearchStudentEntity.AcademicYear = Convert.ToString(dr["AcademicYear"]);
                        objSearchStudentEntity.RollNumber = Convert.ToString(dr["RollNumber"]);
                        objSearchStudentEntity.Standard = Convert.ToString(dr["StandardId"]);

                        objSearchStudentEntity.Section = Convert.ToString(dr["Section"]);
                        if (dr["DateOfBirth"] == DBNull.Value)
                            objSearchStudentEntity.DOB = "";
                        else
                            objSearchStudentEntity.DOB = ((DateTime)dr["DateOfBirth"]).ToString("dd/MM/yyyy");
                        objSearchStudentEntity.Gender = Convert.ToString(dr["Gender"]);
                        objSearchStudentEntity.BloodGroup = Convert.ToString(dr["BloodGroup"]);
                        objSearchStudentEntity.RegNo = Convert.ToString(dr["StudentRegNo"]);

                        searchStudentEntityList.Add(objSearchStudentEntity);
                    }
                }
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
            return searchStudentEntityList;
        }

        public StudentRegistrationDetails GetStudentCompleteDetails(StudentRegistrationDetails studentCompleteDetailsParams)
        {
            DataSet dsResult = null;
            StudentRegistrationDetails objStudentCompleteDetails = null;
        
            try
            {
                connection = SQLConnection.GetConnection();
                SqlParameter[] parameters = new SqlParameter[]
                {
                    new SqlParameter("@schoolID",studentCompleteDetailsParams.schoolID),
                    new SqlParameter("@regNo",studentCompleteDetailsParams.regNo)
                };

                dsResult = new DataSet();

                dsResult = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetStudentCompleteDetails, parameters);
                if (dsResult != null && dsResult.Tables.Count > 0 && dsResult.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsResult.Tables[0].Rows)
                    {
                        objStudentCompleteDetails = new StudentRegistrationDetails();
                        objStudentCompleteDetails.firstName = Convert.ToString(dr["FirstName"]);
                        objStudentCompleteDetails.middleName = Convert.ToString(dr["StudentMiddleName"]);
                        objStudentCompleteDetails.lastName = Convert.ToString(dr["LastName"]);
                        objStudentCompleteDetails.academicYear = Convert.ToString(dr["AcademicYear"]);
                        objStudentCompleteDetails.rollNumber = Convert.ToString(dr["RollNumber"]);
                        objStudentCompleteDetails.standard = Convert.ToString(dr["StandardId"]);

                        objStudentCompleteDetails.section = Convert.ToString(dr["Section"]);
                        if (dr["DateOfBirth"] == DBNull.Value)
                            objStudentCompleteDetails.DOB = "";
                        else
                            objStudentCompleteDetails.DOB = ((DateTime)dr["DateOfBirth"]).ToString("yyyy-M-d");
                        objStudentCompleteDetails.gender = Convert.ToString(dr["Gender"]);
                        objStudentCompleteDetails.bloodGroup = Convert.ToString(dr["BloodGroup"]);
                        objStudentCompleteDetails.regNo = Convert.ToString(dr["StudentRegNo"]);

                        objStudentCompleteDetails.fatherFirstName = Convert.ToString(dr["FatherFirstName"]);
                        objStudentCompleteDetails.fatherMiddleName = Convert.ToString(dr["FatherMiddleName"]);
                        objStudentCompleteDetails.motherFirstName = Convert.ToString(dr["MotherFirstName"]);
                        objStudentCompleteDetails.motherMiddleName = Convert.ToString(dr["MotherMiddleName"]);
                        objStudentCompleteDetails.parentLastName = Convert.ToString(dr["LastName"]);
                        objStudentCompleteDetails.fatherOccupation = Convert.ToString(dr["FatherOccupationDesc"]);
                        objStudentCompleteDetails.motherOccupation = Convert.ToString(dr["MotherOccupationDesc"]);
                        objStudentCompleteDetails.guardianName = Convert.ToString(dr["GuardiansFullName"]);
                        objStudentCompleteDetails.guardianOccupation = Convert.ToString(dr["GuardiansOccupation"]);

                        objStudentCompleteDetails.houseNumber = Convert.ToString(dr["HouseNoName"]);
                        objStudentCompleteDetails.streetName = Convert.ToString(dr["StreetName"]);
                        objStudentCompleteDetails.area = Convert.ToString(dr["Area"]);
                        objStudentCompleteDetails.city = Convert.ToString(dr["City"]);
                        objStudentCompleteDetails.state = Convert.ToString(dr["States"]);
                        objStudentCompleteDetails.pinCode = Convert.ToString(dr["PinCode"]);

                        objStudentCompleteDetails.mobileNumber = Convert.ToString(dr["MobileNumber"]);
                        objStudentCompleteDetails.landlineNumber = Convert.ToString(dr["LandNumber"]);
                        objStudentCompleteDetails.emailID = Convert.ToString(dr["EmailID"]);
                        objStudentCompleteDetails.emergencyNumber = Convert.ToString(dr["EmergencyNumber"]);

                        objStudentCompleteDetails.transportType = Convert.ToString(dr["TransportType"]);
                        objStudentCompleteDetails.routeDescription = Convert.ToString(dr["RouteDescription"]);
                        objStudentCompleteDetails.driverRegID = Convert.ToString(dr["DriverRegNo"]);
                        objStudentCompleteDetails.vehicleNumber = Convert.ToString(dr["VehicleNo"]);



                    }
                }
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
            return objStudentCompleteDetails;
        }

        /// <summary>
        /// To register a new employee.
        /// </summary>
        /// <param name="employeeDetailsRegistrationEntity"></param>
        public void GetEmployeeRegistration(EmployeeRegistrationEntity employeeDetailsRegistrationEntity)
        {

            try
            {
                connection = SQLConnection.GetConnection();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   new SqlParameter("@SchoolID",employeeDetailsRegistrationEntity.SchoolID),                   
                   //new SqlParameter("@EmpID",employeeDetailsRegistrationEntity.EmpID), 
                   new SqlParameter("@EmpFirstName",employeeDetailsRegistrationEntity.FirstName),
                   new SqlParameter("@EmpMiddleName",employeeDetailsRegistrationEntity.EmpMiddleName),
                   new SqlParameter("@EmpLastName",employeeDetailsRegistrationEntity.LastName),
                   new SqlParameter("@Qualification",employeeDetailsRegistrationEntity.Qualification),
                   new SqlParameter("@DateOfBirth",employeeDetailsRegistrationEntity.DateOfBirth),
                   new SqlParameter("@DateOfJoining",employeeDetailsRegistrationEntity.DateOfJoining),
                   new SqlParameter("@Gender",employeeDetailsRegistrationEntity.Gender),
                   new SqlParameter("@BloodGroup",employeeDetailsRegistrationEntity.BloodGroup),
                   new SqlParameter("@HouseNoName",employeeDetailsRegistrationEntity.HouseNoName),
                   new SqlParameter("@StreetName",employeeDetailsRegistrationEntity.StreetName),
                   new SqlParameter("@Area",employeeDetailsRegistrationEntity.Area),
                   new SqlParameter("@City",employeeDetailsRegistrationEntity.City),
                   new SqlParameter("@States",employeeDetailsRegistrationEntity.States),
                   new SqlParameter("@Pincode",employeeDetailsRegistrationEntity.Pincode),
                   new SqlParameter("@MobileNumber",employeeDetailsRegistrationEntity.MobileNumber),
                   new SqlParameter("@LandNumber",employeeDetailsRegistrationEntity.LandNumber),
                   new SqlParameter("@EmailID",employeeDetailsRegistrationEntity.EmailID),
                   new SqlParameter("@EmergencyNumber",employeeDetailsRegistrationEntity.EmergencyNumber),
                   new SqlParameter("@TypeName",employeeDetailsRegistrationEntity.TypeName)
                };

                int result = SQLHelper.ExecuteNonQuery(connection, CommandType.StoredProcedure, SPName_Constants.GetEmployeeRegistration, spParams);

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

        /// <summary>
        /// To Transfer a Section Of The Student.
        /// </summary>
        /// <param name="sectionTransferEntity"></param>
        public void GetSectionTransfer(SectionTransferEntity sectionTransferEntity)
        {

            try
            {
                connection = SQLConnection.GetConnection();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   new SqlParameter("@SchoolID",sectionTransferEntity.SchoolID),                   
                   new SqlParameter("@StudentRegNo",sectionTransferEntity.StudentRegNo),
                   new SqlParameter("@SectionID",sectionTransferEntity.SectionID),
                   new SqlParameter("@AcademicYearId",sectionTransferEntity.AcademicYearId),
                   new SqlParameter("@StandardId",sectionTransferEntity.StandardId),
                   
                };

                int result = SQLHelper.ExecuteNonQuery(connection, CommandType.StoredProcedure, SPName_Constants.GetSectionTransfer, spParams);

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

        /// <summary>
        /// To Promotion Class Of The Student.
        /// </summary>
        /// <param name="classPromotionEntity"></param>
        public void GetClassPromotion(ClassPromotionEntity classPromotionEntity)
        {

            try
            {
                connection = SQLConnection.GetConnection();

                foreach (string regNo in classPromotionEntity.regNoArray)
                {

                    SqlParameter[] spParams = new SqlParameter[]
                    {   
                        new SqlParameter("@SchoolID",classPromotionEntity.SchoolID),                   
                        new SqlParameter("@StudentRegNo",regNo),
                        new SqlParameter("@SectionID",classPromotionEntity.SectionID),
                        new SqlParameter("@AcademicYearId",classPromotionEntity.AcademicYearId),
                        new SqlParameter("@StandardId",classPromotionEntity.StandardId),
                   
                    };

                    int result = SQLHelper.ExecuteNonQuery(connection, CommandType.StoredProcedure, SPName_Constants.GetClassPromotion, spParams);
                }

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
    }
}

