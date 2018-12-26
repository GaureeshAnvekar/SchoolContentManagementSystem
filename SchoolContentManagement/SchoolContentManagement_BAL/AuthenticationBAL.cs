using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolContentManagement_Entity;
using SchoolContentManagement_DAL;
using System.Data;

namespace SchoolContentManagement_BAL
{
    public class AuthenticationBAL
    {
        AuthenticationDAL objDal = null;
        DataSet dsDetail = null;

        public SchoolLoginInformation GetLoginEmployeeDetail(SchoolLoginInformation schoolLoginInformationEntity)
        {
            objDal = new AuthenticationDAL();
            SchoolLoginInformation objLogin = new SchoolLoginInformation();
            objLogin = objDal.GetLoginEmployeeDetail(schoolLoginInformationEntity);
            return objLogin;
        }

        public MonthlyAttendance GetMonthlyAttendance(MonthlyAttendance monthlyAttendanceParams)
        {
            objDal = new AuthenticationDAL();
            MonthlyAttendance objMonthlyAttendance = new MonthlyAttendance();
            objMonthlyAttendance = objDal.GetMonthlyAttendance(monthlyAttendanceParams);
            return objMonthlyAttendance;
        }

        public MonthsEachDayAttendance GetMonthsEachDayAttendance(MonthlyAttendance monthlyAttendanceParams)
        {
            objDal = new AuthenticationDAL();
            MonthsEachDayAttendance objMonthsEachDayAttendance = new MonthsEachDayAttendance();
            objMonthsEachDayAttendance = objDal.GetMonthsEachDayAttendance(monthlyAttendanceParams);
            return objMonthsEachDayAttendance;
        }

        public List<Assignments> GetStudentAssignmentDetails(AssignmentDetailsParams assignmentDetailsParams)
        {
            objDal = new AuthenticationDAL();
            return objDal.GetStudentAssignmentDetails(assignmentDetailsParams);
        }
        public ParentDetails GetParentDetails(ParentDetails parentDetailsParams)
        {
            objDal = new AuthenticationDAL();
            ParentDetails objParentDetails = new ParentDetails();
            objParentDetails = objDal.GetParentDetails(parentDetailsParams);
            return objParentDetails;
        }

        public FeesDetails GetFeesDetails(FeesDetails feesDetailsParams)
        {
            objDal = new AuthenticationDAL();
            FeesDetails objFeesDetails = new FeesDetails();
            objFeesDetails = objDal.GetFeesDetails(feesDetailsParams);
            return objFeesDetails;
        }

        public ResultDetails GetResultDetails(ResultDetails resultDetailsParams)
        {
            objDal = new AuthenticationDAL();
            ResultDetails objResultDetails = new ResultDetails();
            objResultDetails = objDal.GetResultDetails(resultDetailsParams);
            return objResultDetails;
        }

        public EventDetails GetEventDetails(EventDetails eventDetailsParams)
        {
            objDal = new AuthenticationDAL();
            EventDetails objEventDetails = new EventDetails();
            objEventDetails = objDal.GetEventDetails(eventDetailsParams);
            return objEventDetails;
        }

        public TransportDetails GetTransportDetails(TransportDetails transportDetailsParams)
        {
            objDal = new AuthenticationDAL();
            TransportDetails objTransportDetails = new TransportDetails();
            objTransportDetails = objDal.GetTransportDetails(transportDetailsParams);
            return objTransportDetails;
        }

        public LibraryDetails GetLibraryDetails(LibraryDetails libraryDetailsParams)
        {
            objDal = new AuthenticationDAL();
            LibraryDetails objLibraryDetails = new LibraryDetails();
            objLibraryDetails = objDal.GetLibraryDetails(libraryDetailsParams);
            return objLibraryDetails;
        }

        public PeriodAttendance GetPeriodAttendance(PeriodAttendance periodAttendanceParams)
        {
            objDal = new AuthenticationDAL();
            PeriodAttendance objPeriodAttendance = new PeriodAttendance();
            objPeriodAttendance = objDal.GetPeriodAttendance(periodAttendanceParams);
            return objPeriodAttendance;
        }

        public PeriodsEachDayAttendance GetPeriodsEachDayAttendance(PeriodAttendance periodAttendanceParams)
        {
            objDal = new AuthenticationDAL();
            PeriodsEachDayAttendance objPeriodsEachDayAttendance = new PeriodsEachDayAttendance();
            objPeriodsEachDayAttendance = objDal.GetPeriodsEachDayAttendance(periodAttendanceParams);
            return objPeriodsEachDayAttendance;
        }

        public TillDateAttendance GetTillDateAttendance(TillDateAttendance tillDateAttendance)
        {
            objDal = new AuthenticationDAL();
            TillDateAttendance objTillDateAttendance = new TillDateAttendance();
            objTillDateAttendance = objDal.GetTillDateAttendance(tillDateAttendance);
            return objTillDateAttendance;
        }

        public TillDateEachDayAttendance GetTillDateEachDayAttendance(TillDateAttendance tillDateEachDayAttendanceParams)
        {
            objDal = new AuthenticationDAL();
            TillDateEachDayAttendance objTillDateEachDayAttendance = new TillDateEachDayAttendance();
            objTillDateEachDayAttendance = objDal.GetTillDateEachDayAttendance(tillDateEachDayAttendanceParams);
            return objTillDateEachDayAttendance;
        }

