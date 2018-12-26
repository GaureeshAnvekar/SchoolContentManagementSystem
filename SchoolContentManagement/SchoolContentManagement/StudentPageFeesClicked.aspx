<%@ Page Title="" Language="C#" MasterPageFile="~/pageTemplateAfterLogin.Master" AutoEventWireup="true" CodeBehind="StudentPageFeesClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm5" %>

<asp:Content ID="Content1" ContentPlaceHolderID="studentPageHead" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {

            var feesDetailsParams = {};
            feesDetailsParams.schoolID = $.cookie("SchoolID");
            feesDetailsParams.studentID = $.cookie("StudentID");

            $.ajax({
                url: 'ContentManagement.asmx/GetFeesDetails',
                method: 'post',
                contentType: 'application/json;charset=utf-8',
                data: '{feesDetailsParams:' + JSON.stringify(feesDetailsParams) + '}',
                success: function (data) {
                    if (data.d != null) {

                        for (var prop in data.d) {
                            if (prop != "__type" && prop != "SchoolID" && prop != "StudentID") {
                                if (prop != "IsPaid")
                                    //$("#queryResultContainer").append('<label style="margin-top:5px;">' + prop + ' : ' + data.d[prop] + '</label></br>');
                                    $("tbody").append('<tr><td><label>' + prop + ':</label></td><td>' + data.d[prop] + '</td></tr>');
                                else {
                                    if (data.d.IsPaid == "No") {
                                        //$("#queryResultContainer").append('<label style="margin-top:5px;">' + prop + ' : ' + data.d.IsPaid + '</label></br>');
                                        //$("#queryResultContainer").append('<label style="margin-top:5px;">' + 'DueDate' + ' : ' + data.d.Due_Date + '</label></br>');
                                        $("tbody").append('<tr><td><label>' + prop + ':</label></td><td>' + data.d.IsPaid + '</td></tr>');
                                        $("tbody").append('<tr><td><label>' + 'DueDate' + ':</label></td><td>' + data.d.IsPaid + '</td></tr>');
                                        
                                        break;
                                    } else {
                                        //$("#queryResultContainer").append('<label style="margin-top:5px;">' + prop + ' : ' + data.d.IsPaid + '</label></br>');
                                        $("tbody").append('<tr><td><label>' + prop + ':</label></td><td>' + data.d.IsPaid + '</td></tr>');
                                    }
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
                <h5 style="margin: 0 auto; width: 20%"><b>Fees Details</b></h5>
                <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 5px;">
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <tbody>
                          
                        </tbody>
                    </table>
                </div>
            </div>
</asp:Content>
