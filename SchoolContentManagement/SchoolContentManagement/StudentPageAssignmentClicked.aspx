<%@ Page Title="" Language="C#" MasterPageFile="~/pageTemplateAfterLogin.Master" AutoEventWireup="true" CodeBehind="StudentPageAssignmentClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm29" %>

<asp:Content ID="Content1" ContentPlaceHolderID="studentPageHead" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {

            var assignmentDetailsParams = {};
            assignmentDetailsParams.schoolID = $.cookie("SchoolID");
            assignmentDetailsParams.standard = $.cookie("StudentStandard");
            assignmentDetailsParams.section = $.cookie("StudentSection");


            $.ajax({
                url: 'ContentManagement.asmx/GetStudentAssignmentDetails',
                method: 'post',
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                data: '{assignmentDetailsParams:' + JSON.stringify(assignmentDetailsParams) + '}',
                success: function (data) {
                    if (data.d.length > 0 && data.d != null) {
                        console.log(data.d);
                        $("#studentAssignmentsTable").DataTable({
                            data: data.d,
                            columns: [
                           { 'data': 'assignmentName' },
                           { 'data': 'subjectName' },
                           { 'data': 'standard' },
                           { 'data': 'section' },
                           { 'data': 'submissionDate' },
                           {
                               'data': 'Action',
                               'mRender': function (data, type, full) {
                                   return '<button type="button" class="btn btn-xs staffButtons viewButton" id=' + full["ID"] + '>View</button>';
                               }
                           },
                            ],
                            'order': [[1, 'asc']]
                        });
                    } else {
                        $("#emptyTableError").html("No assignments allotted!");
                    }


                },

                error: function (err) {
                    alert("wrong");
                }
            });

            $(document).delegate(".viewButton", "click", function () {
                var ID = $(this).attr("id");
                var url = "OpenAssignmentsHandler.ashx?ID=" + ID;
                window.location.href = url;
            }
            );
        });

    </script>
</asp:Content>


<asp:Content ID="Content4" ContentPlaceHolderID="studentPageBody" runat="server">

    <div id="queryResultContainer">
        <h5 style="margin: 0 auto; width: 20%"><b>Assignment Details</b></h5>
        <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 5px;">

        <div class="table-responsive" style="margin-left: 15px; margin-top: 50px;">
            <table class="table table-bordered table-striped table-hover" id="studentAssignmentsTable" style="border: 1px solid rgb(223,224,228);">
                <thead>
                    <tr>
                        <th>AssignmentName</th>
                        <th>SubjectName</th>
                        <th>Standard</th>
                        <th>Section</th>
                        <th>SubmissionDate</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <label id="emptyTableError"></label>
</asp:Content>
