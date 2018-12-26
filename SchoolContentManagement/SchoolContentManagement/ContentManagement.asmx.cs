using System.Linq;
using System.Web;
using System.Web.Services;
using SchoolContentManagement_BAL;
using System.Web.Script.Serialization;
using System.Data;
using System.Data.SqlClient;
using SchoolContentManagement_Entity;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using System.Configuration;

namespace SchoolContentManagement
{
    /// <summary>
    /// Summary description for ContentManagement
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ContentManagement : System.Web.Services.WebService
    {

        [WebMethod]
        public SchoolSectionValues GetSelectedSectionValue(SchoolSectionValues schoolSectionIDEntity)
        {
            SchoolSectionValues objSection = new SchoolSectionValues();
            AuthenticationBAL objBal = new AuthenticationBAL();
            objSection = objBal.GetSelectedSectionValue(schoolSectionIDEntity);
            return objSection;
        }

        [WebMethod]
        public void InsertUpdateSectionToUpdate(SchoolSectionValues schoolSectionValuesEntity)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            objBal.InsertUpdateSectionToUpdate(schoolSectionValuesEntity);

        }

        [WebMethod]
        public SchoolLoginInformation GetLoginEmployeeDetail(SchoolLoginInformation schoolLoginInformationEntity)
        {

            AuthenticationBAL objBal = new AuthenticationBAL();
            SchoolLoginInformation objLogin = new SchoolLoginInformation();
            objLogin = objBal.GetLoginEmployeeDetail(schoolLoginInformationEntity);
            return objLogin;
        }

        //[WebMethod]
        //public SchoolLoginInformation GetParentDetails(SchoolLoginInformation schoolLoginInformationEntity)
        //{

        //    AuthenticationBAL objBal = new AuthenticationBAL();
        //    SchoolLoginInformation objLogin = new SchoolLoginInformation();
        //    objLogin = objBal.GetLoginEmployeeDetail(schoolLoginInformationEntity);
        //    return objLogin;
        //}

        [WebMethod]
        public MonthlyAttendance GetMonthlyAttendance(MonthlyAttendance monthlyAttendanceParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            MonthlyAttendance objMonthlyAttendance = new MonthlyAttendance();
            objMonthlyAttendance = objBal.GetMonthlyAttendance(monthlyAttendanceParams);
            return objMonthlyAttendance;
        }

        [WebMethod]
        public MonthsEachDayAttendance GetMonthsEachDayAttendance(MonthlyAttendance monthlyAttendanceParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            MonthsEachDayAttendance objMonthsEachDayAttendance = new MonthsEachDayAttendance();
            objMonthsEachDayAttendance = objBal.GetMonthsEachDayAttendance(monthlyAttendanceParams);
            return objMonthsEachDayAttendance;
        }

        [WebMethod]
        public List<Assignments> GetStudentAssignmentDetails(AssignmentDetailsParams assignmentDetailsParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            return objBal.GetStudentAssignmentDetails(assignmentDetailsParams);
        }

        [WebMethod]
        public ParentDetails GetParentDetails(ParentDetails parentDetailsParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            ParentDetails objParentDetails = new ParentDetails();
            objParentDetails = objBal.GetParentDetails(parentDetailsParams);
            return objParentDetails;
        }

        [WebMethod]
        public FeesDetails GetFeesDetails(FeesDetails feesDetailsParams)
        {

            AuthenticationBAL objBal = new AuthenticationBAL();
            FeesDetails objFeesDetails = new FeesDetails();
            objFeesDetails = objBal.GetFeesDetails(feesDetailsParams);
            return objFeesDetails;
        }

        [WebMethod]
        public ResultDetails GetResultDetails(ResultDetails resultDetailsParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            ResultDetails objResultDetails = new ResultDetails();
            objResultDetails = objBal.GetResultDetails(resultDetailsParams);
            return objResultDetails;
        }

        [WebMethod]
        public EventDetails GetEventDetails(EventDetails eventDetailsParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            EventDetails objEventDetails = new EventDetails();
            objEventDetails = objBal.GetEventDetails(eventDetailsParams);
            return objEventDetails;
        }

        [WebMethod]
        public TransportDetails GetTransportDetails(TransportDetails transportDetailsParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            TransportDetails objTransportDetails = new TransportDetails();
            objTransportDetails = objBal.GetTransportDetails(transportDetailsParams);
            return objTransportDetails;
        }

        [WebMethod]
        public LibraryDetails GetLibraryDetails(LibraryDetails libraryDetailsParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            LibraryDetails objLibraryDetails = new LibraryDetails();
            objLibraryDetails = objBal.GetLibraryDetails(libraryDetailsParams);
            return objLibraryDetails;
        }