        public AddressDetails GetAddressDetails(AddressDetails addressDetailsParams)
        {
            objDal = new AuthenticationDAL();
            AddressDetails objAddressDetails = new AddressDetails();
            objAddressDetails = objDal.GetAddressDetails(addressDetailsParams);
            return objAddressDetails;
        }

        public ClassStudentNames GetClassStudentNames(ClassStudentNames classStudentNamesParams)
        {
            objDal = new AuthenticationDAL();
            ClassStudentNames objClassStudentNames = new ClassStudentNames();
            objClassStudentNames = objDal.GetClassStudentNames(classStudentNamesParams);
            return objClassStudentNames;
        }

        public void SetClassAttendance(SetAttendanceParams[] students)
        {
            objDal = new AuthenticationDAL();
            objDal.SetClassAttendance(students);
        }

        public ContactDetails GetContactDetails(ContactDetails contactDetailsParams)
        {
            objDal = new AuthenticationDAL();
            ContactDetails objContactDetails = new ContactDetails();
            objContactDetails = objDal.GetContactDetails(contactDetailsParams);
            return objContactDetails;
        }

        public AddressDetails GetStaffAddressDetails(AddressDetails staffAddressDetailsParams)
        {
            objDal = new AuthenticationDAL();
            AddressDetails objAddressDetails = new AddressDetails();
            objAddressDetails = objDal.GetStaffAddressDetails(staffAddressDetailsParams);
            return objAddressDetails;
        }

        public ContactDetails GetStaffContactDetails(ContactDetails staffContactDetailsParams)
        {
            objDal = new AuthenticationDAL();
            ContactDetails objContactDetails = new ContactDetails();
            objContactDetails = objDal.GetStaffContactDetails(staffContactDetailsParams);
            return objContactDetails;
        }

        public DataSet GetSectionToUpdate()
        {
            objDal = new AuthenticationDAL();
            dsDetail = objDal.GetSectionToUpdate();
            return dsDetail;
        }

        public SchoolSectionValues GetSelectedSectionValue(SchoolSectionValues schoolSectionIDEntity)
        {
            objDal = new AuthenticationDAL();
            SchoolSectionValues objSchoolSectionValues = new SchoolSectionValues();
            objSchoolSectionValues = objDal.GetSelectedSectionValue(schoolSectionIDEntity);
            return objSchoolSectionValues;
        }
        public void InsertUpdateSectionToUpdate(SchoolSectionValues schoolSectionValuesEntity)
        {
            objDal = new AuthenticationDAL();
            objDal.InsertUpdateSectionToUpdate(schoolSectionValuesEntity);
        }

        public SchoolLogoEntity GetSchoollogoWithName(SchoolLogoEntity schoolLogoInfoEntity)
        {
            objDal = new AuthenticationDAL();
            SchoolLogoEntity objSchoolLogo = new SchoolLogoEntity();
            objSchoolLogo = objDal.GetSchoollogoWithName(schoolLogoInfoEntity);
            return objSchoolLogo;
        }

        public void NewBookEntry(LibraryBook newBookEntryParams)
        {
            objDal = new AuthenticationDAL();
            objDal.NewBookEntry(newBookEntryParams);
        }

        public int DeleteBook(LibraryBook deleteBookParams)
        {
            objDal = new AuthenticationDAL();
            return objDal.DeleteBook(deleteBookParams);
        }

        public int IssueBook(IssueBook issueBookParams)
        {
            objDal = new AuthenticationDAL();
            return objDal.IssueBook(issueBookParams);
        }

        public double ReceiveBook(BorrowedBook receiveBookParams)
        {
            objDal = new AuthenticationDAL();
            return objDal.ReceiveBook(receiveBookParams);
        }

        public string StudentRegistration(StudentRegistrationDetails studentRegistrationDetails)
        {
            objDal = new AuthenticationDAL();
            return objDal.StudentRegistration(studentRegistrationDetails);
        }

        public List<SearchStudentEntity> SearchStudent(StudentDetailsEntity searchStudentParams)
        {
            objDal = new AuthenticationDAL();
            return objDal.SearchStudent(searchStudentParams);
        }

        public StudentRegistrationDetails GetStudentCompleteDetails(StudentRegistrationDetails studentCompleteDetailsParams)
        {
            objDal = new AuthenticationDAL();
            return objDal.GetStudentCompleteDetails(studentCompleteDetailsParams);
        }
        public void GetEmployeeRegistration(EmployeeRegistrationEntity employeeDetailsRegistrationEntity)
        {
            objDal = new AuthenticationDAL();
            objDal.GetEmployeeRegistration(employeeDetailsRegistrationEntity);
        }
        public void GetSectionTransfer(SectionTransferEntity sectionTransferEntity)
        {
            objDal = new AuthenticationDAL();
            objDal.GetSectionTransfer(sectionTransferEntity);
        }
        public void GetClassPromotion(ClassPromotionEntity classPromotionEntity)
        {
            objDal = new AuthenticationDAL();
            objDal.GetClassPromotion(classPromotionEntity);
        }
    }
}
