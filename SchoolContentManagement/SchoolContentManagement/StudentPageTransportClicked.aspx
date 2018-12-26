<%@ Page Title="" Language="C#" MasterPageFile="~/pageTemplateAfterLogin.Master" AutoEventWireup="true" CodeBehind="StudentPageTransportClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm8" %>
<asp:Content ID="Content1" ContentPlaceHolderID="studentPageHead" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {

            var transportDetailsParams = {};
            transportDetailsParams.schoolID = $.cookie("SchoolID");
            transportDetailsParams.studentID = $.cookie("StudentID");

            $.ajax({
                url: 'ContentManagement.asmx/GetTransportDetails',
                method: 'post',
                contentType: 'application/json;charset=utf-8',
                data: '{transportDetailsParams:' + JSON.stringify(transportDetailsParams) + '}',
                success: function (data) {
                    if (data.d != null) {
                        if (data.d.transportType == "Private") {
                            $("tbody").append('<tr><td><label>TransportType:</label></td><td>Private</td></tr>');
                        } else {
                            for (var prop in data.d) {
                            if (prop != "__type" && prop != "schoolID" && prop != "studentID") {
                                    //$("#queryResultContainer").append('<label style="margin-top:5px;">' + prop + ' : ' + data.d[prop] + '</label></br>');
                                    $("tbody").append('<tr><td><label>' + prop + ':</label></td><td>' + data.d[prop] + '</td></tr>');
                           
                                }
                            }
                        }
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
                <h5 style="margin: 0 auto;width:20%"><b>Transport Details</b></h5>
                <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 5px;">
                 <div class="table-responsive">
                     <table class="table table-bordered table-striped">
                         <tbody>

                         </tbody>
                     </table>
                 </div>
            </div>
</asp:Content>
