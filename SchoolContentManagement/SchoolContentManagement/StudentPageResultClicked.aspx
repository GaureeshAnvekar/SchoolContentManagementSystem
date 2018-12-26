<%@ Page Title="" Language="C#" MasterPageFile="~/pageTemplateAfterLogin.Master" AutoEventWireup="true" CodeBehind="StudentPageResultClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm6" %>

<asp:Content ID="Content1" ContentPlaceHolderID="studentPageHead" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {

            $("#checkResult").click(function () {

                if ($("#examNames option:selected").val() == 0) {
                    $(".tableRows").remove();
                    $("#errorMsg").text("Select the exam name!");
                }
                else {
                    $(".tableRows").remove();
                    $("#errorMsg").html("");
                    $("#emptyResultError").html("");

                    var resultDetailsParams = {};
                    resultDetailsParams.schoolID = $.cookie("SchoolID");
                    resultDetailsParams.studentID = $.cookie("StudentID");
                    resultDetailsParams.examTypeID = $("#examNames option:selected").val();

                    $.ajax({
                        url: 'ContentManagement.asmx/GetResultDetails',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        data: '{resultDetailsParams:' + JSON.stringify(resultDetailsParams) + '}',
                        success: function (data) {
                            if (data.d != null) {
                                if (data.d.subjectsArray.length > 0) {
                                    var securedMarksTotal = 0;
                                    var MarksTotal = 0;

                                    data.d.subjectsArray.forEach(function (sub) {
                                        $("tbody").append('<tr class="tableRows"><td><label>' + sub.subName + ':</label></td><td>' + sub.securedMarks + '/' + sub.totalMarks + '</td></tr>');
                                        securedMarksTotal += sub.securedMarks;
                                        MarksTotal += sub.totalMarks;
                                    });

                                    $("tbody").append('<tr class="tableRows"><td><label>Total Marks:</label></td><td>' + securedMarksTotal + '</td></tr>');
                                    $("tbody").append('<tr class="tableRows"><td><label>Percentage:</label></td><td>' + (securedMarksTotal / MarksTotal) * 100 + '</td></tr>');
                                }
                                else {
                                    $("#emptyResultError").html("The Result is N/A");
                                }
                            }
                        },
                        error: function (err) {
                            alert("wrong");
                        }
                    });
                }
            });
        });

    </script>
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="studentPageBody" runat="server">
   
            <div id="queryResultContainer">
                <h5 style="margin: 0 auto; width: 20%"><b>Result Details</b></h5>
                <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 5px;">
                <label>Please select the Exam Name:</label>
                     <select class="form-control" id="examNames" style="display:inline-block;width:170px;">
                         <option value="0">SELECT OPTION</option>
                         <option value="1">Mid-Term</option>
                         <option value="2">Finals</option>
                     </select> <label id="errorMsg"></label>
                    <br />
                <button type="button" class="btn btn-primary btn-sm" id="checkResult">Check Result</button> <br />
                <label id="emptyResultError"></label>
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <tbody>

                        </tbody>
                    </table>
                </div>

                
            </div>
</asp:Content>

