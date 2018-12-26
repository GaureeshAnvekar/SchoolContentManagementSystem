<%@ Page Title="" Language="C#" MasterPageFile="~/LibraryPageTemplate.Master" AutoEventWireup="true" CodeBehind="LibraryPageIssueBookClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm22" %>

<asp:Content ID="Content1" ContentPlaceHolderID="libraryPageHead" runat="server">
    <script type="text/javascript">

        $(document).ready(function () {

            $("#loanDate").datepicker({ dateFormat: "dd-mm-yy" }).datepicker("setDate", new Date());

            $("#dueDays").focusout(function () {
                var dueDate = $("#loanDate").datepicker('getDate');
                dueDate.setDate(dueDate.getDate() + parseInt($("#dueDays").val()));

                $("#dueDate").datepicker({ dateFormat: "dd-mm-yy" }).datepicker('setDate', dueDate);
            });

            $('#issueBook').click(function () {

                $("#issueSuccess").html("");

                var countOfElementsFilled = 0;

                if ($("#bookID").val() == "")
                    $("#emptyBookIDError").text("*Enter the BookID!");
                else {
                    $("#emptyBookIDError").text("");
                    countOfElementsFilled++;
                }

                if ($("#dueDate").val() == "")
                    $("#emptyDueDateError").text("*Enter the Due Date!");
                else {
                    $("#emptyDueDateError").text("");
                    countOfElementsFilled++;
                }

                if (!/^\d+$/.test($("#dueDays").val()))
                    $("#emptyDueDaysError").text("*Enter no.of Days!");
                else {
                    $("#emptyDueDaysError").text("");
                    countOfElementsFilled++;
                }

                if ($("#regID").val() == "")
                    $("#emptyRegIDError").text("*Enter the RegID!");
                else {
                    $("#emptyRegIDError").text("");
                    countOfElementsFilled++;
                }

                if ($("input[type='radio']:checked").val() == null)
                    $("#emptyTypeError").text("*Select the Type!");
                else {
                    $("#emptyTypeError").text("");
                    countOfElementsFilled++;
                }





                if (countOfElementsFilled == 5) {

                    $("issueSuccess").html("");
                    var issueBookParams = {};
                    issueBookParams.bookID = $("#bookID").val();
                    issueBookParams.loanDate = $("#loanDate").val();
                    issueBookParams.dueDays = $("#dueDays").val();
                    issueBookParams.dueDate = $("#dueDate").val();
                    issueBookParams.regID = $("#regID").val();
                    issueBookParams.type = $("input[type='radio']:checked").val();
                    issueBookParams.schoolID = $.cookie('SchoolID');

              
                    $.ajax({
                        url: 'ContentManagement.asmx/IssueBook',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        data: '{issueBookParams:' + JSON.stringify(issueBookParams) + '}',
                        success: function (data) {

                            if (!(data.d > 0))
                                $("#issueSuccess").html("Incorrect BookID / RegID!");
                            else
                                $("#issueSuccess").html("Book Issued Successfully!");
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
        <h5 style="margin: 0 auto; width: 20%"><b>Issue Book</b></h5>
        <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 10px;">
        <label style="margin-bottom: 10px;">1.) To issue a book, please enter following details: </label>
        <br />
        <div class="table-responsive" style="margin-left: 15px;">
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <td><label>BookID:</label></td>
                        <td>
                            <input type="text" id="bookID" class="form-control" placeholder="BookID" style="display: inline-block; width: 160px;" /><label id="emptyBookIDError" style="margin-left:35px;"></label>
                        </td> 
                    </tr>
                    <tr>
                        <td><label>Loan Date:</label></td>
                        <td>
                            <input type="text" id="loanDate" class="form-control" placeholder="Date" style="display: inline-block; width: 160px;" /><label id="emptyDateError" style="margin-left:35px;"></label>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Due in Days:</label></td>
                        <td>
                             <input type="text" id="dueDays" class="form-control" placeholder="Days" style="display: inline-block; width: 160px;" /><label id="emptyDueDaysError" style="margin-left:35px;"></label>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Due Date:</label></td>
                        <td>
                             <input type="text" id="dueDate" class="form-control" placeholder="DueDate" style="display: inline-block; width: 160px;" /><label id="emptyDueDateError" style="margin-left:35px;"></label><br />
                            <label style="font-size:12px;">(Calculated automatically)</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>RegID:</label></td>
                        <td>
                            <input type="text" id="regID" class="form-control" placeholder="RegID" style="display: inline-block; width: 160px;" /><label id="emptyRegIDError" style="margin-left:35px;"></label></td>
                    </tr>
                    <tr>
                        <td>
                            <label>Type:</label></td>
                        <td>
                            <label class="radio-inline">
                                <input  type="radio" name="optradio" value="student" /><b>STUDENT</b></label>
                            <label class="radio-inline">
                                <input  type="radio" name="optradio" value="staff" /><b>STAFF</b></label>
                            <label id="emptyTypeError" style="margin-left:25px;"></label>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
        <div id="uploadBookDiv" style="width: 100px; margin: 0 auto;">
            <button id="issueBook" type="button" class="btn btn-primary btn-sm">Issue Book</button>
        </div>
        <div style="width: 200px; margin: 0 auto;">
            <label id="issueSuccess" style="margin: 0 auto;"></label>
        </div>

    </div>
</asp:Content>

