<%@ Page Title="" Language="C#" MasterPageFile="~/StaffPageAfterLogin.Master" AutoEventWireup="true" CodeBehind="SchoolFeeSetup.aspx.cs" Inherits="SchoolContentManagement.SchoolFeeSetup" %>

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
            $('#startDate').datepicker(
                {
                    dateFormat: 'dd/mm/yy',
                    changeMonth: true,
                    changeYear: true,
                    minDate: new Date(2005, 1, 1),
                    maxDate: new Date(2025, 12, 31)
                });
            $('#endDate').datepicker(
               {
                   dateFormat: 'dd/mm/yy',
                   changeMonth: true,
                   changeYear: true,
                   minDate: new Date(2005, 1, 1),
                   maxDate: new Date(2025, 12, 31)
               });

            var specialKeys = new Array();
            specialKeys.push(8); //Backspace
            $(function () {
                $(".numeric").bind("keypress", function (e) {
                    var keyCode = e.which ? e.which : e.keyCode
                    var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);
                    return ret;
                });
                $(".numeric").bind("paste", function (e) {
                    return false;
                });
                $(".numeric").bind("drop", function (e) {
                    return false;
                });
            });
            function formatCurrency(total) {
                //var neg = false;
                //if(total < 0) {
                //    neg = true;
                //    total = Math.abs(total);
                //}
                //return (neg ? "\u20B9" : '\u20B9') + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "").toString();
                return ('\u20B9' + parseFloat(total, 10).toFixed(2).replace(/(\d)(?=(\d{8})+\.)/g, "\u20B9").toString());
            }

            //$('#feeAmount').blur(function () {
            //    $(function () {
            //        var money = $('#feeAmount').val();
            //        $('#feeAmount').val((formatCurrency(money)));
            //    });
            //});

            $.ajax({
                url: 'ContentManagement.asmx/GetAllFeesSetupType',
                method: 'post',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    data = data.d;
                    $('#staffPageBody_ddlSelectFeesType').append($('<option></option>').val('-1').html('Select Fees Type'));
                    $.each(data, function (key, value) {
                        $('#staffPageBody_ddlSelectFeesType').append($('<option></option>').val(value.Id).html(value.Desc));
                    });
                },
                error: function (err) {
                    alert(err.status);
                }
            });

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
                url: 'ContentManagement.asmx/GetCollectionPeriodDetails',
                method: 'post',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    data = data.d;
                    $('#staffPageBody_ddlSelectCollectionPeriod').append($('<option></option>').val('-1').html('Select Collection Period'));
                    $.each(data, function (key, value) {
                        $('#staffPageBody_ddlSelectCollectionPeriod').append($('<option></option>').val(value.Id).html(value.Desc));
                    });
                },
                error: function (err) {
                    alert(err.status);
                }
            });
        });

        $(document).ready(function () {
            $('#btnSubmit').click(function () {
                var feeTypeEntity = {};
                var FeesType = $('#staffPageBody_ddlSelectFeesType').val();
                var AcademicYear = $("#staffPageBody_ddlSelectAcademicYear option:selected").text();
                var SelectStandard = $('#staffPageBody_ddlSelectStandard').val();
                var CollectionPeriod = $('#staffPageBody_ddlSelectCollectionPeriod').val();
                var dtStartDate = $('#startDate').val();
                var dtEndDate = $('#endDate').val();

                feeTypeEntity.FeesAccountHeadTypeId = FeesType;
                feeTypeEntity.StandardId = SelectStandard;
                feeTypeEntity.AcademicYear = AcademicYear;
                feeTypeEntity.FeeCollectionPeriodId = CollectionPeriod;
                feeTypeEntity.StartDate = dtStartDate;
                feeTypeEntity.EndDate = dtEndDate;
                feeTypeEntity.FeeAmount = $('#feeAmount').val();
                feeTypeEntity.SchoolId = $.cookie("SchoolID");

                $.ajax({
                    url: 'ContentManagement.asmx/InsertUpdateSchoolFeesType',
                    method: 'post',
                    contentType: 'application/json; charset=utf-8',
                    data: '{feeTypeEntity:' + JSON.stringify(feeTypeEntity) + '}',
                    success: function (data) {

                    },
                    error: function (err) {

                        alert(err.status);
                    }
                });
            });
        });
    </script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="staffPageBody" runat="server">
    <div id="queryResultContainer">
        <h5 style="margin: 0 auto; width: 20%"><b>Setup Fees Details</b></h5>
        <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 5px;" />
        <label id="emptyTableError"></label>
        <div class="row">
            <div class="col-xs-12">
                <div class="well">
                    <asp:Label runat="server" ID="lblSelect" Text="Setup Fees Type :" Style="text-align: left; font-weight: bold;"></asp:Label>
                    <asp:DropDownList runat="server" class="form-control" ID="ddlSelectFeesType" Style="text-align: left;">
                    </asp:DropDownList>
                    <br />
                    <asp:Label runat="server" ID="lblAcademic" Text="Select Academic Year :" Style="text-align: left; font-weight: bold;"></asp:Label>
                    <asp:DropDownList runat="server" class="form-control" ID="ddlSelectAcademicYear" Style="text-align: left;">
                    </asp:DropDownList>
                    <br />
                    <asp:Label runat="server" ID="lblStandard" Text="Select Standard :" Style="text-align: left; font-weight: bold;"></asp:Label>
                    <asp:DropDownList runat="server" class="form-control" ID="ddlSelectStandard" Style="text-align: left;">
                    </asp:DropDownList>
                    <br />
                    <asp:Label runat="server" ID="Label1" Text="Select Collection Period :" Style="text-align: left; font-weight: bold;"></asp:Label>
                    <asp:DropDownList runat="server" class="form-control" ID="ddlSelectCollectionPeriod" Style="text-align: left;">
                    </asp:DropDownList>
                    <br />
                    <label>Select Start Date :</label>
                    <input type="text" class="form-control" placeholder="Enter Start Date" id="startDate" style="width: 150px; display: inline-block;" maxlength="10" />
                    <br />
                    <label>Select End Date :</label>
                    <input type="text" class="form-control" placeholder="Enter End Date" id="endDate" style="width: 150px; display: inline-block;" maxlength="10" />
                    <br />
                    <label>Setup Fees Amount :</label>
                    <input type="text" class="form-control numeric" placeholder="Enter Fees Amount" id="feeAmount" style="width: 150px; display: inline-block;" maxlength="8" />
                </div>
                <div id="lblStatus" class="col-xs-12" style="text-align: center; margin-top: 5px; font-weight: bold; color: red;"></div>
                <div style="text-align: center;">
                    <input type="button" id="btnSubmit" class="btn btn-danger btn-md" value="SUBMIT" style="text-align: center; margin-top: 5px" />
                    <input type="button" id="btnReset" class="btn btn-danger btn-md" value="RESET" style="text-align: center; margin-top: 5px" />
                </div>
            </div>
        </div>
    </div>
</asp:Content>
