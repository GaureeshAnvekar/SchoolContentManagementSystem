<%@ Page Title="" Language="C#" MasterPageFile="~/pageTemplateAfterLogin.Master" AutoEventWireup="true" CodeBehind="StudentPageAttendanceClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm2" %>

<asp:Content ID="attendanceStyles" runat="server" ContentPlaceHolderID="studentPageHead">
    <script type="text/javascript">
        $(document).ready(function () {

            $("#startDate").datepicker();
            $("#endDate").datepicker();

            $('#monthlyAttendance').click(function () {

                if($("#months option:selected").val() == 0 || $("#year option:selected").val() == 0) {
                    $("#emptyFieldsError").html("Please select required data!");
                } else {
                    $(".body1Rows").remove();
                    $("#emptyFieldsError").html("");
                    var monthlyAttendanceParams = {};

                    monthlyAttendanceParams.month = $("#months option:selected").text();
                    monthlyAttendanceParams.monthNumber = $("#months").val();
                    monthlyAttendanceParams.studentID = $.cookie("StudentID");
                    monthlyAttendanceParams.schoolID = $.cookie("SchoolID");
                    monthlyAttendanceParams.year = $("#year option:selected").val();

                    $.ajax({
                        url: 'ContentManagement.asmx/GetMonthlyAttendance',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        data: '{monthlyAttendanceParams:' + JSON.stringify(monthlyAttendanceParams) + '}',
                        success: function (data) {
                            if (data.d != null) {
                                //$.cookie('SchoolID', data.d.Id);
                                //$.cookie('FirstName', data.d.firstName);
                                //$.cookie('LastName', data.d.lastName);
                                //$.cookie('RollNo', data.d.RollNo);
                                //$.cookie('Type', data.d.type);
                                //$.cookie('StudentID', data.d.studentID);
                                var line = "The attendance status for the month of ";

                                $(".eachDay").remove();
                                $(".break").remove();

                                var container = document.getElementById('queryResultContainer');
                                var contained = document.getElementById('monthlyAttendanceStatusLine');

                                if ( $.contains(container, contained) )
                                    $("#monthlyAttendanceStatusLine").html("The attendance status for the month of " + data.d.month + " " +monthlyAttendanceParams.year+" is " + data.d.status);
                                else {
                                    $("#monthlyAttendance").after('<label id="monthlyAttendanceStatusLine" style="margin-top:5px;">' + line + data.d.month + ' ' + monthlyAttendanceParams.year+' is ' + data.d.status + '</label></br>');
                                    //$("#monthlyAttendanceStatusLine").html("The attendance status for the month of " + data.d.month + " is " + data.d.status);
                                    $("#monthlyAttendanceStatusLine").after('<br/><button type="button" class="btn btn-primary btn-xs" id="eachDayStatus"> Each day status</button></br>');
                                    //window.location.href = 'SchoolChangeContent';
                                }

                            }
                            else {
                                alert('Sorry Invalid ID Password !');
                            }
                        },
                        error: function (err) {
                            //alert(err.status);
                            alert("wrong");
                        }
                    });
                }
            });

            $(document).delegate('#eachDayStatus', 'click', function () {

                $(".body1Rows").remove();

                var monthlyAttendanceParams = {};

                monthlyAttendanceParams.month = $("#months option:selected").text();
                monthlyAttendanceParams.monthNumber = $("#months").val();
                monthlyAttendanceParams.studentID = $.cookie("StudentID");
                monthlyAttendanceParams.schoolID = $.cookie("SchoolID");
                monthlyAttendanceParams.year = $("#year option:selected").val();

                $.ajax({
                    url: 'ContentManagement.asmx/GetMonthsEachDayAttendance',
                    method: 'post',
                    contentType: 'application/json;charset=utf-8',
                    data: '{monthlyAttendanceParams:' + JSON.stringify(monthlyAttendanceParams) + '}',
                    success: function (data) {
                        if (data.d != null) {

                            var monthName = $("#months option:selected").text();

                            var container = document.getElementById("queryResultContainer");
                            var contained = document.getElementsByClassName("eachDay");

                            
                            $(".eachDay").remove();
                            $(".break").remove();

                            data.d.setOfDays.forEach( function (day)
                            {
                                var status = "";
                                if(day.isPresent == 1 )
                                    status = "Present";
                                else
                                    status = "Absent";

                                $("#tableBody1").append('<tr class="body1Rows"><td><label>' + monthName + ' ' + day.day + ' ' + day.year + ':' + '</label></td><td>' + status + '</td></tr>');
                                //$("#queryResultContainer").append('<label style="margin-top:5px;" class="eachDay">' + monthName + ' ' + day.day + ' ' + day.year + ' : ' + status + '</label><br class="break"/>');
                                 
                            });
                            ////$.cookie('SchoolID', data.d.Id);
                            ////$.cookie('FirstName', data.d.firstName);
                            ////$.cookie('LastName', data.d.lastName);
                            ////$.cookie('RollNo', data.d.RollNo);
                            ////$.cookie('Type', data.d.type);
                            ////$.cookie('StudentID', data.d.studentID);
                            //var line = "The attendance status for the month of ";

                            //var dom1 = document.getElementById('queryResultContainer');
                            //var dom2 = document.getElementById('monthlyAttendanceStatusLine');

                            //if ( dom1, dom2 )
                            //    $("#monthlyAttendanceStatusLine").html("The attendance status for the month of " + data.d.month + " is " + data.d.status);
                            //else {
                            //    $("#queryResultContainer").append('<label id="monthlyAttendanceStatusLine" style="margin-top:5px;">' + line + data.d.month + ' is' + data.d.status + '</label></br>');
                            //    //$("#monthlyAttendanceStatusLine").html("The attendance status for the month of " + data.d.month + " is " + data.d.status);
                            //    $("#queryResultContainer").append('<button type="button" class="btn btn-primary btn-xs" id="eachDayStatus"> Each day status </button>');
                            //    //window.location.href = 'SchoolChangeContent';
                            //}

                        }
                        else {
                            alert('Sorry Invalid ID Password !');
                        }
                    },
                    error: function (err) {
                        //alert(err.status);
                        alert("wrong");
                    }
                
                });
            });


            $('#periodAttendance').click(function () {

                if ($("#startDate").val() == "" || $("#endDate").val() == "") {
                    $("#emptyFieldsError2").html("Please enter required data!");
                } else {
                    $(".body2Rows").remove();
                    $("#emptyFieldsError2").html("");

                    var periodAttendanceParams = {};
                    var splitStartDateArray = $("#startDate").val().split("/");
                    var splitEndDateArray = $("#endDate").val().split("/");

                    periodAttendanceParams.startDay = splitStartDateArray[1];
                    periodAttendanceParams.startMonth = splitStartDateArray[0];
                    periodAttendanceParams.startYear = splitStartDateArray[2];

                    periodAttendanceParams.endDay = splitEndDateArray[1];
                    periodAttendanceParams.endMonth = splitEndDateArray[0];
                    periodAttendanceParams.endYear = splitEndDateArray[2];

                    periodAttendanceParams.schoolID = $.cookie("SchoolID");
                    periodAttendanceParams.studentID = $.cookie("StudentID");

                    console.log(periodAttendanceParams.startDay);
                    console.log(periodAttendanceParams.startMonth);
                    console.log(periodAttendanceParams.endDay);
                    console.log(periodAttendanceParams.endMonth);

               

                    $.ajax({
                        url: 'ContentManagement.asmx/GetPeriodAttendance',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        data: '{periodAttendanceParams:' + JSON.stringify(periodAttendanceParams) + '}',
                        success: function (data) {
                            if (data.d != null) {
                                //$.cookie('SchoolID', data.d.Id);
                                //$.cookie('FirstName', data.d.firstName);
                                //$.cookie('LastName', data.d.lastName);
                                //$.cookie('RollNo', data.d.RollNo);
                                //$.cookie('Type', data.d.type);
                                //$.cookie('StudentID', data.d.studentID);
                                var line = "The attendance status for the month of ";

                                $(".eachDay").remove();
                                $(".break").remove();
                                

                                var container = document.getElementById('queryResultContainer');
                                var contained = document.getElementById('periodAttendanceStatusLine');

                                if ($.contains(container, contained))
                                    $("#periodAttendanceStatusLine").html("The attendance status for the given period is " + data.d.status);
                                else {
                                    $("#periodAttendance").after('<label id="periodAttendanceStatusLine" style="margin-top:5px;">The attendance status for the given period is ' +  data.d.status + '</label></br>');
                                    //$("#monthlyAttendanceStatusLine").html("The attendance status for the month of " + data.d.month + " is " + data.d.status);
                                    $("#periodAttendanceStatusLine").after('<br/><button type="button" class="btn btn-primary btn-xs" id="eachDayStatusPeriod"> Each day status</button></br>');
                                    //window.location.href = 'SchoolChangeContent';
                                }

                            }
                            else {
                                alert('Sorry Invalid ID Password !');
                            }
                        },
                        error: function (err) {
                            //alert(err.status);
                            alert("wrong");
                        }
                    });
                }
            });

            $(document).delegate('#eachDayStatusPeriod', 'click', function () {

                $(".body2Rows").remove();

                var periodAttendanceParams = {};
                var splitStartDateArray = $("#startDate").val().split("/");
                var splitEndDateArray = $("#endDate").val().split("/");

                periodAttendanceParams.startDay = splitStartDateArray[1];
                periodAttendanceParams.startMonth = splitStartDateArray[0];
                periodAttendanceParams.startYear = splitStartDateArray[2];

                periodAttendanceParams.endDay = splitEndDateArray[1];
                periodAttendanceParams.endMonth = splitEndDateArray[0];
                periodAttendanceParams.endYear = splitEndDateArray[2];

                periodAttendanceParams.schoolID = $.cookie("SchoolID");
                periodAttendanceParams.studentID = $.cookie("StudentID");

                $.ajax({
                    url: 'ContentManagement.asmx/GetPeriodsEachDayAttendance',
                    method: 'post',
                    contentType: 'application/json;charset=utf-8',
                    data: '{periodAttendanceParams:' + JSON.stringify(periodAttendanceParams) + '}',
                    success: function (data) {
                        if (data.d != null) {

                            var container = document.getElementById("queryResultContainer");
                            var contained = document.getElementsByClassName("eachDay");


                            $(".eachDay").remove();
                            $(".break").remove();

                            data.d.setOfDays.forEach(function (day) {
                                var status = "";
                                if (day.isPresent == 1)
                                    status = "Present";
                                else
                                    status = "Absent";

                                $("#tableBody2").append('<tr class="body2Rows"><td><label>' + day.month + '/' + day.day + '/' + day.year +'</label></td><td>' + status + '</td></tr>');
                                //$("#queryResultContainer").append('<label style="margin-top:5px;" class="eachDay">' + monthName + ' ' + day.day + ' ' + day.year + ' : ' + status + '</label><br class="break"/>');

                            });
                            ////$.cookie('SchoolID', data.d.Id);
                            ////$.cookie('FirstName', data.d.firstName);
                            ////$.cookie('LastName', data.d.lastName);
                            ////$.cookie('RollNo', data.d.RollNo);
                            ////$.cookie('Type', data.d.type);
                            ////$.cookie('StudentID', data.d.studentID);
                            //var line = "The attendance status for the month of ";

                            //var dom1 = document.getElementById('queryResultContainer');
                            //var dom2 = document.getElementById('monthlyAttendanceStatusLine');

                            //if ( dom1, dom2 )
                            //    $("#monthlyAttendanceStatusLine").html("The attendance status for the month of " + data.d.month + " is " + data.d.status);
                            //else {
                            //    $("#queryResultContainer").append('<label id="monthlyAttendanceStatusLine" style="margin-top:5px;">' + line + data.d.month + ' is' + data.d.status + '</label></br>');
                            //    //$("#monthlyAttendanceStatusLine").html("The attendance status for the month of " + data.d.month + " is " + data.d.status);
                            //    $("#queryResultContainer").append('<button type="button" class="btn btn-primary btn-xs" id="eachDayStatus"> Each day status </button>');
                            //    //window.location.href = 'SchoolChangeContent';
                            //}

                        }
                        else {
                            alert('Sorry Invalid ID Password !');
                        }
                    },
                    error: function (err) {
                        //alert(err.status);
                        alert("wrong");
                    }

                });
            });

            $("#tillDateAttendance").click(function () {
                var tillDateAttendanceParams = {};
                tillDateAttendanceParams.schoolID = $.cookie("SchoolID");
                tillDateAttendanceParams.studentID = $.cookie("StudentID");

                $.ajax({
                    url: 'ContentManagement.asmx/GetTillDateAttendance',
                    method: 'post',
                    contentType: 'application/json;charset=utf-8',
                    data: '{tillDateAttendanceParams:' + JSON.stringify(tillDateAttendanceParams) + '}',
                    success: function (data) {
                        if (data.d != null) {

                            var container = document.getElementById('queryResultContainer');
                            var contained = document.getElementById('tillDateAttendanceStatusLine');

                            if ($.contains(container, contained))
                                $("#tillDateAttendanceStatusLine").html("The attendance status till date is " + data.d.status);
                            else {
                                $("#tillDateAttendance").after('<br/><label id="tillDateAttendanceStatusLine" style="margin-top:5px;">The attendance status till date is ' + data.d.status + '</label></br>');
                                //$("#monthlyAttendanceStatusLine").html("The attendance status for the month of " + data.d.month + " is " + data.d.status);
                                $("#tillDateAttendanceStatusLine").after('<br/><button type="button" class="btn btn-primary btn-xs" id="eachDayStatusTillDate"> Each day status</button></br>');
                                //window.location.href = 'SchoolChangeContent';
                            }
                        }
                    },
                    error: function (err) {
                        alert("wrong");
                    }
                });
            });

            $(document).delegate('#eachDayStatusTillDate', 'click', function () {

                $(".body3Rows").remove();

                var tillDateEachDayAttendanceParams = {};
                tillDateEachDayAttendanceParams.schoolID = $.cookie("SchoolID");
                tillDateEachDayAttendanceParams.studentID = $.cookie("StudentID");
   

                $.ajax({
                    url: 'ContentManagement.asmx/GetTillDateEachDayAttendanceDetails',
                    method: 'post',
                    contentType: 'application/json;charset=utf-8',
                    data: '{tillDateEachDayAttendanceParams:' + JSON.stringify(tillDateEachDayAttendanceParams) + '}',
                    success: function (data) {
                        if (data.d != null) {

                            var container = document.getElementById("queryResultContainer");
                            var contained = document.getElementsByClassName("eachDay");


                            $(".eachDay").remove();
                            $(".break").remove();

                            data.d.setOfDays.forEach(function (day) {
                                var status = "";
                                if (day.isPresent == 1)
                                    status = "Present";
                                else
                                    status = "Absent";

                                $("#tableBody3").append('<tr class="body3Rows"><td><label>' + day.month + '/' + day.day + '/' + day.year + '</label></td><td>' + status + '</td></tr>');
                                //$("#queryResultContainer").append('<label style="margin-top:5px;" class="eachDay">' + monthName + ' ' + day.day + ' ' + day.year + ' : ' + status + '</label><br class="break"/>');

                            });
                            ////$.cookie('SchoolID', data.d.Id);
                            ////$.cookie('FirstName', data.d.firstName);
                            ////$.cookie('LastName', data.d.lastName);
                            ////$.cookie('RollNo', data.d.RollNo);
                            ////$.cookie('Type', data.d.type);
                            ////$.cookie('StudentID', data.d.studentID);
                            //var line = "The attendance status for the month of ";

                            //var dom1 = document.getElementById('queryResultContainer');
                            //var dom2 = document.getElementById('monthlyAttendanceStatusLine');

                            //if ( dom1, dom2 )
                            //    $("#monthlyAttendanceStatusLine").html("The attendance status for the month of " + data.d.month + " is " + data.d.status);
                            //else {
                            //    $("#queryResultContainer").append('<label id="monthlyAttendanceStatusLine" style="margin-top:5px;">' + line + data.d.month + ' is' + data.d.status + '</label></br>');
                            //    //$("#monthlyAttendanceStatusLine").html("The attendance status for the month of " + data.d.month + " is " + data.d.status);
                            //    $("#queryResultContainer").append('<button type="button" class="btn btn-primary btn-xs" id="eachDayStatus"> Each day status </button>');
                            //    //window.location.href = 'SchoolChangeContent';
                            //}

                        }
                        else {
                            alert('Sorry Invalid ID Password !');
                        }
                    }
                    //error: function (err) {
                    //    //alert(err.status);
                    //    alert("wrong");
                    //}

                });
            });
        });
    </script>


