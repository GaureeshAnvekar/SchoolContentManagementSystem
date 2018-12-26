<%@ Page Title="" Language="C#" MasterPageFile="~/pageTemplateAfterLogin.Master" AutoEventWireup="true" CodeBehind="StudentPageLibraryClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm9" %>
<asp:Content ID="Content1" ContentPlaceHolderID="studentPageHead" runat="server">
     <script type="text/javascript">
         $(document).ready(function () {

             $("#checkAvailability").click(function () {
                 if ($("#bookName").val() == "")
                     $("#emptyBookError").html("Please enter a book name!");
                 else {
                     $("#emptyBookError").html("");
                     $("#wrongName").remove();
                     $(".bookRows").remove();
                     var libraryDetailsParams = {};
                     libraryDetailsParams.schoolID = $.cookie("SchoolID");
                     libraryDetailsParams.bookName = $("#bookName").val();

                     $.ajax({
                         url: 'ContentManagement.asmx/GetLibraryDetails',
                         method: 'post',
                         contentType: 'application/json;charset=utf-8',
                         data: '{libraryDetailsParams:' + JSON.stringify(libraryDetailsParams) + '}',
                         success: function (data) {
                             if (data.d != null) {

                                 data.d.booksArray.forEach(function (bookDetails) {
                                     
                                         //$("#queryResultContainer").append('<label style="margin-top:5px;">' + prop + ' : ' + data.d[prop] + '</label></br>');
                                         $("tbody").append('<tr class="bookRows"><td><label>' + bookDetails.bookTitle + ':</label></td><td>IsAvailable:' + bookDetails.isAvailable + '</td></tr>');

                                     
                                 });
                             } else {
                                 $("#queryResultContainer").append('<label id="wrongName">Book with this name is not present in the library!</label>');
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
                <h5 style="margin: 0 auto;width:20%"><b>Library Books</b></h5>
                <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 5px;">
                 <label>Enter a book name to check it's availability:</label>
                 <input type="text" placeholder="Book Name" id="bookName" class="form-control" style="background-color:white;margin-bottom:10px;width:38%;" />
                 <button type="button" id="checkAvailability" class="btn btn-primary btn-sm">Check Availability</button><label id="emptyBookError" style="margin-left:10px;"></label>
                 <div class="table-responsive" style="margin-top:10px;">
                     <table class="table table-bordered table-striped">
                         <tbody>

                         </tbody>
                     </table>
                 </div>
            </div>
</asp:Content>
