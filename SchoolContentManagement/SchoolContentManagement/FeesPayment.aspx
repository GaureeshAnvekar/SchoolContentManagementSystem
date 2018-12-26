<%@ Page Title="" Language="C#" MasterPageFile="~/StaffPageAfterLogin.Master" AutoEventWireup="true" CodeBehind="FeesPayment.aspx.cs" Inherits="SchoolContentManagement.FeesPayment" %>

<asp:Content ID="Content1" ContentPlaceHolderID="staffPageHead" runat="server">
    <%-- Style --%>
    <link href="css/bootstrap-theme.css" rel="stylesheet" />
    <link href="css/bootstrap-theme.min.css" rel="stylesheet" />
    <link href="css/bootstrap.css" rel="stylesheet" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <%-- End --%>

    <%-- Script --%>
    <script src="js/bootstrap.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <%--<script src="js/npm.js"></script>--%>
    <script src="js/jquery-1.11.3.js"></script>
    <script src="js/jquery-ui.js"></script>
    <script src="js/jquery-ui.min.js"></script>
    <link href="css/jquery-ui.css" rel="stylesheet" />
    <script src="js/jquery.cookie.js"></script>
    <script src="js/jquery.validate.min.js"></script>
    <link href="css/jquery-ui.theme.css" rel="stylesheet" />
    <%-- End --%>

    <script type="text/javascript">
        $(document).ready(function () {
            $.ajax({
                url: 'ContentManagement.asmx/GetAcademicYear',
                method: 'post',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    data = data.d;
                    $('#staffPageBody_ddlSelectAcademicYear').append($('<option></option>').val('-1').html('Select Academic Year'));
                    $.each(data, function (key, value) {
                        $('#staffPageBody_ddlSelectAcademicYear').append($('<option></option>').val(value.Id).html(value.AcademicYear));
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
                    $('#staffPageBody_ddlSelectStandard').append($('<option></option>').val('-1').html('Select Standard'));
                    $.each(data, function (key, value) {
                        $('#staffPageBody_ddlSelectStandard').append($('<option></option>').val(value.Id).html(value.Standard));
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
                    $('#staffPageBody_ddlSelectSection').append($('<option></option>').val('-1').html('Select Section'));
                    $.each(data, function (key, value) {
                        $('#staffPageBody_ddlSelectSection').append($('<option></option>').val(value.Id).html(value.Section));
                    });
                },
                error: function (err) {
                    alert(err.status);
                }
            });

        });

        $(document).ready(function () {
            $('#staffPageBody_ddlSelectStandard').change(function () {
                var StandardId = $(this).val();
                var AcademicYear = $("#staffPageBody_ddlSelectAcademicYear option:selected").text();
                var feesTypeEntity = {};
                feesTypeEntity.SchoolId = $.cookie("SchoolID");
                feesTypeEntity.StandardId = StandardId;
                feesTypeEntity.AcademicYear = AcademicYear;

                if (StandardId != 0) {
                    $.ajax({
                        url: 'ContentManagement.asmx/GetFeesTypeAndAmountDetails',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        data: '{feesTypeEntity:' + JSON.stringify(feesTypeEntity) + '}',
                        dataType: 'json',
                        success: function (data) {
                            if (data.d != null) {
                                var result = '';
                                data = data.d;
                                $.each(data, function (key, value) {
                                    result += '<tr>'
                                        + '<td>' + value.FeeAccountHeadDesc + '</td>'
                                        + '<td>' + value.FeeCollectionPeriodDesc + '</td>'
                                        + '<td>' + value.FeeAmount + '</td>'
                                        + '<td>' + '<input type="text" id="txt_' + value.FeeAccountHeadId + '" class="textbox" />' + '</td></tr>';
                                });
                                $("#tbodyFeesContent").html(result);
                            }
                            else {
                                $("#tbodyFeesContent").html('No data available');
                            }
                        },
                        error: function (err) {
                            alert(err.status);
                        }
                    });
                }
                else {
                    alert('no data');
                }
            });
        });

        $(document).ready(function () {
            $('#txtRollNo').change(function () {
                var studentEntity = {};

                var StandardId = $('#staffPageBody_ddlSelectStandard').val();
                var SectionId = $('#staffPageBody_ddlSelectSection').val();
                var RollNo = $('#txtRollNo').val();

                studentEntity.SchoolID = $.cookie("SchoolID");
                studentEntity.StandardId = StandardId;
                studentEntity.SectionID = SectionId;
                studentEntity.RollNumber = RollNo;

                if (StandardId != 0) {
                    $.ajax({
                        url: 'ContentManagement.asmx/GetStudentDetails',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        data: '{studentEntity:' + JSON.stringify(studentEntity) + '}',
                        dataType: 'json',
                        success: function (data) {
                            if (data.d != null) {
                                data = data.d;
                                if (data.FirstName != null && data.LastName != null) {
                                    $.cookie('StudentID', data.StudentId);
                                    $("#divName").html('STUDENT NAME: ' + data.FirstName + ' ' + data.LastName);
                                }
                                else {
                                    $("#divName").html('NO STUDENT AVAILABLE...');
                                }
                            }
                        },
                        error: function (err) {
                            alert(err.status);
                        }
                    });
                }
                else {
                    alert('no data');
                }
            });
        });

        $(document).ready(function () {
            $('#btnSubmit').click(function () {
                var feesEntity = {};

                var StandardId = $('#staffPageBody_ddlSelectStandard').val();
                var SectionId = $('#staffPageBody_ddlSelectSection').val();

                feesEntity.SchoolID = $.cookie("SchoolID");
                feesEntity.StandardId = StandardId;
                feesEntity.SectionID = SectionId;
                feesEntity.StudentId = $.cookie("StudentID");
                feesEntity.PaymentModeId = 2;
                $('[id^=txt_]').each(function (i, item) {
                    feesEntity.FeeTypeId = 25;
                    feesEntity.ReceivedAmount = $(item).val();
                });
                feesEntity.MoneyReceiptNo = '';
                feesEntity.IsFullPayment = true;


                if (StandardId != 0) {
                    $.ajax({
                        url: 'ContentManagement.asmx/InsertStudentFeesPayment',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        data: '{feesEntity:' + JSON.stringify(feesEntity) + '}',
                        success: function (data) {
                            $("#divName").html('FEES COLLECTED SUCCESSFULLY');
                        },
                        error: function (err) {
                            alert(err.status);
                        }
                    });
                }
                else {
                    alert('no data');
                }
            });
        });
    </script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="staffPageBody" runat="server">
    <div id="queryResultContainer">
        <h5 style="margin: 0 auto; width: 20%"><b>Collect Fees Details</b></h5>
        <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 5px;" />
        <label id="emptyTableError"></label>
        <div class="row">
            <div class="col-xs-12">
                <div class="well">
                    <asp:Label runat="server" ID="lblAcademic" Text="Select Academic Year :" Style="text-align: left; font-weight: bold;"></asp:Label>
                    <asp:DropDownList runat="server" class="form-control" ID="ddlSelectAcademicYear" Style="text-align: left;">
                    </asp:DropDownList>
                    <br />
                    <asp:Label runat="server" ID="lblStandard" Text="Select Standard :" Style="text-align: left; font-weight: bold;"></asp:Label>
                    <asp:DropDownList runat="server" class="form-control" ID="ddlSelectStandard" Style="text-align: left;">
                    </asp:DropDownList>
                    <br />
                    <asp:Label runat="server" ID="lblSection" Text="Select Section :" Style="text-align: left; font-weight: bold;"></asp:Label>
                    <asp:DropDownList runat="server" class="form-control" ID="ddlSelectSection" Style="text-align: left;">
                    </asp:DropDownList>
                    <br />
                    <asp:Label runat="server" ID="lblRollNo" Text="Enter Roll Number :" Style="text-align: left; font-weight: bold;"></asp:Label>
                    <input type="text" id="txtRollNo" class="form-control" />
                </div>
                <div class="table-responsive" id="divFeeTypeContent">
                    <div id="divName" style="color: red; font-weight: bold; text-align: center;"></div>
                    <table style="width: 100%;" class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Fees Type</th>
                                <th>Occurrence</th>
                                <th>Required Amount</th>
                                <th>Collected Amount</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyFeesContent">
                        </tbody>
                    </table>
                </div>
                <div style="text-align: center;">
                    <input type="button" id="btnSubmit" class="btn btn-danger btn-md" value="SUBMIT" style="text-align: center; margin-top: 5px" />
                </div>
            </div>
        </div>
    </div>
</asp:Content>
