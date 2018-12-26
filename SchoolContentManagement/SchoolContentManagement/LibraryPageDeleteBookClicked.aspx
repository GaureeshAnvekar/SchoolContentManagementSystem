<%@ Page Title="" Language="C#" MasterPageFile="~/LibraryPageTemplate.Master" AutoEventWireup="true" CodeBehind="LibraryPageDeleteBookClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm21" %>
<asp:Content ID="Content1" ContentPlaceHolderID="libraryPageHead" runat="server">
    <script type="text/javascript">

        $(document).ready(function () {

            $('#deleteBook').click(function () {

                $("#deleteSuccess").html("");

                var countOfElementsFilled = 0;

                if ($("#bookID").val() == "")
                    $("#emptyBookIDError").text("Enter the BookID!");
                else {
                    $("#emptyBookIDError").text("");
                    countOfElementsFilled++;
                }

                



                if (countOfElementsFilled == 1) {

                    $("#deleteSuccess").html("");
                    var deleteBookParams = {};
                    deleteBookParams.bookID = $("#bookID").val();
           
                    deleteBookParams.schoolID = $.cookie('SchoolID');

                    $.ajax({
                        url: 'ContentManagement.asmx/DeleteBook',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        data: '{deleteBookParams:' + JSON.stringify(deleteBookParams) + '}',
                        success: function (data) {

                            if(data.d == 0) 
                                $("#deleteSuccess").html("BookID not present!");
                            else
                                $("#deleteSuccess").html("Deleted Successfully!");
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
                <h5 style="margin: 0 auto;width:20%"><b>Delete Book</b></h5>
                <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 10px;">
                 <label style="margin-bottom:10px;">1.) To delete a book, please enter the book ID: </label><br />
                 <div class="table-responsive" style="margin-left:15px;">
                     <table class="table table-bordered">
                         <tbody>
                             <tr>
                                 <td><label>Book ID:</label></td>
                                 <td><input type="text" id="bookID" class="form-control" placeholder="BookID" style="display: inline-block; width: 160px;" /><label id="emptyBookIDError"></label></td>
                              </tr>
                           </tbody>
                         </table>
                     </div>
        <div id="uploadBookDiv" style="width:100px;margin:0 auto;">
        <button id="deleteBook" type="button" class="btn btn-primary btn-sm">Delete Book</button>
            </div>
        <div style="width:150px;margin:0 auto;">
                <label id="deleteSuccess" style="margin:0 auto;"></label>
        </div>
       
    </div>
</asp:Content>
 