</asp:Content>

<%--<asp:Content ID="header" ContentPlaceHolderID="basicData" runat="server">
  <div id="basicDataCol1" class="basicDataCols">
        <label class="dataLabels">FirstName:</label><asp:Label runat="server" ID="fName"></asp:Label><br />
        <label class="dataLabels">MiddleName:</label><asp:Label runat="server" ID="mName"></asp:Label><br />
        <label class="dataLabels">LastName:</label><asp:Label runat="server" ID="lName"></asp:Label>
    </div>
    <div id="basicDataCol2" class="basicDataCols">
        <label class="dataLabels">RollNo:</label><asp:Label runat="server" ID="rollNo"></asp:Label><br />
        <label class="dataLabels">Standard:</label><asp:Label runat="server" ID="standard"></asp:Label><br />
        <label class="dataLabels">DateOfBirth:</label><asp:Label runat="server" ID="dateOfBirth"></asp:Label>
    </div>
    <div id="basicDataCol3" class="basicDataCols" style="vertical-align:top;">
        <label class="dataLabels">BloodGroup:</label><asp:Label runat="server" ID="bloodGroup"></asp:Label><br />
        <label class="dataLabels">Gender:</label><asp:Label runat="server" ID="gender"></asp:Label>
    </div>


</asp:Content>--%>


