<%@ Page Title="" Language="C#" MasterPageFile="~/StaffPageAfterLogin.Master" AutoEventWireup="true" CodeBehind="StaffPageUpdateAttendanceClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm12" %>

<asp:Content ID="Content1" ContentPlaceHolderID="staffPageHead" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {

            $("#date").datepicker();

            var classStudentNamesParams = {};
            classStudentNamesParams.schoolID = $.cookie("SchoolID");
            classStudentNamesParams.standard = $.cookie("ClassTeacherOfStd");
            classStudentNamesParams.section = $.cookie("ClassTeacherOfSection");

            $.ajax({
                url: 'ContentManagement.asmx/GetClassStudentNames',
                method: 'post',
                contentType: 'application/json;charset=utf-8',
                data: '{classStudentNamesParams:' + JSON.stringify(classStudentNamesParams) + '}',
                success: function (data) {
                    if (data.d != null) {

                        $("tbody").append('<tr><td style="text-decoration:underline";><b>ROLLNO</b></td><td style="text-decoration:underline";><b>STUDENT NAME</b></td><td style="text-decoration:underline";><b>STATUS</b></td></tr>');

                        data.d.studentNames.forEach(function (student) {
                            $("tbody").append('<tr><td><label>' + student.rollNo + '.</label></td><td><label>' + student.firstName + ' ' + student.middleName + ' ' + student.lastName +  '</label></td><td><input type="checkbox" id='+student.rollNo+'></td></tr>');
                        });

                        $("#submitAttendance").click(function () {
                            var dateArray = $("#date").val().split("/");
                            var month = dateArray[0];
                            var day = dateArray[1];
                            var year = dateArray[2];

                            var students = [];
                            console.log($("tr").length);

                            data.d.studentNames.forEach(function (student, index) {
                                students[index] = {};
                                students[index].schoolID = $.cookie('SchoolID');
                                students[index].studentID = student.studentID;
                                students[index].day = day;
                                students[index].month = month;
                                students[index].year = year;

                                if ($("#" + (index+1)).is(":checked"))
                                    students[index].isPresent = 1;
                                else
                                    students[index].isPresent = 0;
                            });
                            //for (var i = 1; i <= $("tr").length; i++) {
                            //    console.log(data.d.studentNames[9].studentID);
                            //    console.log(i - 1);
                            //    students[i - 1] = {};
                            //    students[i - 1].schoolID = $.cookie('SchoolID');
                            //    students[i - 1].studentID = data.d.studentNames[i-1].studentID;
                            //    students[i - 1].day = day;
                            //    students[i - 1].month = month;
                            //    students[i - 1].year = year;

                            //    if ($('#' + i).is(":checked"))
                            //        students[i - 1].isPresent = 1;
                            //    else
                            //        students[i - 1].isPresent = 0;
                            //}

                            $.ajax({
                                url: 'ContentManagement.asmx/SetClassAttendance',
                                method: 'post',
                                contentType: 'application/json;charset=utf-8',
                                data: '{students:' + JSON.stringify(students) + '}',
                                success: function(data){
                                alert("Yes");
                            }
                            });
                        });
                       
                            } else {
                        $("#emptyTableError").html("Available only for Class Teachers!");
                    }
                },
                error: function (err) {
                    alert("wrong");
                }
            });

           
        });

    </script>
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="staffPageBody" runat="server">

    <div id="queryResultContainer">
        <h5 style="margin: 0 auto; width: 20%"><b>Update Attendance</b></h5>
        <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 5px;">
        <label id="emptyTableError"></label>
        <br />
        <label>Select Attendance Date:</label>
        <input type="text" class="form-control" placeholder="DATE" id="date" style="width: 150px; display: inline-block;" />
        <div class="table-responsive" style="margin-top: 15px;">
            <table class="table table-bordered table-striped">
                <tbody>
                </tbody>
            </table>
        </div>
        <div style="margin: 0 auto;width:200px;">
            <button type="button" class="btn btn-primary btn-sm" id="submitAttendance" style="margin: 0 auto;">Submit Attendance</button>
        </div>
    </div>


</asp:Content>
