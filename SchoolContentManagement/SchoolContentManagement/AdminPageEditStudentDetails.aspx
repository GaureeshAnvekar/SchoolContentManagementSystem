<%@ Page Title="" Language="C#" MasterPageFile="~/AdminPageAfterLogin.Master" AutoEventWireup="true" CodeBehind="AdminPageEditStudentDetails.aspx.cs" Inherits="SchoolContentManagement.WebForm28" %>
<asp:Content ID="Content1" ContentPlaceHolderID="libraryPageHead" runat="server">
    <style>
        td:nth-child(2) label {
            color: red;
        }
    </style>
    <script type="text/javascript">
     
        $(document).ready(function () {

            $("#studentDOB").datepicker({ dateFormat: "yy-mm-dd", changeYear: true, yearRange: "1950:2020" });

            $.ajax({
                url: "ContentManagement.asmx/GetStandardDetails",
                method: 'post',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    $.each(data.d, function (key, value) {
                        $('#studentStandard').append($('<option></option>').val(value.Id).html(value.Standard));
                    });
                }
            });

            $.ajax({
                url: "ContentManagement.asmx/GetOccupationDetails",
                method: 'post',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    $.each(data.d, function (key, value) {
                        $('#fatherOccupation').append($('<option></option>').val(value.ID).html(value.occupation));
                        $('#motherOccupation').append($('<option></option>').val(value.ID).html(value.occupation));
                        $('#guardianOccupation').append($('<option></option>').val(value.ID).html(value.occupation));

                    });
                }
            });

            $.ajax({
                url: "ContentManagement.asmx/GetAcademicYear",
                method: 'post',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    $.each(data.d, function (key, value) {
                        $('#academicYear').append($('<option></option>').val(value.Id).html(value.AcademicYear));
                    });
                }
            });

            $.ajax({
                url: "ContentManagement.asmx/GetSectionDetails",
                method: 'post',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    $.each(data.d, function (key, value) {
                        $('#studentSection').append($('<option></option>').val(value.Id).html(value.Section));
                    });
                }
            });

    
            var queryString = new Array();
            $(function () {
                if (queryString.length == 0) {
                    if (window.location.search.split('?').length > 1) {
                        var params = window.location.search.split('?')[1].split('=');
                        var key = params[0];
                        var value = decodeURIComponent(params[1]);
                        queryString[key] = value;

                    }
                }

                if (queryString["regNo"] != null) {
                    var editStudentDetailsParams = {};
                    editStudentDetailsParams.schoolID = $.cookie("SchoolID");
                    editStudentDetailsParams.regNo = queryString["regNo"];

                    $.ajax({
                        url: 'ContentManagement.asmx/GetStudentCompleteDetails',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        data: '{studentCompleteDetailsParams:' + JSON.stringify(editStudentDetailsParams) + '}',
                        success: function (data) {

                            if (data.d != null) {

                                $("#studentFirstName").val(data.d.firstName);
                                $("#studentMiddleName").val(data.d.middleName);
                                $("#studentLastName").val(data.d.lastName);
                                $("#studentDOB").val(data.d.DOB);
                                $("#gender option").each(function (index) {
                                    if ($(this).text() == data.d.gender)
                                        $("#gender").val($(this).val());
                                });
                                $("#bloodGroup option").each(function (index) {
                                    if ($(this).text() == data.d.bloodGroup)
                                        $("#bloodGroup").val($(this).val());
                                });
                                $("#academicYear option").each(function (index) {
                                    if ($(this).text() == data.d.academicYear)
                                        $("#academicYear").val($(this).val());
                                });
                                $("#studentStandard option").each(function (index) {
                                    if ($(this).text() == data.d.standard)
                                        $("#studentStandard").val($(this).val());
                                });
                                $("#studentSection option").each(function (index) {
                                    if ($(this).text() == data.d.section)
                                        $("#studentSection").val($(this).val());
                                });
                                $("#studentRollNumber").val(data.d.rollNumber);

                                $("#fatherFirstName").val(data.d.fatherFirstName);
                                $("#fatherMiddleName").val(data.d.fatherMiddleName);
                                $("#motherFirstName").val(data.d.motherFirstName);
                                $("#motherMiddleName").val(data.d.motherMiddleName);
                                $("#parentLastName").val(data.d.parentLastName);
                                $("#fatherOccupation option").each(function (index) {
                                    if ($(this).text() == data.d.fatherOccupation)
                                        $("#fatherOccupation").val($(this).val());
                                });
                                $("#motherOccupation option").each(function (index) {
                                    if ($(this).text() == data.d.motherOccupation)
                                        $("#motherOccupation").val($(this).val());
                                });
                                $("#guardianName").val(data.d.guardianName);
                                $("#guardianOccupation option").each(function (index) {
                                    if ($(this).text() == data.d.guardianOccupation)
                                        $("#guardianOccupation").val($(this).val());
                                });

                                $("#houseNumber").val(data.d.houseNumber);
                                $("#streetName").val(data.d.streetName);
                                $("#area").val(data.d.area);
                                $("#city").val(data.d.city);
                                $("#state").val(data.d.state);
                                $("#pinCode").val(data.d.pinCode);

                                $("#mobileNumber").val(data.d.mobileNumber);
                                $("#landlineNumber").val(data.d.landlineNumber);
                                $("#emailID").val(data.d.emailID);
                                $("#emergencyNumber").val(data.d.emergencyNumber);

                                $("#transportType option").each(function (index) {
                                    if ($(this).text() == data.d.transportType)
                                        $("#transportType").val($(this).val());
                                });
                                $("#routeDescription").val(data.d.routeDescription);
                                $("#driverRegID").val(data.d.driverRegID);
                                $("#vehicleNumber").val(data.d.vehicleNumber);

                            }
                        },
                        error: function (err) {
                            alert(err.statusCode);
                        }
                    });

                }

            });

            $("#updateDetails").click(function () {
                var studentRegistrationDetails = {};
                var countOfRequiredElements = 0;

                if ($("#studentFirstName").val() == "")
                    $("#emptyStudentFirstNameError").text("Please enter student First Name!");
                else {
                    $("#emptyStudentFirstNameError").text("");
                    studentRegistrationDetails.firstName = $("#studentFirstName").val();
                    countOfRequiredElements++;
                }

                if ($("#studentMiddleName").val() == "")
                    studentRegistrationDetails.middleName = null;
                else
                    studentRegistrationDetails.middleName = $("#studentMiddleName").val();

                if ($("#studentLastName").val() == "")
                    $("#emptyStudentLastNameError").text("Please enter student Last Name!");
                else {
                    $("#emptyStudentLastNameError").text("");
                    studentRegistrationDetails.lastName = $("#studentLastName").val();
                    countOfRequiredElements++;
                }
                if ($("#studentDOB").val() == "")
                    $("#emptyStudentDOBError").text("Please enter date of birth!");
                else {
                    $("#emptyStudentDOBError").text("");
                    studentRegistrationDetails.DOB = $("#studentDOB").val();
                    countOfRequiredElements++;
                }
                if ($("#gender option:selected").val() == "")
                    $("#emptyStudentGenderError").text("Please enter gender!");
                else {
                    $("#emptyStudentGenderError").text("");
                    studentRegistrationDetails.gender = $("#gender option:selected").val();
                    countOfRequiredElements++;
                }
                if ($("#bloodGroup option:selected").val() == "")
                    studentRegistrationDetails.bloodGroup = null;
                else
                    studentRegistrationDetails.bloodGroup = $("#bloodGroup option:selected").val();
                if ($("#academicYear option:selected").val() == "")
                    $("#emptyAcademicYearError").text("Please enter academic year!");
                else {
                    $("#emptyAcademicYearError").text("");
                    studentRegistrationDetails.academicYear = $("#academicYear option:selected").val();
                    countOfRequiredElements++;
                }
                if ($("#studentStandard option:selected").val() == "")
                    $("#emptyStandardError").text("Please enter the standard!");
                else {
                    $("#emptyStandardError").text("");
                    studentRegistrationDetails.standard = $("#studentStandard option:selected").val();
                    countOfRequiredElements++;
                }
                if ($("#studentSection option:selected").val() == "")
                    $("#emptySectionError").text("Please enter the section!");
                else {
                    $("#emptySectionError").text("");
                    studentRegistrationDetails.section = $("#studentSection option:selected").val();
                    countOfRequiredElements++;
                }
           

                if ($("#fatherFirstName").val() == "")
                    $("#emptyFatherFirstNameError").text("Please enter father first name!");
                else {
                    $("#emptyFatherFirstNameError").text("");
                    studentRegistrationDetails.fatherFirstName = $("#fatherFirstName").val();
                    countOfRequiredElements++;
                }
                if ($("#fatherMiddleName").val() == "")
                    studentRegistrationDetails.fatherMiddleName = null;
                else
                    studentRegistrationDetails.fatherMiddleName = $("#fatherMiddleName").val();
                if ($("#motherFirstName").val() == "")
                    $("#emptyMotherFirstNameError").text("Please enter mother first name!");
                else {
                    $("#emptyMotherFirstNameError").text("");
                    studentRegistrationDetails.motherFirstName = $("#motherFirstName").val();
                    countOfRequiredElements++;
                }
                if ($("#motherMiddleName").val() == "")
                    studentRegistrationDetails.motherMiddleName = null;
                else
                    studentRegistrationDetails.motherMiddleName = $("#motherMiddleName").val();
                if ($("#parentLastName").val() == "")
                    studentRegistrationDetails.parentLastName = null;
                else
                    studentRegistrationDetails.parentLastName = $("#parentLastName").val();
                if ($("#fatherOccupation option:selected").val() == "")
                    studentRegistrationDetails.fatherOccupation = null;
                else
                    studentRegistrationDetails.fatherOccupation = $("#fatherOccupation option:selected").val();
                if ($("#motherOccupation option:selected").val() == "")
                    studentRegistrationDetails.motherOccupation = null;
                else
                    studentRegistrationDetails.motherOccupation = $("#motherOccupation option:selected").val();
                if ($("#guardianName").val() == "")
                    studentRegistrationDetails.guardianName = null;
                else
                    studentRegistrationDetails.guardianName = $("#guardianName").val();
                if ($("#guardianOccupation option:selected").val() == "")
                    studentRegistrationDetails.guardianOccupation = null;
                else
                    studentRegistrationDetails.guardianOccupation = $("#guardianOccupation option:selected").val();

                if ($("#houseNumber").val() == "")
                    $("#emptyHouseNumberError").text("Please enter House Number!");
                else {
                    $("#emptyHouseNumberError").text("");
                    studentRegistrationDetails.houseNumber = $("#houseNumber").val();
                    countOfRequiredElements++;
                }
                if ($("#streetName").val() == "")
                    $("#emptyStreetNameError").text("Please enter street name!");
                else {
                    $("#emptyStreetNameError").text("");
                    studentRegistrationDetails.streetName = $("#streetName").val();
                    countOfRequiredElements++;
                }
                if ($("#area").val() == "")
                    $("#emptyAreaError").text("Please enter area!");
                else {
                    $("#emptyAreaError").text("");
                    studentRegistrationDetails.area = $("#area").val();
                    countOfRequiredElements++;
                }
                if ($("#city").val() == "")
                    $("#emptyCityError").text("Please enter city!");
                else {
                    $("#emptyCityError").text("");
                    studentRegistrationDetails.city = $("#city").val();
                    countOfRequiredElements++;
                }
                if ($("#state").val() == "")
                    $("#emptyStateError").text("Please enter state!");
                else {
                    $("#emptyStateError").text("");
                    studentRegistrationDetails.state = $("#state").val();
                    countOfRequiredElements++;
                }
                if ($("#pinCode").val() == "")
                    $("#emptyPinCodeError").text("Please enter PinCode!");
                else {
                    $("#emptyPinCodeError").text("");
                    studentRegistrationDetails.pinCode = $("#pinCode").val();
                    countOfRequiredElements++;
                }

                if ($("#mobileNumber").val() == "" || !(/^\d{10}$/.test($("#mobileNumber").val())))
                    $("#emptyMobileNumberError").text("Please enter appropriate mobile number!");
                else {
                    $("#emptyMobileNumberError").text("");
                    studentRegistrationDetails.mobileNumber = $("#mobileNumber").val();
                    countOfRequiredElements++;
                }
                if ($("#landlineNumber").val() == "" || !(/\d+/.test($("#landlineNumber").val())))
                    $("#emptyLandlineNumberError").text("Please enter landline number!");
                else {
                    $("#emptyLandlineNumberError").text("");
                    studentRegistrationDetails.landlineNumber = $("#landlineNumber").val();
                    countOfRequiredElements++;
                }
                if ($("#emailID").val() == "" || !(/[^\s@]+@[^\s@]+\.[^\s@]+/.test($("#emailID").val())))
                    $("#emptyEmailIDError").text("Please enter emailID!");
                else {
                    $("#emptyEmailIDError").text("");
                    studentRegistrationDetails.emailID = $("#emailID").val();
                    countOfRequiredElements++;
                }
                if ($("#emergencyNumber").val() == "" || !(/\d+/.test($("#emergencyNumber").val())))
                    studentRegistrationDetails.emergencyNumber = null;
                else
                    studentRegistrationDetails.emergencyNumber = $("#emergencyNumber").val();

                if ($("#transportType option:selected").val() == "")
                    studentRegistrationDetails.transportType = null;
                else
                    studentRegistrationDetails.transportType = $("#transportType option:selected").val();
                if ($("#routeDescription").val() == "")
                    studentRegistrationDetails.routeDescription = null;
                else
                    studentRegistrationDetails.routeDescription = $("#routeDescription").val();
                if ($("#driverRegID").val() == "")
                    studentRegistrationDetails.driverRegID = null;
                else
                    studentRegistrationDetails.driverRegID = $("#driverRegID").val();
                if ($("#vehicleNumber").val() == "")
                    studentRegistrationDetails.vehicleNumber = null;
                else
                    studentRegistrationDetails.vehicleNumber = $("#vehicleNumber").val();

                console.log(countOfRequiredElements);

                studentRegistrationDetails.schoolID = $.cookie("SchoolID");
                studentRegistrationDetails.regNo = queryString["regNo"];
              
                if (countOfRequiredElements == 18) {

                    $.ajax({
                        url: 'ContentManagement.asmx/StudentRegistration',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        data: '{studentRegistrationDetails:' + JSON.stringify(studentRegistrationDetails) + '}',
                        success: function (data) {

                            if (data.d == "Registration Failed, Inappropriate data!")
                                $("#uploadSuccess").html("Update failed, Inappropriate data!");
                            else {
                                $("#uploadSuccess").html("Update Successful for Student with Registration Number <b style='color:green;'>" + data.d + "</b>");
                            
                            }
                        },
                        error: function (err) {
                            alert(err.statusCode);
                        }
                    });

                }
            });
        });

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="libraryPageBody" runat="server">
    <div id="queryResultContainer">
        <h5 style="margin: 0 auto; width: 20%"><b>Edit Details</b></h5>
        <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 10px;">
        <label style="margin-bottom: 10px;">* The following details can be edited for the selected student: </label>
        <br />
        <label style="margin-left: 20px; margin-bottom: 10px; text-decoration: underline;">A.) Student Details:</label>
        <div class="well">
            <div class="table-responsive" style="margin-left: 15px; margin-bottom: 15px;">
                <table class="table table-bordered">
                    <tbody>

                        <tr>
                            <td>
                                <label>First Name:</label></td>
                            <td>
                                <input type="text" id="studentFirstName" class="form-control" placeholder="FirstName" style="display: inline-block;" /><label id="emptyStudentFirstNameError"></label></td>

                        </tr>
                        <tr>
                            <td>
                                <label>Middle Name:</label></td>
                            <td>
                                <input type="text" id="studentMiddleName" class="form-control" placeholder="MiddleName" style="display: inline-block;" /><label id="emptyStudentMiddleNameError"></label></td>
                        </tr>
                        <tr>
                            <td>
                                <label>Last Name:</label></td>
                            <td>
                                <input type="text" id="studentLastName" class="form-control" placeholder="LastName" style="display: inline-block;" /><label id="emptyStudentLastNameError"></label></td>
                        </tr>
                        <tr>
                            <td>
                                <label>Date of Birth:</label></td>
                            <td>
                                <input type="text" id="studentDOB" class="form-control" placeholder="DateOfBirth" style="display: inline-block;" /><label id="emptyStudentDOBError"></label></td>
                        </tr>
                        <tr>
                            <td>
                                <label>Gender:</label></td>
                            <td>
                                <select id="gender" class="form-control" style="display: inline-block;">
                                    <option value="">Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <label id="emptyStudentGenderError"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Blood Group:</label></td>
                            <td>
                                <select id="bloodGroup" class="form-control" style="display: inline-block;">
                                    <option value="">BloodGroup</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>

                                </select>
                                <label id="Label1"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Academic Year:</label></td>
                            <td>
                                <select id="academicYear" class="form-control" style="display: inline-block;">
                                    <option value="">AcademicYear</option>
                                </select>
                                <label id="emptyAcademicYearError"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Standard:</label></td>
                            <td>
                                <select id="studentStandard" class="form-control" style="display: inline-block;">
                                    <option value="">Standard</option>
                                </select>
                                <label id="emptyStandardError"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Section:</label></td>
                            <td>
                                <select id="studentSection" class="form-control" style="display: inline-block;">
                                    <option value="">Section</option>
                                </select>
                                <label id="emptySectionError"></label>
                            </td>
                        </tr>


                    </tbody>
                </table>
            </div>
        </div>
        <label style="margin-left: 20px; margin-bottom: 10px; text-decoration: underline">B.) Parent Details</label>
        <div class="well" style="margin-left: 15px; margin-bottom: 15px;">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                            <label>Father's First Name:</label></td>
                        <td>
                            <input type="text" id="fatherFirstName" class="form-control" placeholder="FirstName" style="display: inline-block;" /><label id="emptyFatherFirstNameError"></label></td>

                    </tr>
                    <tr>
                        <td>
                            <label>Father's Middle Name:</label></td>
                        <td>
                            <input type="text" id="fatherMiddleName" class="form-control" placeholder="MiddleName" style="display: inline-block;" /><label id="emptyFatherMiddleNameError"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>Mother's First Name:</label></td>
                        <td>
                            <input type="text" id="motherFirstName" class="form-control" placeholder="FirstName" style="display: inline-block;" /><label id="emptyMotherFirstNameError"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>Mother's Middle Name:</label></td>
                        <td>
                            <input type="text" id="motherMiddleName" class="form-control" placeholder="MiddleName" style="display: inline-block;" /><label id="emptyMotherMiddleNameError"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>Last Name:</label></td>
                        <td>
                            <input type="text" id="parentLastName" class="form-control" placeholder="LastName" style="display: inline-block;" /><label id="emptyParentLastNameError"></label></td>
                    </tr>

                    <tr>
                        <td>
                            <label>Father's Occupation:</label></td>
                        <td>
                            <select id="fatherOccupation" class="form-control" style="display: inline-block;">
                                <option value="">Occupation</option>
                            </select>
                            <label id="emptyFatherOccupationError"></label>

                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Mother's Occupation:</label></td>
                        <td>
                            <select id="motherOccupation" class="form-control" style="display: inline-block;">
                                <option value="">Occupation</option>
                            </select>
                            <label id="emptyMotherOccupationError"></label>

                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Guardian's Full Name:</label></td>
                        <td>
                            <input type="text" id="guardianName" class="form-control" placeholder="FullName(optional)" style="display: inline-block;" /><label id="emptyGuardianNameError"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>Guardian's Occupation:</label></td>
                        <td>
                            <select id="guardianOccupation" class="form-control" style="display: inline-block;">
                                <option value="">Occupation(optional)</option>
                            </select>
                            <label id="emptyguardianOccupationError"></label>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <label style="margin-left: 20px; margin-bottom: 10px; text-decoration: underline">C.) Address Details</label>
        <div class="well" style="margin-left: 15px; margin-bottom: 15px;">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                            <label>House No/Name:</label></td>
                        <td>
                            <input type="text" id="houseNumber" class="form-control" placeholder="No/Name" style="display: inline-block;" /><label id="emptyHouseNumberError"></label></td>

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
                            <input type="text" id="pinCode" class="form-control" placeholder="PinCode" style="display: inline-block;" /><label id="emptyPinCodeError"></label></td>
                    </tr>


                </tbody>
            </table>
        </div>

        <label style="margin-left: 20px; margin-bottom: 10px; text-decoration: underline">D.) Contact Details</label>
        <div class="well" style="margin-left: 15px; margin-bottom: 15px;">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                            <label>Mobile Number:</label></td>
                        <td>
                            <input type="text" id="mobileNumber" class="form-control" placeholder="MobileNumber" style="display: inline-block;" /><label id="emptyMobileNumberError"></label></td>

                    </tr>
                    <tr>
                        <td>
                            <label>Landline Number:</label></td>
                        <td>
                            <input type="text" id="landlineNumber" class="form-control" placeholder="LandlineNumber" style="display: inline-block;" /><label id="emptyLandlineNumberError"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>EmailID:</label></td>
                        <td>
                            <input type="text" id="emailID" class="form-control" placeholder="EmailID" style="display: inline-block;" /><label id="emptyEmailIDError"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>Emergency Number:</label></td>
                        <td>
                            <input type="text" id="emergencyNumber" class="form-control" placeholder="EmergencyNumber" style="display: inline-block;" /><label id="emptyEmergencyNumber"></label></td>


                    </tr>
                </tbody>
            </table>
        </div>

        <label style="margin-left: 20px; margin-bottom: 10px; text-decoration: underline">E.) Transport Details</label>
        <div class="well" style="margin-left: 15px; margin-bottom: 15px;">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                            <label>Transport Type:</label></td>
                        <td>
                            <select id="transportType" class="form-control" style="display: inline-block;">
                                <option value="">TransportType</option>
                                <option value="SchoolService">School Service</option>
                                <option value="Private">Private</option>
                            </select>
                            <label id="emptyTransportTypeError"></label>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <label>Route Description:</label></td>
                        <td>
                            <input type="text" id="routeDescription" class="form-control" placeholder="RouteDescription" style="display: inline-block;" /><label id="emptyRouteDescriptionError"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>Driver's RegID:</label></td>
                        <td>
                            <input type="text" id="driverRegID" class="form-control" placeholder="DriverRegID" style="display: inline-block;" /><label id="emptyDriverRegIDError"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>Vehicle Number:</label></td>
                        <td>
                            <input type="text" id="vehicleNumber" class="form-control" placeholder="VehicleNumber" style="display: inline-block;" /><label id="emptyVehicleNumberError"></label></td>


                    </tr>
                </tbody>
            </table>
        </div>


        <div id="editStudentDiv" style="width: 100px; margin: 0 auto;">
            <button id="updateDetails" type="button" class="btn btn-primary btn-sm">Update Details</button>
        </div>
        <div id="uploadSuccess" style="text-align:center;font-weight:bold;color:black;">
            
        </div>
       
    </div>
</asp:Content>