        [WebMethod]
        public PeriodAttendance GetPeriodAttendance(PeriodAttendance periodAttendanceParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            PeriodAttendance objPeriodAttendance = new PeriodAttendance();
            objPeriodAttendance = objBal.GetPeriodAttendance(periodAttendanceParams);
            return objPeriodAttendance;
        }

        [WebMethod]
        public PeriodsEachDayAttendance GetPeriodsEachDayAttendance(PeriodAttendance periodAttendanceParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            PeriodsEachDayAttendance objPeriodsEachDayAttendance = new PeriodsEachDayAttendance();
            objPeriodsEachDayAttendance = objBal.GetPeriodsEachDayAttendance(periodAttendanceParams);
            return objPeriodsEachDayAttendance;
        }

        [WebMethod]
        public TillDateAttendance GetTillDateAttendance(TillDateAttendance tillDateAttendanceParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            TillDateAttendance objTillDateAttendance = new TillDateAttendance();
            objTillDateAttendance = objBal.GetTillDateAttendance(tillDateAttendanceParams);
            return objTillDateAttendance;
        }

        [WebMethod]
        public TillDateEachDayAttendance GetTillDateEachDayAttendanceDetails(TillDateAttendance tillDateEachDayAttendanceParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            TillDateEachDayAttendance objTillDateEachDayAttendance = new TillDateEachDayAttendance();
            objTillDateEachDayAttendance = objBal.GetTillDateEachDayAttendance(tillDateEachDayAttendanceParams);
            return objTillDateEachDayAttendance;
        }

        [WebMethod]
        public AddressDetails GetAddressDetails(AddressDetails addressDetailsParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            AddressDetails objAddressDetails = new AddressDetails();
            objAddressDetails = objBal.GetAddressDetails(addressDetailsParams);
            return objAddressDetails;
        }

        [WebMethod]
        public ClassStudentNames GetClassStudentNames(ClassStudentNames classStudentNamesParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            ClassStudentNames objClassStudentNames = new ClassStudentNames();
            objClassStudentNames = objBal.GetClassStudentNames(classStudentNamesParams);
            return objClassStudentNames;
        }

