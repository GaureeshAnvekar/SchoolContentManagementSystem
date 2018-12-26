<%@ Page Title="" Language="C#" MasterPageFile="~/pageTemplateAfterLogin.Master" AutoEventWireup="true" CodeBehind="StudentPageParentClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm3" %>
<asp:Content ID="Content1" ContentPlaceHolderID="studentPageHead" runat="server">
    <style>
        #parentContainer {
            background-color: white;
            border-radius: 10px;
            width: 75%;
            margin: 0 auto;
            margin-bottom: 15px;
            height: 200px;
            border: 2px solid;
            border-color: rgb(218,223,234);
        }
    </style>
    <script type="text/javascript">
        $(document).ready(function () {

            var parentDetailsParams = {};
            parentDetailsParams.schoolID = $.cookie("SchoolID");
            parentDetailsParams.studentID = $.cookie("StudentID");

            $.ajax({
                url: 'ContentManagement.asmx/GetParentDetails',
                method: 'post',
                contentType: 'application/json;charset=utf-8',
                data: '{parentDetailsParams:' + JSON.stringify(parentDetailsParams) + '}',
                success: function (data) {
                    if (data.d != null) {

                        for (var prop in data.d) {
                            if (prop != "__type" && prop != "schoolID" && prop != "studentID") {
                                if (prop != "GuardiansFullName" && prop != "GuardiansOccupation")
                                    //$("#queryResultContainer").append('<label style="margin-top:5px;">' + prop + ' : ' + data.d[prop] + '</label></br>');
                                    $("tbody").append('<tr><td><label>' + prop + ':</label></td><td>' + data.d[prop] + '</td></tr>');
                                else {
                                    if (data.d.FatherFirstName == null || data.d.FatherFirstName == "")
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
<asp:Content ID="attendanceBody" ContentPlaceHolderID="studentPageBody" runat="server">
   
            <div id="queryResultContainer">
                <h5 style="margin: 0 auto;width:20%"><b>Parent Details</b></h5>
                <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 5px;">
                <div class="table-responsive">
                    <table class="table table-bordered table-striped">
                        <tbody>
                          
                        </tbody>
                    </table>
                </div>
            </div>

</asp:Content>
