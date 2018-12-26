<%@ Page Title="" Language="C#" MasterPageFile="~/AdminPageAfterLogin.Master" AutoEventWireup="true" CodeBehind="AdminPageStudentSectionTransfer.aspx.cs" Inherits="SchoolContentManagement.AdminPageStudentSectionTransfer" %>

<asp:Content ID="Content1" ContentPlaceHolderID="libraryPageHead" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {
            $.ajax({
                url: 'ContentManagement.asmx/GetAcademicYear',
                method: 'post',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    data = data.d;
                    $('#studentBatch').append($('<option></option>').val('-1').html('Select Academic Year'));
                    $.each(data, function (key, value) {
                        $('#studentBatch').append($('<option></option>').val(value.Id).html(value.AcademicYear));
                    });
                },
                error: function (err) {
                    alert(err.status);
                }
            });

            $.ajax({
                url: 'ContentManagement.asmx/GetStandardDetails',
                method: 'post',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    data = data.d;
                    $('#studentStandard').append($('<option></option>').val('-1').html('Select Standard'));
                    $.each(data, function (key, value) {
                        $('#studentStandard').append($('<option></option>').val(value.Id).html(value.Standard));
                    });
                },
                error: function (err) {
                    alert(err.status);
                }
            });

            $.ajax({
                url: 'ContentManagement.asmx/GetSectionDetails',
                method: 'post',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    data = data.d;
                    $('#studentSection').append($('<option></option>').val('-1').html('Select Section'));
                    $.each(data, function (key, value) {
                        $('#studentSection').append($('<option></option>').val(value.Id).html(value.Section));
                    });
                },
                error: function (err) {
                    alert(err.status);
                }
            });

            $('#sectionTransfer').click(function () {
                
                $('#transferSuccess').html("");
                var studentSectionTransfer = {};
                studentSectionTransfer.AcademicYearId = $("#studentBatch").val();
                studentSectionTransfer.StandardId = $("#studentStandard").val();
                studentSectionTransfer.SectionID = $("#studentSection").val();
                studentSectionTransfer.StudentRegNo = $("#studentRegNo").val();
                studentSectionTransfer.SchoolID = 1;

                $.ajax({
                    url: 'ContentManagement.asmx/GetSectionTransfer',
                    method: 'post',
                    contentType: 'application/json;charset=utf-8',
                    data: '{sectionTransferEntity:' + JSON.stringify(studentSectionTransfer) + '}',
                    success: function (data) {

                        $('#transferSuccess').html("Transfer SuccessFully");
                    },
                    error: function (err) {
                        alert(err.status);
                    }
                });
            });

        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="libraryPageBody" runat="server">
    <div id="queryResultContainer">
        <h5 style="margin: 0 auto; width: 20%"><b>Section Transfer</b></h5>
        <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 10px;" />
        <label style="margin-bottom: 10px;">1: Please enter following details for Section Transfer: </label>
        <br />


        <label>Batch:</label>
        <select id="studentBatch" class="form-control" style="display: inline-block;">            
        </select>

        <label>Standard:</label>

        <select id="studentStandard" class="form-control" style="display: inline-block;">
        </select>

        <label>Section:</label>

        <select id="studentSection" class="form-control" style="display: inline-block;">
        </select>
        <label>Registration Num:</label>
        <input type="text" id="studentRegNo" class="form-control" placeholder="Registration Number" style="display: inline-block;" />
        <br />
        <br />
        <div id="uploadSectionDiv" style="width: 100px; margin: 0 auto;">
            <button id="sectionTransfer" type="button" class="btn btn-primary btn-sm">Transfer</button>
        </div>
        <div style="width: 180px; margin: 0 auto;">
            <label id="transferSuccess" style="margin: 0 auto;"></label>
        </div>

    </div>
</asp:Content>