        [WebMethod]
        public void SetClassAttendance(SetAttendanceParams[] students)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            objBal.SetClassAttendance(students);
        }

        [WebMethod]
        public ContactDetails GetContactDetails(ContactDetails contactDetailsParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            ContactDetails objContactDetails = new ContactDetails();
            objContactDetails = objBal.GetContactDetails(contactDetailsParams);
            return objContactDetails;
        }

        [WebMethod]
        public AddressDetails GetStaffAddressDetails(AddressDetails staffAddressDetailsParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            AddressDetails objAddressDetails = new AddressDetails();
            objAddressDetails = objBal.GetStaffAddressDetails(staffAddressDetailsParams);
            return objAddressDetails;
        }

        [WebMethod]
        public ContactDetails GetStaffContactDetails(ContactDetails staffContactDetailsParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            ContactDetails objContactDetails = new ContactDetails();
            objContactDetails = objBal.GetStaffContactDetails(staffContactDetailsParams);
            return objContactDetails;
        }

        [WebMethod]
        public List<AccountHeadTypeEntity> GetAllFeesSetupType()
        {
            
            List<AccountHeadTypeEntity> lstFeesType = new List<AccountHeadTypeEntity>();
            FeesBAL objBal = new FeesBAL();
            lstFeesType = objBal.GetSchoolFeeTypes();
            return lstFeesType;
        }

        [WebMethod]
        public List<AcademicYearEntity> GetAcademicYear()
        {
            List<AcademicYearEntity> lstAcademicYears = new List<AcademicYearEntity>();
            FeesBAL objBal = new FeesBAL();
            lstAcademicYears = objBal.GetAcademicYear();
            return lstAcademicYears;
        }

        [WebMethod]
        public List<StandardEntity> GetStandardDetails()
        {
            List<StandardEntity> lstStandards = new List<StandardEntity>();
            FeesBAL objBal = new FeesBAL();
            lstStandards = objBal.GetStandardDetails();
            return lstStandards;
        }

        [WebMethod]
        public List<OccupationEntity> GetOccupationDetails()
        {
            List<OccupationEntity> occupationEntityList = new List<OccupationEntity>();
            FeesBAL objBal = new FeesBAL();
            occupationEntityList = objBal.GetOccupationDetails();
            return occupationEntityList;
        }

        [WebMethod]
        public List<FeeCollectionPeriodEntity> GetCollectionPeriodDetails()
        {
            List<FeeCollectionPeriodEntity> lstColletionPeriod = new List<FeeCollectionPeriodEntity>();
            FeesBAL objBal = new FeesBAL();
            lstColletionPeriod = objBal.GetCollectionPeriodDetails();
            return lstColletionPeriod;
        }

        [WebMethod]
        public FeeTypeEntity SetupFeeType(FeeTypeEntity feeTypeEntity)
        {
            FeeTypeEntity objFeeType = new FeeTypeEntity();
            FeesBAL objBal=new FeesBAL();
            objFeeType = objBal.SetupFeeType(feeTypeEntity);
            return objFeeType;
        }

        [WebMethod]
        public List<FeesTypeAndAmountEntity> GetFeesTypeAndAmountDetails(FeesTypeAndAmountEntity feesTypeEntity)
        {
            List<FeesTypeAndAmountEntity> lstFeesTypeAndAmountEntity = new List<FeesTypeAndAmountEntity>();
            FeesBAL objBal = new FeesBAL();
            lstFeesTypeAndAmountEntity = objBal.GetFeesTypeAndAmountDetails(feesTypeEntity);
            return lstFeesTypeAndAmountEntity;
        }

        [WebMethod]
        public List<SectionDetailsEntity> GetSectionDetails()
        {
            List<SectionDetailsEntity> lstSectionDetailsEntity = new List<SectionDetailsEntity>();
            FeesBAL objBal = new FeesBAL();
            lstSectionDetailsEntity = objBal.GetSectionDetails();
            return lstSectionDetailsEntity;
        }

        [WebMethod]
        public StudentDetailsEntity GetStudentDetails(StudentDetailsEntity studentEntity)
        {
            StudentDetailsEntity objStudentEntity = new StudentDetailsEntity();
            FeesBAL objBal = new FeesBAL();
            objStudentEntity = objBal.GetStudentDetails(studentEntity);
            return objStudentEntity;
        }

        [WebMethod]
        public void InsertStudentFeesPayment(FeesEntity feesEntity)
        {
            FeesBAL objBal = new FeesBAL();
            objBal.InsertStudentFeesPayment(feesEntity);
        }

        [WebMethod]
        public void InsertUpdateSchoolFeesType(FeeTypeEntity feeTypeEntity)
        {
            FeesBAL objBal = new FeesBAL();
            objBal.InsertUpdateSchoolFeesType(feeTypeEntity);
        }

        [WebMethod]
        public SchoolLogoEntity GetSchoollogoWithName(SchoolLogoEntity schoolLogoInfoEntity)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            SchoolLogoEntity objSchoolLogo = new SchoolLogoEntity();
            objSchoolLogo = objBal.GetSchoollogoWithName(schoolLogoInfoEntity);
            return objSchoolLogo;
        }

        [WebMethod]
        public void NewBookEntry(LibraryBook newBookEntryParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            objBal.NewBookEntry(newBookEntryParams);
        }

        [WebMethod]
        public int DeleteBook(LibraryBook deleteBookParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            return objBal.DeleteBook(deleteBookParams);
        }

        [WebMethod]
        public int IssueBook(IssueBook issueBookParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            return objBal.IssueBook(issueBookParams);
        }

        [WebMethod]
        public double ReceiveBook(BorrowedBook receiveBookParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            return objBal.ReceiveBook(receiveBookParams);
        }

        [WebMethod]
        public string StudentRegistration(StudentRegistrationDetails studentRegistrationDetails)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            return objBal.StudentRegistration(studentRegistrationDetails);
        }

        [WebMethod]
        public List<SearchStudentEntity> SearchStudent(StudentDetailsEntity searchStudentParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //Context.Response.Write(js.Serialize(objBal.SearchStudent(searchStudentParams)));
            return objBal.SearchStudent(searchStudentParams);
       
        }

        [WebMethod]
        public StudentRegistrationDetails GetStudentCompleteDetails(StudentRegistrationDetails studentCompleteDetailsParams)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            return objBal.GetStudentCompleteDetails(studentCompleteDetailsParams);
        }

        [WebMethod]
        public void GetEmployeeRegistration(EmployeeRegistrationEntity employeeDetailsRegistrationEntity)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            objBal.GetEmployeeRegistration(employeeDetailsRegistrationEntity);

        }
        [WebMethod]
        public void GetSectionTransfer(SectionTransferEntity sectionTransferEntity)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            objBal.GetSectionTransfer(sectionTransferEntity);
        }
        [WebMethod]
        public void GetClassPromotion(ClassPromotionEntity classPromotionEntity)
        {
            AuthenticationBAL objBal = new AuthenticationBAL();
            objBal.GetClassPromotion(classPromotionEntity);
        }
    }
}

