using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Routing;

namespace SchoolContentManagement
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            RouteTable.Routes.MapPageRoute("RouteLogin", "SchoolLogin", "~/SchoolContentManagementLogin.aspx");
            RouteTable.Routes.MapPageRoute("RouteChangeContent", "SchoolChangeContent", "~/StudentPageUnclickedButtons.aspx");
            RouteTable.Routes.MapPageRoute("RouteAttendance", "Attendance", "~/StudentPageAttendanceClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteAssignment", "AssignmentDetails", "~/StudentPageAssignmentClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteOpenAssignment", "OpenAssignment", "~/OpenAssignmentsHandler.ashx");
            RouteTable.Routes.MapPageRoute("RouteAddress", "Address", "~/StudentPageAddressClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteEvents", "Events", "~/StudentPageEventsClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteFees", "Fees", "~/StudentPageFeesClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteLibrary", "Library", "~/StudentPageLibraryClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteContact", "Contact", "~/StudentPageContactClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteParent", "Parent", "~/StudentPageParentClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteResult", "Result", "~/StudentPageResultClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteTransport", "Transport", "~/StudentPageTransportClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteLoginStaff", "StaffLogin", "~/StaffPageUnclickedButtons.aspx");
            RouteTable.Routes.MapPageRoute("RouteUpdateAttendance", "UpdateAttendance", "~/StaffPageUpdateAttendanceClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteStaffPageEvents", "StaffPageEvents", "~/StaffPageEventsClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteStaffAssignments", "StaffAssignmentDetails", "~/StaffPageAssignmentsClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteStaffAddress", "StaffAddressDetails", "~/StaffPageAddressClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteStaffContact", "StaffContactDetails", "~/StaffPageContactClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteSetupFeesType", "SchoolFeeSetup", "~/SchoolFeeSetup.aspx");
            RouteTable.Routes.MapPageRoute("RouteFeesPayment", "FeesPayment", "~/FeesPayment.aspx");

            RouteTable.Routes.MapPageRoute("RouteLibraryLogin", "LibraryLogin", "~/LibraryPageUnclickedButtons.aspx");
            RouteTable.Routes.MapPageRoute("RouteLibraryNewBook", "LibraryNewBook", "~/LibraryPageNewBookClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteLibraryDeleteBook", "LibraryDeleteBook", "~/LibraryPageDeleteBookClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteLibraryIssueBook", "LibraryIssueBook", "~/LibraryPageIssueBookClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteLibraryReceiveBook", "LibraryReceiveBook", "~/LibraryPageReceiveBookClicked.aspx");

            RouteTable.Routes.MapPageRoute("RouteAdminPageLogin", "AdminLogin", "~/AdminPageUnclickedButtons.aspx");
            RouteTable.Routes.MapPageRoute("RouteAdminPageStudentAdmission", "AdminPageStudentAdmission", "~/AdminPagesStudentAdmissionClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteAdminPageEmployeeRegistration", "AdminPageEmployeeRegistration", "~/AdminPageStaffRegistration.aspx");
            RouteTable.Routes.MapPageRoute("RouteAdminPageSearchStudent", "AdminPageSearchStudent", "~/AdminPageSearchStudentClicked.aspx");
            RouteTable.Routes.MapPageRoute("RouteAdminPageSectionTransfer", "AdminPageSectionTransfer", "~/AdminPageStudentSectionTransfer.aspx");
            RouteTable.Routes.MapPageRoute("RouteAdminPageClassPromotion", "AdminPageClassPromotion", "~/AdminPageClasspromotion.aspx");
            RouteTable.Routes.MapPageRoute("RouteStudentCompleteDetails", "StudentCompleteDetails", "~/AdminPageStudentCompleteDetails.aspx");
            RouteTable.Routes.MapPageRoute("RouteEditStudentDetails", "EditStudentDetails", "~/AdminPageEditStudentDetails.aspx");
        
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

       
        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}