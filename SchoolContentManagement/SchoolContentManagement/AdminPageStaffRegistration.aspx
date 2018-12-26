<%@ Page Title="" Language="C#" MasterPageFile="~/AdminPageAfterLogin.Master" AutoEventWireup="true" CodeBehind="AdminPageStaffRegistration.aspx.cs" Inherits="SchoolContentManagement.AdminPageStaffRegistration" %>

<asp:Content ID="Content1" ContentPlaceHolderID="libraryPageHead" runat="server">
    <script type="text/javascript">
        $(function () {
            $("#staffDOJ").datepicker();
            $("#staffDOB").datepicker();
        });
        $(document).ready(function () {

            $('#registerEmployee').click(function () {
               
                $('#uploadSuccess').html("");

                var employeeRegistrationDetails = {};
                
                
                employeeRegistrationDetails.FirstName = $("#staffFirstName").val();
                employeeRegistrationDetails.EmpMiddleName = $("#staffMiddleName").val();
                employeeRegistrationDetails.LastName = $("#staffLastName").val();
                employeeRegistrationDetails.Qualification = $("#staffQualification").val();
                employeeRegistrationDetails.DateOfJoining = $("#staffDOJ").val();
                employeeRegistrationDetails.DateOfBirth = $("#staffDOB").val();
                employeeRegistrationDetails.Gender = $("#staffGender option:selected").val();
                employeeRegistrationDetails.BloodGroup = $("#staffBloodGroup option:selected").val();
                employeeRegistrationDetails.TypeName = $("#staffType option:selected").val();
                employeeRegistrationDetails.HouseNoName = $("#houseNo").val();
                employeeRegistrationDetails.StreetName = $("#streetName").val();
                employeeRegistrationDetails.Area = $("#area").val();
                employeeRegistrationDetails.City = $("#city").val();
                employeeRegistrationDetails.States = $("#state").val();
                employeeRegistrationDetails.Pincode = $("#pinCode").val();
                employeeRegistrationDetails.MobileNumber = $("#mobilenumber").val();
                employeeRegistrationDetails.LandNumber = $("#landNumber").val();
                employeeRegistrationDetails.EmailID = $("#emailid").val();
                employeeRegistrationDetails.EmergencyNumber = $("#emergencyNumber").val();
                employeeRegistrationDetails.SchoolID = $.cookie("SchoolID");

                $.ajax({
                    url: 'ContentManagement.asmx/GetEmployeeRegistration',
                    method: 'post',
                    contentType: 'application/json;charset=utf-8',
                    data: '{employeeDetailsRegistrationEntity:' + JSON.stringify(employeeRegistrationDetails) + '}',
                    success: function (data) {

                        $('#uploadSuccess').html("Registration SuccessFully");
                    },
                    error: function (err) {
                        alert(err.status);
                    }
                });
            });
        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="libraryPageBody" runat="server">
    <div id="queryResultContainer">
        <h5 style="margin: 0 auto; width: 20%"><b>Employee Registration</b></h5>
        <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 10px;" />
        <label style="margin-bottom: 10px;">1: Please enter following details for Employee registration: </label>
        <br />
        <label style="margin-left: 20px; margin-bottom: 10px; text-decoration: underline;">A: Employee Details:</label>
        <div class="well" style="margin-left: 15px; margin-bottom: 15px;">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                            <label>First Name:</label></td>
                        <td>
                            <input type="text" id="staffFirstName" class="form-control" placeholder="FirstName" style="display: inline-block;" /><label id="emptyStaffFirstNameError"></label></td>

                    </tr>
                    <tr>
                        <td>
                            <label>Middle Name:</label></td>
                        <td>
                            <input type="text" id="staffMiddleName" class="form-control" placeholder="MiddleName" style="display: inline-block;" /><label id="emptyStaffMiddleNameError"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>Last Name:</label></td>
                        <td>
                            <input type="text" id="staffLastName" class="form-control" placeholder="LastName" style="display: inline-block;" /><label id="emptyStaffLastNameError"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>Qualification:</label></td>
                        <td>
                            <input type="text" id="staffQualification" class="form-control" placeholder="Qualification" style="display: inline-block;" /><label id="emptystaffQualificationError"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>Date of Joining:</label></td>
                        <td>
                            <input type="text" id="staffDOJ" class="form-control" placeholder="DateOfJoining" style="display: inline-block;" /><label id="emptyStaffDOJError"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>Date of Birth:</label></td>
                        <td>
                            <input type="text" id="staffDOB" class="form-control" placeholder="DateOfBirth" style="display: inline-block;" /><label id="Label1"></label></td>
                    </tr>

                    <tr>
                        <td>
                            <label>Gender:</label></td>
                        <td>
                            <select id="staffGender" class="form-control" style="display: inline-block;">
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Blood Group:</label></td>
                        <td>
                            <select id="staffBloodGroup" class="form-control" style="display: inline-block;">
                                <option value="">Select BloodGroup</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB">AB</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Employee Type:</label></td>
                        <td>
                            <select id="staffType" class="form-control" style="display: inline-block;">
                                <option value="">Select EmployeeType</option>
                                <option value="Admin">Admin</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Driver">Driver</option>
                                <option value="Peon">Peon</option>
                     
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <label style="margin-left: 20px; margin-bottom: 10px; text-decoration: underline">B: Address Details</label>
        <div class="well" style="margin-left: 15px; margin-bottom: 15px;">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                            <label>House No/Name:</label></td>
                        <td>
                            <input type="text" id="houseNo" class="form-control" placeholder="No/Name" style="display: inline-block;" /><label id="emptyHouseNoError"></label></td>

                    </tr>
                    <tr>
                        <td>
                            <label>Street Name:</label></td>
                        <td>
                            <input type="text" id="streetName" class="form-control" placeholder="StreetName" style="display: inline-block;" /><label id="emptyStreetNameError"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>Area:</label></td>
                        <td>
                            <input type="text" id="area" class="form-control" placeholder="Area" style="display: inline-block;" /><label id="emptyAreaError"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>City:</label></td>
                        <td>
                            <input type="text" id="city" class="form-control" placeholder="City" style="display: inline-block;" /><label id="emptyCityError"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>State:</label></td>
                        <td>
                            <input type="text" id="state" class="form-control" placeholder="State" style="display: inline-block;" /><label id="emptyStateError"></label></td>
                    </tr>

                    <tr>
                        <td>
                            <label>Pin Code:</label></td>
                        <td>
                            <input type="text" id="pinCode" class="form-control" placeholder="PinCode" style="display: inline-block;" /><label id="emptyPinCode"></label></td>
                    </tr>


                </tbody>
            </table>
        </div>

        <label style="margin-left: 20px; margin-bottom: 10px; text-decoration: underline">C: Contact Details</label>
        <div class="well" style="margin-left: 15px; margin-bottom: 15px;">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                            <label>Mobile Number:</label></td>
                        <td>
                            <input type="text" id="mobilenumber" class="form-control" placeholder="MobileNumber"  /><label id="emptyMobileNumber"></label></td>

                    </tr>
                    <tr>
                        <td>
                            <label>LandNumber:</label></td>
                        <td>
                            <input type="text" id="landNumber" class="form-control" placeholder="LandNumber"  /><label id="emptyLandNumber"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>Email ID:</label></td>
                        <td>
                            <input type="text" id="emailid" class="form-control" placeholder="EmailID" style="display: inline-block;" /><label id="emptyEmailid"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>Emergency Number:</label></td>
                        <td>
                            <input type="text" id="emergencyNumber" class="form-control" placeholder="EmergencyNumber"  /><label id="emptyEmergencyNumber"></label></td>
                    </tr>

                </tbody>
            </table>
        </div>
        <div id="uploadRegisterDiv" style="width: 100px; margin: 0 auto;">
            <button id="registerEmployee" type="button" class="btn btn-primary btn-sm">Register Employee</button>
        </div>
        <div style="width: 180px; margin: 0 auto;">
            <label id="uploadSuccess" style="margin: 0 auto;"></label>
        </div>
        <br />
        <br />
        <label>2: To enter a bulk of Employee, please select an appropriate excel sheet:</label>

    </div>
</asp:Content>
