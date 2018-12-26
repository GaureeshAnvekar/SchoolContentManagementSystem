<%@ Page Title="" Language="C#" MasterPageFile="~/LibraryPageTemplate.Master" AutoEventWireup="true" CodeBehind="LibraryPageReceiveBookClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm23" %>

<asp:Content ID="Content1" ContentPlaceHolderID="libraryPageHead" runat="server">
    <script type="text/javascript">

        $(document).ready(function () {

            $("#returnDate").datepicker({ dateFormat: "dd-mm-yy" }).datepicker("setDate", new Date());

            var totalDue = 0;

            $('#receiveBook').click(function () {

                $("#receiveSuccess").html("");
                $("#receiveError").html("");

                var countOfElementsFilled = 0;

                if ($("#bookID").val() == "")
                    $("#emptyBookIDError").text("*Enter the BookID!");
                else {
                    $("#emptyBookIDError").text("");
                    countOfElementsFilled++;
                }

                if ($("#returnDate").val() == "")
                    $("#emptyReturnDateError").text("*Enter the Return Date!");
                else {
                    $("#emptyReturnDateError").text("");
                    countOfElementsFilled++;
                }

                if (!/^\d+$/.test($("#noOfBooks").val()) || $("#noOfBooks").val() == '0')
                    $("#emptyNoOfBooksError").text("*Enter no.of Books!");
                else {
                    $("#emptyNoOfBooksError").text("");
                    countOfElementsFilled++;
                }

                if (!/^\d+$/.test($("#perDayDueCharge").val()))
                    $("#emptyPerDayDueChargeError").text("*Enter per day due!");
                else {
                    $("#emptyPerDayDueChargeError").text("");
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



                


                if (countOfElementsFilled == 6) {


                    $("#receiveSuccess").html("");
                    $("#receiveError").html("");

                    var receiveBookParams = {};
                    receiveBookParams.bookID = $("#bookID").val();
                    receiveBookParams.returnDate = $("#returnDate").val();
                    receiveBookParams.perDayDueCharge = $("#perDayDueCharge").val();
                    receiveBookParams.regID = $("#regID").val();
                    receiveBookParams.type = $("input[type='radio']:checked").val();
                    receiveBookParams.schoolID = $.cookie('SchoolID');

                    var noOfBooks = parseInt($("#noOfBooks").val());
                    
                    $.ajax({
                        url: 'ContentManagement.asmx/ReceiveBook',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        data: '{receiveBookParams:' + JSON.stringify(receiveBookParams) + '}',
                        success: function (data) {
                        

                            if (data.d < 0)
                                $("#receiveError").html("Incorrect BookID/RegID -OR- Book already received!");
                            else {
                                $("#receiveSuccess").html("Book Received Successfully!");
                                $("#duePerBook").val(data.d);
                                totalDue += parseFloat(data.d);
                                $("#totalDue").val(totalDue);

                                noOfBooks--;
                                $("#noOfBooks").val(noOfBooks);
                                if (noOfBooks == 0)
                                    totalDue = 0;
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
        <h5 style="margin: 0 auto; width: 20%"><b>Receive Book</b></h5>
        <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 10px;">
        <label style="margin-bottom: 10px;">1.) To receive books from Borrower, please enter following details: </label>
        <br />
        <div class="table-responsive" style="margin-left: 15px;">
            <table class="table table-bordered">
                <tbody>
                     <tr>
                        <td><label>No.of Books:</label></td> <br />
                        <td>
                            <input type="text" id="noOfBooks" class="form-control" placeholder="No.of Books" style="display: inline-block; width: 160px;" /><label id="emptyNoOfBooksError" style="margin-left:35px;"></label><br />
                            <label style="font-size:12px;">(Reduces by 1 automatically after receiving)</label>
                        </td> 
                    </tr>
                    <tr>
                        <td><label>Per day Due charge:</label></td>
                        <td>
                            <input type="text" id="perDayDueCharge" class="form-control" placeholder="Rs" style="display: inline-block; width: 160px;" /><label id="emptyPerDayDueChargeError" style="margin-left:35px;"></label>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Return Date:</label></td>
                        <td>
                             <input type="text" id="returnDate" class="form-control" placeholder="ReturnDate" style="display: inline-block; width: 160px;" /><label id="emptyReturnDateError" style="margin-left:35px;"></label>
                        </td>
                    </tr>
                     <tr>
                        <td><label>BookID:</label></td>
                        <td>
                            <input type="text" id="bookID" class="form-control" placeholder="BookID" style="display: inline-block; width: 160px;" /><label id="emptyBookIDError" style="margin-left:35px;"></label>
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
                     <tr>
                        <td><label>Current Book Due:</label></td>
                        <td>
                             <input type="text" id="duePerBook" class="form-control" placeholder="Rs" style="display: inline-block; width: 160px;" /><label id="emptyDuePerBook" style="margin-left:35px;"></label><br />
                             <label style="font-size:12px;">(Calculated automatically after receiving)</label>
                        </td>
                    </tr>
                     <tr>
                        <td><label>Total Due:</label></td>
                        <td>
                             <input type="text" id="totalDue" class="form-control" placeholder="Rs" style="display: inline-block; width: 160px;" /><label id="emptyTotalDue" style="margin-left:35px;"></label><br />
                             <label style="font-size:12px;">(Calculated automatically after receiving)</label>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
        <div id="uploadBookDiv" style="width: 100px; margin: 0 auto;">
            <button id="receiveBook" type="button" class="btn btn-primary btn-sm">Receive Book</button>
        </div>
        <div style="width: 200px; margin: 0 auto;">
            <label id="receiveSuccess" style="margin: 0 auto;"></label>
     
        </div>
        <div style="width:370px; margin:0 auto;">
            <label id="receiveError"></label>
         </div>

    </div>
</asp:Content>

