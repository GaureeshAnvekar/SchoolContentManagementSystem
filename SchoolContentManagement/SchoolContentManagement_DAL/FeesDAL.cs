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
    /// Description: This class is used to provide school fees details.
    /// Author: Robin Apoto
    /// Date: 10/May/2016.
    /// </summary>
    public class FeesDAL
    {
        #region Variable Declaration
        SqlConnection connection = null;
        #endregion

        /// <summary>
        /// Get list of account head type.
        /// </summary>
        /// <param name="accountHeadTypeEntity"></param>
        /// <returns></returns>
        public List<AccountHeadTypeEntity> GetSchoolFeeTypes()
        {
            DataSet dsAccountHeadType = null;
            AccountHeadTypeEntity accountHeadType = null;
            List<AccountHeadTypeEntity> lstAccountHeadType = new List<AccountHeadTypeEntity>();
            try
            {
                connection = SQLConnection.GetConnection();
                dsAccountHeadType = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                { 
                };

                dsAccountHeadType = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetSchoolFeeTypes, spParams);
                if (dsAccountHeadType != null && dsAccountHeadType.Tables.Count > 0 && dsAccountHeadType.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsAccountHeadType.Tables[0].Rows)
                    {
                        accountHeadType = new AccountHeadTypeEntity();
                        accountHeadType.Id = Convert.ToInt32(dr["Id"]);
                        accountHeadType.Desc = dr["Desc"].ToString();
                        lstAccountHeadType.Add(accountHeadType);
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
            return lstAccountHeadType;
        }

        /// <summary>
        /// To get list of academic years.
        /// </summary>
        /// <returns></returns>
        public List<AcademicYearEntity> GetAcademicYear()
        {
            DataSet dsResult = null;
            AcademicYearEntity academicYear = null;
            List<AcademicYearEntity> lstacademicYear = new List<AcademicYearEntity>();
            try
            {
                connection = SQLConnection.GetConnection();
                dsResult = new DataSet();
                dsResult = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetAcademicYear, null);
                if (dsResult != null && dsResult.Tables.Count > 0 && dsResult.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsResult.Tables[0].Rows)
                    {
                        academicYear = new AcademicYearEntity();
                        academicYear.Id = Convert.ToInt32(dr["Id"]);
                        academicYear.AcademicYear = dr["AcademicYear"].ToString();
                        lstacademicYear.Add(academicYear);
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
            return lstacademicYear;
        }

        /// <summary>
        /// To get list of standards.
        /// </summary>
        /// <returns></returns>
        public List<StandardEntity> GetStandardDetails()
        {
            DataSet dsResult = null;
            StandardEntity standardEntity = null;
            List<StandardEntity> lststandardEntity = new List<StandardEntity>();
            try
            {
                connection = SQLConnection.GetConnection();
                dsResult = new DataSet();
                dsResult = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetStandardDetails, null);
                if (dsResult != null && dsResult.Tables.Count > 0 && dsResult.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsResult.Tables[0].Rows)
                    {
                        standardEntity = new StandardEntity();
                        standardEntity.Id = Convert.ToInt32(dr["Id"]);
                        standardEntity.Standard = dr["Standard"].ToString();
                        lststandardEntity.Add(standardEntity);
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
            return lststandardEntity;
        }


        public List<OccupationEntity> GetOccupationDetails()
        {
            DataSet dsResult = null;
            OccupationEntity occupationEntity = null;
            List<OccupationEntity> occupationEntityList = new List<OccupationEntity>();
            try
            {
                connection = SQLConnection.GetConnection();
                dsResult = new DataSet();
                dsResult = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetOccupationDetails, null);
                if (dsResult != null && dsResult.Tables.Count > 0 && dsResult.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsResult.Tables[0].Rows)
                    {
                        occupationEntity = new OccupationEntity();
                        occupationEntity.ID = Convert.ToInt32(dr["OccupationID"]);
                        occupationEntity.occupation = dr["OccupationDescription"].ToString();
                        occupationEntityList.Add(occupationEntity);
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
            return occupationEntityList;
        }

        /// <summary>
        /// To get list of collection period.
        /// </summary>
        /// <returns></returns>
        public List<FeeCollectionPeriodEntity> GetCollectionPeriodDetails()
        {
            DataSet dsResult = null;
            FeeCollectionPeriodEntity collectionEntity = null;
            List<FeeCollectionPeriodEntity> lstCollectionEntity = new List<FeeCollectionPeriodEntity>();
            try
            {
                connection = SQLConnection.GetConnection();
                dsResult = new DataSet();
                dsResult = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetCollectionPeriod, null);
                if (dsResult != null && dsResult.Tables.Count > 0 && dsResult.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsResult.Tables[0].Rows)
                    {
                        collectionEntity = new FeeCollectionPeriodEntity();
                        collectionEntity.Id = Convert.ToInt32(dr["Id"]);
                        collectionEntity.Desc = dr["Desc"].ToString();
                        collectionEntity.ShortDesc = dr["ShortDesc"].ToString();
                        lstCollectionEntity.Add(collectionEntity);
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
            return lstCollectionEntity;
        }

        /// <summary>
        /// To insert and update fee setup.
        /// </summary>
        /// <param name="feeTypeEntity"></param>
        public FeeTypeEntity SetupFeeType(FeeTypeEntity feeTypeEntity)
        {
            FeeTypeEntity feeType = new FeeTypeEntity();
            try
            {
                connection = SQLConnection.GetConnection();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   new SqlParameter("@FeesAccountHeadTypeId",feeTypeEntity.FeesAccountHeadTypeId),
                   new SqlParameter("@SchoolId",feeTypeEntity.SchoolId),
                   new SqlParameter("@StandardId",feeTypeEntity.StandardId),
                   new SqlParameter("@AcademicYear",feeTypeEntity.AcademicYear),
                   new SqlParameter("@FeeCollectionPeriodId",feeTypeEntity.FeeCollectionPeriodId),
                   new SqlParameter("@StartDate",feeTypeEntity.StartDate),
                   new SqlParameter("@EndDate",feeTypeEntity.EndDate),
                   new SqlParameter("@FeeAmount",feeTypeEntity.FeeAmount)
                };

                int result = Convert.ToInt32(SQLHelper.ExecuteNonQuery(connection, CommandType.StoredProcedure, SPName_Constants.InsertUpdateSchoolFeesType, spParams));

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
            return feeType;
        }

        /// <summary>
        /// To get fees type amount details.
        /// </summary>
        /// <param name="feesTypeEntity"></param>
        /// <returns></returns>
        public List<FeesTypeAndAmountEntity> GetFeesTypeAndAmountDetails(FeesTypeAndAmountEntity feesTypeEntity)
        {
            DataSet dsResult = null;
            FeesTypeAndAmountEntity feesTypeAndAmountEntity = null;
            List<FeesTypeAndAmountEntity> lstfeesTypeAndAmountEntity = new List<FeesTypeAndAmountEntity>();
            try
            {
                connection = SQLConnection.GetConnection();
                dsResult = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                { 
                   new SqlParameter("@SchoolId",feesTypeEntity.SchoolId),
                   new SqlParameter("@StandardId",feesTypeEntity.StandardId),
                   new SqlParameter("@AcademicYear",feesTypeEntity.AcademicYear)                   
                };

                dsResult = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetFeesTypeAndAmount, spParams);
                if (dsResult != null && dsResult.Tables.Count > 0 && dsResult.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsResult.Tables[0].Rows)
                    {
                        feesTypeAndAmountEntity = new FeesTypeAndAmountEntity();
                        feesTypeAndAmountEntity.FeeAccountHeadId = Convert.ToInt32(dr["FeeAccountHeadId"]);
                        feesTypeAndAmountEntity.FeeAccountHeadDesc = dr["FeeAccountHeadDesc"].ToString();
                        feesTypeAndAmountEntity.FeeCollectionPeriodId = Convert.ToInt32(dr["FeeCollectionPeriodId"]);
                        feesTypeAndAmountEntity.FeeCollectionPeriodDesc = dr["FeeCollectionPeriodDesc"].ToString();
                        feesTypeAndAmountEntity.FeeAmount = decimal.Parse(dr["FeeAmount"].ToString());
                        lstfeesTypeAndAmountEntity.Add(feesTypeAndAmountEntity);
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
            return lstfeesTypeAndAmountEntity;
        }

        /// <summary>
        /// To get section details.
        /// </summary>
        /// <returns></returns>
        public List<SectionDetailsEntity> GetSectionDetails()
        {
            DataSet dsResult = null;
            SectionDetailsEntity objsectionEntity = null;
            List<SectionDetailsEntity> lstobjsectionEntity = new List<SectionDetailsEntity>();
            try
            {
                connection = SQLConnection.GetConnection();
                dsResult = new DataSet();

                dsResult = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetSectionDetails, null);
                if (dsResult != null && dsResult.Tables.Count > 0 && dsResult.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsResult.Tables[0].Rows)
                    {
                        objsectionEntity = new SectionDetailsEntity();
                        objsectionEntity.Id = Convert.ToInt32(dr["Id"]);
                        objsectionEntity.Section = dr["Section"].ToString();
                        lstobjsectionEntity.Add(objsectionEntity);
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
            return lstobjsectionEntity;
        }

        /// <summary>
        /// To get student details.
        /// </summary>
        /// <param name="studentEntity"></param>
        /// <returns></returns>
        public StudentDetailsEntity GetStudentDetails(StudentDetailsEntity studentEntity)
        {
            DataSet dsResult = null;
            StudentDetailsEntity studentDetailsEntity = new StudentDetailsEntity();            
            try
            {
                connection = SQLConnection.GetConnection();
                dsResult = new DataSet();
                SqlParameter[] spParams = new SqlParameter[]
                { 
                   new SqlParameter("@SchoolId",studentEntity.schoolID),
                   new SqlParameter("@StandardId",studentEntity.standardID),
                   new SqlParameter("@SectionID",studentEntity.sectionID),
                   new SqlParameter("@RollNumber",studentEntity.rollNumber)                   
                };

                dsResult = SQLHelper.ExecuteDataset(connection, CommandType.StoredProcedure, SPName_Constants.GetStudentDetails, spParams);
                if (dsResult != null && dsResult.Tables.Count > 0 && dsResult.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in dsResult.Tables[0].Rows)
                    {

                        //studentDetailsEntity. = Convert.ToInt32(dr["StudentId"]);
                        studentDetailsEntity.standardID = Convert.ToInt32(dr["StandardId"]).ToString();
                        studentDetailsEntity.sectionID = Convert.ToInt32(dr["SectionID"]).ToString();
                        studentDetailsEntity.rollNumber = Convert.ToInt32(dr["RollNumber"]);
                        studentDetailsEntity.firstName = dr["FirstName"].ToString();
                        studentDetailsEntity.lastName = dr["LastName"].ToString();
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
            return studentDetailsEntity;
        }

        /// <summary>
        /// To insert Student Fees Details.
        /// </summary>
        /// <param name="feesEntity"></param>
        public void InsertStudentFeesPayment(FeesEntity feesEntity)
        {
            try
            {
                connection = SQLConnection.GetConnection();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   new SqlParameter("@FeeTypeId",feesEntity.FeeTypeId),                   
                   new SqlParameter("@FeeDiscountAmount",feesEntity.FeeDiscountAmount), 
                   new SqlParameter("@FeeFineAmount",feesEntity.FeeFineAmount),
                   new SqlParameter("@PaymentModeId",feesEntity.PaymentModeId),
                   new SqlParameter("@ReceivedAmount",feesEntity.ReceivedAmount),
                   new SqlParameter("@ReceivedBy",feesEntity.ReceivedBy),
                   new SqlParameter("@SchoolId",feesEntity.SchoolId),
                   new SqlParameter("@StandardId",feesEntity.StandardId),
                   new SqlParameter("@StudentId",feesEntity.StudentId),
                   new SqlParameter("@MoneyReceiptNo",feesEntity.MoneyReceiptNo),
                   new SqlParameter("@IsFullPayment",feesEntity.IsFullPayment),
                   new SqlParameter("@BalanceRemaining",feesEntity.BalanceRemaining)
                };

                int result = SQLHelper.ExecuteNonQuery(connection, CommandType.StoredProcedure, SPName_Constants.InsertUpdateStudentFeesPayment, spParams);

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
        /// To setup school Fees type details.
        /// </summary>
        /// <param name="feesEntity"></param>
        public void InsertUpdateSchoolFeesType(FeeTypeEntity feeTypeEntity)
        {
            try
            {
                connection = SQLConnection.GetConnection();
                SqlParameter[] spParams = new SqlParameter[]
                {   
                   new SqlParameter("@FeesAccountHeadTypeId",feeTypeEntity.FeesAccountHeadTypeId),                   
                   new SqlParameter("@SchoolId",feeTypeEntity.SchoolId), 
                   new SqlParameter("@StandardId",feeTypeEntity.StandardId),
                   new SqlParameter("@AcademicYear",feeTypeEntity.AcademicYear),
                   new SqlParameter("@FeeCollectionPeriodId",feeTypeEntity.FeeCollectionPeriodId),
                   new SqlParameter("@StartDate",feeTypeEntity.StartDate),
                   new SqlParameter("@EndDate",feeTypeEntity.EndDate),
                   new SqlParameter("@FeeAmount",feeTypeEntity.FeeAmount)                 
                };

                int result = SQLHelper.ExecuteNonQuery(connection, CommandType.StoredProcedure, SPName_Constants.InsertUpdateSchoolFeesType, spParams);

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
