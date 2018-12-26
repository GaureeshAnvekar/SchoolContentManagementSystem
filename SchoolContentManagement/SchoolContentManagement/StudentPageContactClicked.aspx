<%@ Page Title="" Language="C#" MasterPageFile="~/pageTemplateAfterLogin.Master" AutoEventWireup="true" CodeBehind="StudentPageContactClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm16" %>
<asp:Content ID="Content1" ContentPlaceHolderID="studentPageHead" runat="server">
<script type="text/javascript">
    $(document).ready(function () {

        var contactDetailsParams = {};
        contactDetailsParams.schoolID = $.cookie("SchoolID");
        contactDetailsParams.studentID = $.cookie("StudentID");

        $.ajax({
            url: 'ContentManagement.asmx/GetContactDetails',
            method: 'post',
            contentType: 'application/json;charset=utf-8',
            data: '{contactDetailsParams:' + JSON.stringify(contactDetailsParams) + '}',
            success: function (data) {
                if (data.d != null) {

                    for (var prop in data.d) {
                        if (prop != "__type" && prop != "schoolID" && prop != "studentID" && prop != "employeeID" ) {

                            //$("#queryResultContainer").append('<label style="margin-top:5px;">' + prop + ' : ' + data.d[prop] + '</label></br>');
                            $("tbody").append('<tr><td><label>' + prop + ':</label></td><td>' + data.d[prop] + '</td></tr>');

                        }
                    }
                } else {
                    $("#emptyTableError").html("Contact Details not provided!");
                }
            },
            error: function (err) {
                alert("wrong");
            }
        });
    });

   </script>
</asp:Content>


<asp:Content ID="Content4" ContentPlaceHolderID="studentPageBody" runat="server">
    
             <div id="queryResultContainer">
                <h5 style="margin: 0 auto;width:20%"><b>Contact Details</b></h5>
                <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 5px;">
                 <label id="emptyTableError"></label>
                 <div class="table-responsive">
                     <table class="table table-bordered table-striped">
                         <tbody>

                         </tbody>
                     </table>
                 </div>
            </div>
           
</asp:Content>
