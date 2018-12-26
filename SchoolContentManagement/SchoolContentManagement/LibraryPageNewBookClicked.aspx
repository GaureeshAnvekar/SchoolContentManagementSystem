<%@ Page Title="" Language="C#" MasterPageFile="~/LibraryPageTemplate.Master" AutoEventWireup="true" CodeBehind="LibraryPageNewBookClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm20" %>
<asp:Content ID="Content1" ContentPlaceHolderID="libraryPageHead" runat="server">
    <script type="text/javascript">

        $(document).ready(function () {

            $('#uploadBook').click(function () {

                $("#uploadSuccess").html("");

                var countOfElementsFilled = 0;

                if ($("#bookID").val() == "")
                    $("#emptyBookIDError").text("Enter the BookID!");
                else {
                    $("#emptyBookIDError").text("");
                    countOfElementsFilled++;
                }

                if ($("#bookTitle").val() == "")
                    $("#emptyTitleError").text("Enter the Title!");
                else {
                    $("#emptyTitleError").text("");
                    countOfElementsFilled++;
                }

                if ($("#bookAuthor").val() == "")
                    $("#emptyAuthorError").text("Enter the Author!");
                else {
                    $("#emptyAuthorError").text("");
                    countOfElementsFilled++;
                }

                if ($("#bookPublisher").val() == "")
                    $("#emptyPublisherError").text("Enter the Publisher!");
                else {
                    $("#emptyPublisherError").text("");
                    countOfElementsFilled++;
                }

                if ($("#bookMRP").val() == "" || !(/^\d+$/.test($("#bookMRP").val())))
                    $("#emptyMRPError").text("Enter a valid MRP!");
                else {
                    $("#emptyMRPError").text("");
                    countOfElementsFilled++;
                }

                if ($("#bookCost").val() == "" || !(/^\d+$/.test($("#bookCost").val())))
                    $("#emptyCostError").text("Enter a valid Cost!");
                else {
                    $("#emptyCostError").text("");
                    countOfElementsFilled++;
                }

                if ($("#bookYearOfPurchase").val() == "" || !(/^\d+$/.test($("#bookYearOfPurchase").val())))
                    $("#emptyYearOfPurchaseError").text("Enter a valid Year of purchase!");
                else {
                    $("#emptyYearOfPurchaseError").text("");
                    countOfElementsFilled++;
                }



                if (countOfElementsFilled == 7) {

                    $("#uploadSuccess").html("");
                    var newBookEntryParams = {};
                    newBookEntryParams.bookID = $("#bookID").val();
                    newBookEntryParams.title = $("#bookTitle").val();
                    newBookEntryParams.author = $("#bookAuthor").val();
                    newBookEntryParams.publisher = $("#bookPublisher").val();
                    newBookEntryParams.MRP = $("#bookMRP").val();
                    newBookEntryParams.cost = $("#bookCost").val();
                    newBookEntryParams.yearOfPurchase = $("#bookYearOfPurchase").val();
                    newBookEntryParams.schoolID = $.cookie('SchoolID');

                        $.ajax({
                            url: 'ContentManagement.asmx/NewBookEntry',
                            method: 'post',
                            contentType: 'application/json;charset=utf-8',
                            data: '{newBookEntryParams:' + JSON.stringify(newBookEntryParams) + '}',
                            success: function () {
                                $("#uploadSuccess").html("Uploaded Successfully!");
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
                <h5 style="margin: 0 auto;width:20%"><b>Enter New Book</b></h5>
                <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 10px;">
                 <label style="margin-bottom:10px;">1.) To enter a new book, please enter following details: </label><br />
                 <div class="table-responsive" style="margin-left:15px;">
                     <table class="table table-bordered">
                         <tbody>
                             <tr>
                                 <td><label>Book ID:</label></td>
                                 <td><input type="text" id="bookID" class="form-control" placeholder="BookID" style="display: inline-block; width: 160px;" /><label id="emptyBookIDError"></label></td>
                                 
                             </tr>
                             <tr>
                                 <td><label>Title:</label></td>
                                 <td><input type="text" id="bookTitle" class="form-control" placeholder="Title" style="display: inline-block; width: 160px;" /><label id="emptyTitleError"></label></td>
                             </tr>
                             <tr>
                                 <td><label>Author:</label></td>
                                 <td><input type="text" id="bookAuthor" class="form-control" placeholder="Author" style="display: inline-block; width: 160px;" /><label id="emptyAuthorError"></label></td>
                             </tr>
                             <tr>
                                 <td><label>Publisher:</label></td>
                                 <td><input type="text" id="bookPublisher" class="form-control" placeholder="Publisher" style="display: inline-block; width: 160px;" /><label id="emptyPublisherError"></label></td>
                             </tr>
                             <tr>
                                 <td><label>MRP:</label></td>
                                 <td><input type="text" id="bookMRP" class="form-control" placeholder="MRP" style="display: inline-block; width: 160px;" /><label id="emptyMRPError"></label></td>
                             </tr>
                             <tr>
                                 <td><label>Cost:</label></td>
                                 <td><input type="text" id="bookCost" class="form-control" placeholder="Cost" style="display: inline-block; width: 160px;" /><label id="emptyCostError"></label></td>
                             </tr>
                             <tr>
                                 <td><label>Year Of Purchase:</label></td>
                                 <td><input type="text" id="bookYearOfPurchase" class="form-control" placeholder="YearOfPurchase" style="display: inline-block; width: 160px;" /><label id="emptyYearOfPurchaseError"></label></td>
                             </tr>

                           </tbody>
                         </table>
                     </div>
        <div id="uploadBookDiv" style="width:100px;margin:0 auto;">
        <button id="uploadBook" type="button" class="btn btn-primary btn-sm">Upload Book</button>
            </div>
        <div style="width:180px;margin:0 auto;">
                <label id="uploadSuccess" style="margin:0 auto;"></label>
        </div>
         <br /> <br />
        <label>2.) To enter a bulk of books, please select an appropriate excel sheet:</label>
    </div>
</asp:Content>
 