<asp:Content ID="attendanceBody" ContentPlaceHolderID="studentPageBody" runat="server">
   <%-- <div class="row">
        <div class="col-lg-offset-1 col-lg-10" id="body" style="padding: 20px;">--%>
            <%--<div id="buttonMenu">
                <div class="buttonContainer">
                    <button class="btn btn-primary btn-block" id="attendanceStatus">Attendance Status</button>
                </div>
                <div class="buttonContainer">
                    <button class="btn btn-primary btn-block" id="parentDetails">Parent Details</button>
                </div>
                <div class="buttonContainer">
                    <button class="btn btn-primary btn-block" id="feesDetails">Fees Details</button>
                </div>
                <div class="buttonContainer">
                    <button class="btn btn-primary btn-block" id="resultDetails">Result Details</button>
                </div>
                <div class="buttonContainer">
                    <button class="btn btn-primary btn-block" id="schoolEvents">School Events</button>
                </div>
                <div class="buttonContainer">
                    <button class="btn btn-primary btn-block" id="transportDetails">Transport Details</button>
                </div>
                <div class="buttonContainer">
                    <button class="btn btn-primary btn-block" id="libraryBooks">Library Books</button>
                </div>
            </div>--%>
            <div id="queryResultContainer">
                <h5 style="margin: 0 auto; width: 20%"><b>Attendance Status</b></h5>
                <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 5px;">
                <label>1.) For month wise attendance status, please select a month and year:</label><br />
                <select class="form-control" id="months" style="width: 170px; display: inline-block;">
                    <option value="0">SELECT MONTH</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                <select class="form-control" id="year" style="width:170px;display:inline-block;">
                    <option value="0">SELECT YEAR</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                </select>
                <button type="button" class="btn btn-primary btn-sm" id="monthlyAttendance" style="margin-left: 5px; display: inline-block;">Check Attendance</button>
                <label style="margin-bottom:0px;" id="emptyFieldsError"></label>
                <%-- <!-- <label id="monthlyAttendanceStatusLine" style="margin-top:5px;"></label> --> --%>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <tbody id="tableBody1">

                        </tbody>
                    </table>
                </div><br />

                <label>2.) For attendance status of a specific period, please enter start date and end date:</label><br />
                
                <input type="text" id="startDate" class="form-control" placeholder="START DATE" style="width:170px;display:inline-block;"/>
                <input type="text" id="endDate" class="form-control" placeholder="END DATE" style="width:170px;display:inline-block;" />
                 <button type="button" class="btn btn-primary btn-sm" id="periodAttendance" style="margin-left: 5px; display: inline-block;">Check Attendance</button>   
                <label id="emptyFieldsError2"></label>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <tbody id="tableBody2">

                        </tbody>
                    </table>
                </div><br />

                <label>3.) For complete attendance status till date, click:</label>
                <button type="button" class="btn btn-primary btn-sm" id="tillDateAttendance" style="margin-left: 10px; display: inline-block;">Check Attendance</button>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <tbody id="tableBody3">

                        </tbody>
                    </table>
                </div>

            </div>
      <%--  </div>

    </div>--%>

</asp:Content>
