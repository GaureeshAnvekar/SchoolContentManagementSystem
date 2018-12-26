using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolContentManagement_Entity;
using SchoolContentManagement_DAL;
using System.Data;

namespace SchoolContentManagement_BAL
{
    public class FeesBAL
    {
        FeesDAL objDal = null;
        
        /// <summary>
        /// To get scholl account head type.
        /// </summary>
        /// <param name="accountHeadTypeEntity"></param>
        /// <returns></returns>
        public List<AccountHeadTypeEntity> GetSchoolFeeTypes()
        {
            objDal = new FeesDAL();
            List<AccountHeadTypeEntity> lstAccountHeadType = new List<AccountHeadTypeEntity>();
            lstAccountHeadType = objDal.GetSchoolFeeTypes();
            return lstAccountHeadType;
        }

        /// <summary>
        /// To get list of academic year.
        /// </summary>
        /// <returns></returns>
        public List<AcademicYearEntity> GetAcademicYear()
        {
            objDal = new FeesDAL();
            List<AcademicYearEntity> lstAcademicYear = new List<AcademicYearEntity>();
            lstAcademicYear = objDal.GetAcademicYear();
            return lstAcademicYear;
        }

        /// <summary>
        /// To get list of standards.
        /// </summary>
        /// <returns></returns>
        public List<StandardEntity> GetStandardDetails()
        {
            objDal = new FeesDAL();
            List<StandardEntity> lstStandardEntity = new List<StandardEntity>();
            lstStandardEntity = objDal.GetStandardDetails();
            return lstStandardEntity;
        }

        public List<OccupationEntity> GetOccupationDetails()
        {
            objDal = new FeesDAL();
            List<OccupationEntity> occupationEntityList = new List<OccupationEntity>();
            occupationEntityList = objDal.GetOccupationDetails();
            return occupationEntityList;
        }
        /// <summary>
        /// To get list of collection period.
        /// </summary>
        /// <returns></returns>
        public List<FeeCollectionPeriodEntity> GetCollectionPeriodDetails()
        {
            objDal = new FeesDAL();
            List<FeeCollectionPeriodEntity> lstCollectionPeriodEntity = new List<FeeCollectionPeriodEntity>();
            lstCollectionPeriodEntity = objDal.GetCollectionPeriodDetails();
            return lstCollectionPeriodEntity;
        }

        /// <summary>
        /// To insert and update fee setup.
        /// </summary>
        /// <param name="feeTypeEntity"></param>
        public FeeTypeEntity SetupFeeType(FeeTypeEntity feeTypeEntity)
        {
            FeeTypeEntity feeType = new FeeTypeEntity();
            objDal = new FeesDAL();
            feeType= objDal.SetupFeeType(feeTypeEntity);
            return feeType;
        }

        /// <summary>
        /// To get fees type amount details.
        /// </summary>
        /// <param name="feesTypeEntity"></param>
        /// <returns></returns>
        public List<FeesTypeAndAmountEntity> GetFeesTypeAndAmountDetails(FeesTypeAndAmountEntity feesTypeEntity)
        {
            List<FeesTypeAndAmountEntity> objlstEntity = new List<FeesTypeAndAmountEntity>();
            FeesDAL objDal = new FeesDAL();
            objlstEntity= objDal.GetFeesTypeAndAmountDetails(feesTypeEntity);
            return objlstEntity;
        }

        /// <summary>
        /// To get section details.
        /// </summary>
        /// <returns></returns>
        public List<SectionDetailsEntity> GetSectionDetails()
        {
            List<SectionDetailsEntity> objlstEntity = new List<SectionDetailsEntity>();
            FeesDAL objDal = new FeesDAL();
            objlstEntity = objDal.GetSectionDetails();
            return objlstEntity;
        }

        /// <summary>
        /// To get student details.
        /// </summary>
        /// <param name="studentEntity"></param>
        /// <returns></returns>
        public StudentDetailsEntity GetStudentDetails(StudentDetailsEntity studentEntity)
        {
            StudentDetailsEntity objEntity = new StudentDetailsEntity();
            FeesDAL objDal = new FeesDAL();
            objEntity = objDal.GetStudentDetails(studentEntity);
            return objEntity;
        }

        /// <summary>
        /// To insert Student Fees Details.
        /// </summary>
        /// <param name="feesEntity"></param>
        public void InsertStudentFeesPayment(FeesEntity feesEntity)
        {            
            FeesDAL objDal = new FeesDAL();
            objDal.InsertStudentFeesPayment(feesEntity);
        }

        /// <summary>
        /// To setup school Fees type details.
        /// </summary>
        /// <param name="feeTypeEntity"></param>
        public void InsertUpdateSchoolFeesType(FeeTypeEntity feeTypeEntity)
        {
            FeesDAL objDal = new FeesDAL();
            objDal.InsertUpdateSchoolFeesType(feeTypeEntity);
        }
    }
}
