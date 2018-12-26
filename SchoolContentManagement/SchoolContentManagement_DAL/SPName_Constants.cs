using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolContentManagement_DAL
{
   public static class SPName_Constants
    {
        public static readonly string GetSchoolLoginControlPanel = "Usp_processLoginData";
        public static readonly string GetSectionToUpdate = "Usp_GetSectionToUpdate";
        public static readonly string InsertUpdateSchoolSectionValues = "Usp_InsertUpdateSchoolSectionValues";
        public static readonly string GetSchoolInformationDetails = "Usp_GetSchoolInformationDetails";
        public static readonly string GetSelectedSectionValue = "Usp_GetSelectedSectionValue";
        public static readonly string GetMonthlyAttendanceStatus = "Usp_GetMonthlyAttendanceStatus";
        public static readonly string GetMonthsEachDayAttendance = "Usp_GetMonthsEachDayAttendance";
        public static readonly string GetStudentAssignments = "Usp_GetStudentAssignments";
        public static readonly string GetParentDetails = "Usp_GetParentDetails";
        public static readonly string GetFeesDetails = "Usp_GetFeesDetails";
        public static readonly string GetResultDetails = "Usp_GetResultDetails";
        public static readonly string GetEventDetails = "Usp_GetEventDetails";
        public static readonly string GetTransportDetails = "Usp_GetTransportDetails";
        public static readonly string GetLibraryDetails = "Usp_GetBookNameWise";
        public static readonly string GetPeriodAttendanceStatus = "Usp_GetPeriodAttendanceStatus";
        public static readonly string GetPeriodsEachDayAttendance = "Usp_GetPeriodsEachDayAttendance";
        public static readonly string GetTillDateAttendanceStatus = "Usp_GetTillDateAttendanceStatus";
        public static readonly string GetTillDateEachDayAttendance = "Usp_GetTillDateEachDayAttendanceStatus";
        public static readonly string GetAddressDetails = "Usp_GetAddressDetails";
        public static readonly string GetClassStudentNames = "Usp_GetClassStudentNames";
        public static readonly string SetClassAttendance = "Usp_SetClassAttendance";
        public static readonly string GetAssignmentsByEmployee = "Usp_GetAssignmentsByEmployee";
        public static readonly string GetAssignmentContentByID = "Usp_GetAssignmentContentByID";
        public static readonly string DeleteAssignmentByID = "Usp_DeleteAssignmentByID";
        public static readonly string GetContactDetails = "Usp_GetContactDetails";
        public static readonly string GetStaffAddressDetails = "Usp_GetStaffAddressDetails";
        public static readonly string GetStaffContactDetails = "Usp_GetStaffContactDetails";
        public static readonly string InsertNewLibraryBook = "Usp_InsertNewLibraryBook";
        public static readonly string DeleteLibraryBook = "Usp_DeleteLibraryBook";
        public static readonly string IssueLibraryBook = "Usp_IssueLibraryBook";
        public static readonly string ReceiveLibraryBook = "Usp_ReceiveLibraryBook";
      


        public static readonly string GetSchoolFeeTypes = "Usp_GetSchoolFeeTypes";
        public static readonly string GetAcademicYear = "Usp_GetAcademicYear";
        public static readonly string GetCollectionPeriod = "Usp_GetCollectionPeriod";
        public static readonly string InsertUpdateSchoolFeesType = "Usp_InsertUpdateSchoolFeesType";
        public static readonly string GetStandardDetails = "Usp_GetStandardDetails";
        public static readonly string GetFeesTypeAndAmount = "Usp_GetFeesTypeAndAmount";
        public static readonly string GetSectionDetails = "Usp_GetSectionDetails";
        public static readonly string GetStudentDetails = "Usp_GetStudentDetails";
        public static readonly string GetOccupationDetails = "Usp_GetOccupationDetails";
        public static readonly string InsertUpdateStudentFeesPayment = "Usp_InsertUpdateStudentFeesPayment";

        public static readonly string GetSchoollogoWithName = "Usp_SchoolLogoWithName";
   
        //*****Admin Page procedures******

        public static readonly string StudentRegistration = "Usp_StudentRegistration";
        public static readonly string SearchStudent = "Usp_SearchStudent";
        public static readonly string GetStudentCompleteDetails = "Usp_GetStudentCompleteDetails";

        public static readonly string GetEmployeeRegistration = "Usp_InsertEmployeeDetailsForRegistration";
        public static readonly string GetSectionTransfer = "Usp_GetSectionTransfer";
        public static readonly string GetClassPromotion = "Usp_GetAcademicYearPromotion";
       
        
        
    }
    
}
