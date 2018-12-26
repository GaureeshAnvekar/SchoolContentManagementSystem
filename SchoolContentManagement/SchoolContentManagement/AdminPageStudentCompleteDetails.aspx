<%@ Page Title="" Language="C#" MasterPageFile="~/AdminPageAfterLogin.Master" AutoEventWireup="true" CodeBehind="AdminPageStudentCompleteDetails.aspx.cs" Inherits="SchoolContentManagement.WebForm27" %>

<asp:Content ID="Content1" ContentPlaceHolderID="libraryPageHead" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {
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
                    var studentCompleteDetailsParams = {};
                    studentCompleteDetailsParams.schoolID = $.cookie("SchoolID");
                    studentCompleteDetailsParams.regNo = queryString["regNo"];

                    $.ajax({
                        url: 'ContentManagement.asmx/GetStudentCompleteDetails',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        data: '{studentCompleteDetailsParams:' + JSON.stringify(studentCompleteDetailsParams) + '}',
                        success: function (data) {

                            if (data.d != null) {

                                $("#registrationNo").html(data.d.regNo);
                                $("#firstName").html(data.d.firstName);
                                $("#middleName").html(data.d.middleName);
                                $("#lastName").html(data.d.lastName);
                                $("#dateOfBirth").html(data.d.DOB);
                                $("#gender").html(data.d.gender);
                                $("#bloodGroup").html(data.d.bloodGroup);
                                $("#academicYear").html(data.d.academicYear);
                                $("#standard").html(data.d.standard);
                                $("#section").html(data.d.section);
                                $("#rollNumber").html(data.d.rollNumber);

                                $("#fatherFirstName").html(data.d.fatherFirstName);
                                $("#fatherMiddleName").html(data.d.fatherMiddleName);
                                $("#motherFirstName").html(data.d.motherFirstName);
                                $("#motherMiddleName").html(data.d.motherMiddleName);
                                $("#parentLastName").html(data.d.parentLastName);
                                $("#fatherOccupation").html(data.d.fatherOccupation);
                                $("#motherOccupation").html(data.d.motherOccupation);
                                $("#guardianFullName").html(data.d.guardianName);
                                $("#guardianOccupation").html(data.d.guardianOccupation);

                                $("#houseNo").html(data.d.houseNumber);
                                $("#streetName").html(data.d.streetName);
                                $("#area").html(data.d.area);
                                $("#city").html(data.d.city);
                                $("#state").html(data.d.state);
                                $("#pinCode").html(data.d.pinCode);

                                $("#mobileNumber").html(data.d.mobileNumber);
                                $("#landlineNumber").html(data.d.landlineNumber);
                                $("#emailID").html(data.d.emailID);
                                $("#emergencyNumber").html(data.d.emergencyNumber);

                                $("#transportType").html(data.d.transportType);
                                $("#routeDescription").html(data.d.routeDescription);
                                $("#driverRegID").html(data.d.driverRegID);
                                $("#vehicleNumber").html(data.d.vehicleNumber);
                      
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
        <h5 style="margin: 0 auto; width: 20%"><b>Student Details</b></h5>
        <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 10px;">
        <label style="margin-bottom: 10px;">* The complete details for the selected student is as follows: </label>
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
                                <label id="registrationNo"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>First Name:</label></td>
                            <td>
                                <label id="firstName"></label>
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <label>Middle Name:</label></td>
                            <td>
                                <label id="middleName"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Last Name:</label></td>
                            <td>
                                <label id="lastName"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Date of Birth:</label></td>
                            <td>
                                <label id="dateOfBirth"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Gender:</label></td>
                            <td>
                              <label id="gender"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Blood Group:</label></td>
                            <td>
                                <label id="bloodGroup"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Academic Year:</label></td>
                            <td>
                                <label id="academicYear"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Standard:</label></td>
                            <td>
                                <label id="standard"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Section:</label></td>
                            <td>
                                <label id="section"></label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Roll Number:</label></td>
                            <td>
                                <label id="rollNumber"></label>
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
                            <label id="fatherFirstName"></label>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <label>Father's Middle Name:</label></td>
                        <td>
                            <label id="fatherMiddleName"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Mother's First Name:</label></td>
                        <td>
                            <label id="motherFirstName"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Mother's Middle Name:</label></td>
                        <td>
                            <label id="motherMiddleName"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Last Name:</label></td>
                        <td>
                            <label id="parentLastName"></label>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label>Father's Occupation:</label></td>
                        <td>
                            <label id="fatherOccupation"></label>

                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Mother's Occupation:</label></td>
                        <td>
         
                            <label id="motherOccupation"></label>

                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Guardian's Full Name:</label></td>
                        <td>
                           <label id="guardianFullName"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Guardian's Occupation:</label></td>
                        <td>

                            <label id="guardianOccupation"></label>
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
                            <label id="houseNo"></label>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <label>Street Name:</label></td>
                        <td>
                            <label id="streetName"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Area:</label></td>
                        <td>
                            <label id="area"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>City:</label></td>
                        <td>
                            <label id="city"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>State:</label></td>
                        <td>
                            <label id="state"></label>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <label>Pin Code:</label></td>
                        <td>
                           <label id="pinCode"></label>
                        </td>
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
                            <label id="mobileNumber"></label>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <label>Landline Number:</label></td>
                        <td>
                            <label id="landlineNumber"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>EmailID:</label></td>
                        <td>
                            <label id="emailID"></label>
                        </td>
                            
                    </tr>
                    <tr>
                        <td>
                            <label>Emergency Number:</label></td>
                        <td>
                            <label id="emergencyNumber"></label>
                        </td>


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
                            <label id="transportType"></label>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <label>Route Description:</label></td>
                        <td>
                            <label id="routeDescription"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Driver's RegID:</label></td>
                        <td>
                            <label id="driverRegID"></label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Vehicle Number:</label></td>
                        <td>
                            <label id="vehicleNumber"></label>
                        </td>


                    </tr>
                </tbody>
            </table>
        </div>


  
    </div>
</asp:Content>
