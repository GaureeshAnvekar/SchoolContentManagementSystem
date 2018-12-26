<%@ Page Title="" Language="C#" MasterPageFile="~/StaffPageAfterLogin.Master" AutoEventWireup="true" CodeBehind="StaffPageAssignmentsClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm14" %>

<asp:Content ID="Content1" ContentPlaceHolderID="staffPageHead" runat="server">
    <script type="text/javascript">
 
        $(document).ready(function () {
            $("#submission").datepicker({ dateFormat: "yy-mm-dd" }).val();

            $("#viewDelete").click(function () {

                $(".tableRows").remove();
                var assignmentDetailsParams = {};
                assignmentDetailsParams.schoolID = $.cookie('SchoolID');
                assignmentDetailsParams.employeeID = $.cookie("EmployeeID");

                $.ajax({
                    url: 'ViewAssignmentsHandler.ashx',
                    method: 'post',
                    contentType: false,
                    data: assignmentDetailsParams,
                    success: function (data) {
                        if (data != null) {
                            var result = JSON.parse(data);
                            $("tbody").append('<tr class="tableRows"><td style="text-decoration:underline";><b>AssignmentName</b></td><td style="text-decoration:underline";><b>SubjectName</b></td><td style="text-decoration:underline";><b>Standard</b></td><td style="text-decoration:underline";><b>Section</b></td><td style="text-decoration:underline"><b>SubmissionDate</b></td><td colspan="2" style="text-decoration:underline";><b>Action</b></td></tr>');
                            result.forEach(function (assignment) {
                                $("tbody").append('<tr class="tableRows" id="' + assignment.ID + '"><td>' + assignment.assignmentName + '</td><td>' + assignment.subjectName + '</td><td>' + assignment.standard + '</td><td>' + assignment.section + '</td><td>' + assignment.submissionDate + '</td><td><button type="button" class="btn btn-xs staffButtons viewRows" id="' + assignment.ID + '" style="border-radius:0px;background-color:ButtonFace;" ><a href="OpenAssignmentsHandler.ashx?ID='+assignment.ID+'">View</a></Button></td><td><button type="button" class="btn btn-xs staffButtons deleteRows" id="' + assignment.ID + '" style="border-radius:0px;background-color:ButtonFace;" >Delete</Button></td></tr>');
                            });


                        }
                        else {
                            alert("wrong");
                            $("#emptyResultError").html("No Assignments allotted!");
                        }
                    },
                    error: function (err) {
                        alert("wrong");
                    }
                });

                $(document).delegate(".deleteRows", "click", function () {
                    var deleteRowID = this.id;
                    console.log(deleteRowID);
                    $("tr#"+deleteRowID).remove();

                    $.ajax({
                        url:'DeleteAssignmentsHandler.ashx',
                        method:'POST',
                        data: { 'ID': deleteRowID },
                        success: function() {
                        },
                        error: function(err) {
                            alert(err.statusCode);
                        }
                    });
                });
            });

            $('#uploadAssignment').click(function () {

                $("#uploadSuccess").html("");

                var countOfElementsFilled = 0;

                if ($("#name").val() == "")
                    $("#emptyNameError").text("Enter the Assignment name!");
                else {
                    $("#emptyNameError").text("");
                    countOfElementsFilled++;
                }

                if ($("#subject option:selected").val() == 0)
                    $("#emptySubjectError").text("Enter the Subject!");
                else {
                    $("#emptySubjectError").text("");
                    countOfElementsFilled++;
                }

                if ($("#standard option:selected").val() == 0)
                    $("#emptyStandardError").text("Enter the Standard!");
                else {
                    $("#emptyStandardError").text("");
                    countOfElementsFilled++;
                }

                if ($("#section option:selected").val() == 0)
                    $("#emptySectionError").text("Enter the Section!");
                else {
                    $("#emptySectionError").text("");
                    countOfElementsFilled++;
                }

                if ($("#submission").val() == "")
                    $("#emptyDateError").text("Enter the Date!");
                else {
                    $("#emptyDateError").text("");
                    countOfElementsFilled++;
                }

                if ($("#staffPageBody_file").val() == "")
                    $("#emptyFileError").text("Select a File!");
                else {
                    $("#emptyFileError").text("");
                    countOfElementsFilled++;
                }

                if (countOfElementsFilled == 6) {

                    $.cookie('StandardID', $("#standard option:selected").val());
                    $.cookie('SectionID', $("#section option:selected").val());
                    $.cookie('SubjectID', $("#subject option:selected").val());
                    $.cookie('AssignmentName', $("#name").val());
                    $.cookie('Date', $("#submission").val());


                    var files = $('#staffPageBody_file')[0].files;
                    if (files.length > 0) {
                        var formData = new FormData();
                        for (var i = 0; i < files.length; i++) {
                            formData.append(files[i].name, files[i]);
                        }

                        $.ajax({
                            url: 'UploadFileHandler.ashx',
                            method: 'post',
                            data: formData,
                            contentType: false,
                            processData: false,
                            success: function () {
                                $("#uploadSuccess").html("Uploaded Successfully!");
                            },
                            error: function (err) {
                                alert(err.statusCode);
                            }
                        });


                    }
                }
            });

            //$(document).delegate(".viewRows", 'click', function () {
            //    var assignmentID = this.id;
            //    console.log(assignmentID);
            //    $.ajax({
            //        url: 'OpenAssignmentsHandler.ashx',
            //        method: 'post',
            //        data: { 'ID': assignmentID },
            //        success: function (result) {
            //        },
            //        error: function (err) {
            //            alert(err.statusCode);
            //        }
            //    });
            //});

        });
       

       
        

    </script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="staffPageBody" runat="server">
    <div id="queryResultContainer" style="position: relative">
        <h5 style="margin: 0 auto; width: 20%"><b>Assignment Details</b></h5>
        <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 10px;">
        <label>1.) To allot a new assignment, please enter following details:</label><br />
        <label style="margin-left: 15px;">Assignment Name:</label><input type="text" id="name" class="form-control" placeholder="Name" style="display: inline-block; width: 160px; padding-left:17px; margin-left: 10px; margin-bottom: 15px; margin-top: 15px; margin-right: 5px;" /><label id="emptyNameError"></label><br />
        <label style="margin-left:13px;">Subject Name:</label>
        <select class="form-control" id="subject" style="width:160px;display:inline-block;margin-left:38px;margin-bottom:15px;margin-right:5px;">
            <option value="0">Subject</option>
            <option value="1">Maths</option>
            <option value="2">English</option>
            <option value="3">Science</option>
            <option value="4">Computer Science</option>
        </select><label id="emptySubjectError"></label><br />
        <label style="margin-left: 13px;">Select Standard:</label>
        <select class="form-control" id="standard" style="width: 160px; display: inline-block; margin-left: 23px; margin-bottom: 15px; margin-right: 5px;">
            <option value="0">Standard </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
        </select><label id="emptyStandardError"></label><br />
        <label style="margin-left: 13px;">Select Section:</label>
        <select class="form-control" id="section" style="width: 160px; display: inline-block; margin-left: 32px; margin-bottom: 15px; margin-right: 5px;">
            <option value="0">Section</option>
            <option value="1">A</option>
            <option value="2">B</option>
            <option value="3">C</option>
        </select><label id="emptySectionError"></label><br />
        <label style="margin-left: 13px;">Submission Date:</label><input type="text" id="submission" class="form-control" placeholder="Date" style="display: inline-block; width: 160px; margin-left: 18px; padding-left:17px; margin-bottom: 15px; margin-right: 5px;" /><label id="emptyDateError"></label><br />
        <label style="margin-left: 15px;">Assignment File:</label>
        <asp:FileUpload runat="server" ID="file" Style="display: inline-block; margin-left: 17px; margin-bottom: 15px;" /><br />
        <label style="margin-left: 150px;" id="emptyFileError"></label>
        <br />
        <button type="button" id="uploadAssignment" style="margin-left: 150px;background-color:ButtonFace" class="staffButtons">Upload Assignment</button> 
        <label id="uploadSuccess" style="margin-left:5px;"></label><br /><br /><br />
        <label>2.) To View / Delete assignments select:</label><button type="button" id="viewDelete" class="staffButtons" style="margin-left:5px;background-color:ButtonFace;">View/Delete</button><br />
        <div class="table-responsive" style="margin-top:20px;">
            <table class="table table-bordered table-striped">
                <tbody>

                </tbody>
            </table>
        </div>
    </div>

</asp:Content>
