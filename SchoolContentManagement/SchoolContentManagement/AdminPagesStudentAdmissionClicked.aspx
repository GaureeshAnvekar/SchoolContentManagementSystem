<%@ Page Title="" Language="C#" MasterPageFile="~/AdminPageAfterLogin.Master" AutoEventWireup="true" CodeBehind="AdminPagesStudentAdmissionClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm25" %>

<asp:Content ID="Content1" ContentPlaceHolderID="libraryPageHead" runat="server">
    
    <script type="text/javascript">

        $(document).ready(function () {

            $("td:nth-child(2) label").css({ 'color': 'red' });
            $("#automatic").css({ 'color': 'black' });

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




            $('#registerStudent').click(function () {

                $("#uploadSuccess").html("");

                //var countOfElementsFilled = 0;

                //if ($("#bookID").val() == "")
                //    $("#emptyBookIDError").text("Enter the BookID!");
                //else {
                //    $("#emptyBookIDError").text("");
                //    countOfElementsFilled++;
                //}

                //if ($("#bookTitle").val() == "")
                //    $("#emptyTitleError").text("Enter the Title!");
                //else {
                //    $("#emptyTitleError").text("");
                //    countOfElementsFilled++;
                //}

                //if ($("#bookAuthor").val() == "")
                //    $("#emptyAuthorError").text("Enter the Author!");
                //else {
                //    $("#emptyAuthorError").text("");
                //    countOfElementsFilled++;
                //}

                //if ($("#bookPublisher").val() == "")
                //    $("#emptyPublisherError").text("Enter the Publisher!");
                //else {
                //    $("#emptyPublisherError").text("");
                //    countOfElementsFilled++;
                //}

                //if ($("#bookMRP").val() == "" || !(/^\d+$/.test($("#bookMRP").val())))
                //    $("#emptyMRPError").text("Enter a valid MRP!");
                //else {
                //    $("#emptyMRPError").text("");
                //    countOfElementsFilled++;
                //}

                //if ($("#bookCost").val() == "" || !(/^\d+$/.test($("#bookCost").val())))
                //    $("#emptyCostError").text("Enter a valid Cost!");
                //else {
                //    $("#emptyCostError").text("");
                //    countOfElementsFilled++;
                //}

                //if ($("#bookYearOfPurchase").val() == "" || !(/^\d+$/.test($("#bookYearOfPurchase").val())))
                //    $("#emptyYearOfPurchaseError").text("Enter a valid Year of purchase!");
                //else {
                //    $("#emptyYearOfPurchaseError").text("");
                //    countOfElementsFilled++;
                //}

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
                    studentRegistrationDetails.gender = $("#gender option:selected").text();
                    countOfRequiredElements++;
                }
                if ($("#bloodGroup option:selected").val() == "")
                    studentRegistrationDetails.bloodGroup = null;
                else
                    studentRegistrationDetails.bloodGroup = $("#bloodGroup option:selected").text();
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
                    studentRegistrationDetails.transportType = $("#transportType option:selected").text();
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
                //studentRegistrationDetails.firstName = $("#studentFirstName").val();
                //studentRegistrationDetails.middleName = $("#studentMiddleName").val();
                //studentRegistrationDetails.lastName = $("#studentLastName").val();
                //studentRegistrationDetails.DOB = $("#stdDOB").val();
                //studentRegistrationDetails.gender = $("#gender option:selected").val();
                //studentRegistrationDetails.bloodGroup = $("#bloodGroup option:selected").val();
                //studentRegistrationDetails.academicYear = $("#academicYear option:selected").text();
                //studentRegistrationDetails.standard = $("#studentStandard option:selected").val();
                //studentRegistrationDetails.section = $("#studentSection option:selected").val();
                //studentRegistrationDetails.rollNumber = $("#studentRollNumber").val();

                //studentRegistrationDetails.fatherFirstName = $("#fatherFirstName").val();
                //studentRegistrationDetails.fatherMiddleName = $("#fatherMiddleName").val();
                //studentRegistrationDetails.motherFirstName = $("#motherFirstName").val();
                //studentRegistrationDetails.motherMiddleName = $("#motherMiddleName").val();
                //studentRegistrationDetails.parentLastName = $("#parentLastName").val();
                //studentRegistrationDetails.fatherOccupation = $("#fatherOccupation option:selected").text();
                //studentRegistrationDetails.motherOccupation = $("#motherOccupation option:selected").text();
                //studentRegistrationDetails.guardianName = $("#guardianName").val();
                //studentRegistrationDetails.guardianOccupation = $("#guardianOccupation option:selected").text();

                //studentRegistrationDetails.houseNumber = $("#houseNumber").val();
                //studentRegistrationDetails.streetName = $("#streetName").val();
                //studentRegistrationDetails.area = $("#area").val();
                //studentRegistrationDetails.city = $("#city").val();
                //studentRegistrationDetails.state = $("#state").val();
                //studentRegistrationDetails.pinCode = $("#pinCode").val();

                //studentRegistrationDetails.mobileNumber = $("#mobileNumber").val();
                //studentRegistrationDetails.landlineNumber = $("#landlineNumber").val();
                //studentRegistrationDetails.emailID = $("#emailID").val();
                //studentRegistrationDetails.emergencyNumber = $("#emergencyNumber").val();

                //studentRegistrationDetails.transportType = $("#transportType option:selected").val();
                //studentRegistrationDetails.routeDescription = $("#routeDescription").val();
                //studentRegistrationDetails.driverRegID = $("#driverRegID").val();
                //studentRegistrationDetails.vehicleNumber = $("#vehicleNumber").val();

                //studentRegistrationDetails.schoolID = $.cookie("SchoolID");
                studentRegistrationDetails.schoolID = $.cookie("SchoolID");

                if (countOfRequiredElements == 18) {

                    $.ajax({
                        url: 'ContentManagement.asmx/StudentRegistration',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        data: '{studentRegistrationDetails:' + JSON.stringify(studentRegistrationDetails) + '}',
                        success: function (data) {

                            if (data.d == "Registration Failed, Inappropriate data!")
                                $("#uploadSuccess").html("Registration failed, Inappropriate data!");
                            else {
                                $("#uploadSuccess").html("Registration Successful! Student Registration Number is <b style='color:green;'>" + data.d + "</b>");
                                $("#regNo").val(data.d);
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
        <h5 style="margin: 0 auto; width: 20%"><b>Student Registration</b></h5>
        <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 10px;">
        <label style="margin-bottom: 10px;">1.) Please enter following details for student admission: </label>
        <br />
        <label style="margin-left: 20px; margin-bottom: 10px; text-decoration: underline;">A.) Student Details:</label>
        <div class="well">
            <div class="table-responsive" style="margin-left: 15px; margin-bottom: 15px;">
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <td>
                                <label>RegistrationNo:</label></td>
                            <td>
                                <input type="text" id="regNo" class="form-control" placeholder="RegistrationNo" style="display: inline-block;" />
                                <label style="font-size: 12px;color:black;" id="automatic">(Calculated automatically)</label>
                                <label id="emptyStudentRegNoError"></label>
                            </td>
                        </tr>
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


        <div id="registerStudentDiv" style="width: 100px; margin: 0 auto;">
            <button id="registerStudent" type="button" class="btn btn-primary btn-sm">Register Student</button>
        </div>
        <div style="width: 70%; margin: 0 auto;">
            <label id="uploadSuccess" style="margin: 0 auto;"></label>
        </div>
        <br />
        <br />
        <label>2.) To register students using an excel sheet, please select:</label>
    </div>
</asp:Content>

