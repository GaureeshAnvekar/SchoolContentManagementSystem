<%@ Page Title="" Language="C#" MasterPageFile="~/AdminPageAfterLogin.Master" AutoEventWireup="true" CodeBehind="AdminPageClasspromotion.aspx.cs" Inherits="SchoolContentManagement.AdminPageClasspromotion" %>

<asp:Content ID="Content1" ContentPlaceHolderID="libraryPageHead" runat="server">

    <script type="text/javascript">
        $(document).ready(function () {

            var table;
            var regNoArray = [];

            $.ajax({
                url: 'ContentManagement.asmx/GetAcademicYear',
                method: 'post',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    data = data.d;
                    $('#academicYear').append($('<option></option>').val('-1').html('Select Academic Year'));
                    $.each(data, function (key, value) {
                        $('#academicYear').append($('<option></option>').val(value.Id).html(value.AcademicYear));
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
                    $('#standard').append($('<option></option>').val('-1').html('Select Standard'));
                    $.each(data, function (key, value) {
                        $('#standard').append($('<option></option>').val(value.Id).html(value.Standard));
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
                    $('#section').append($('<option></option>').val('-1').html('Select Section'));
                    $.each(data, function (key, value) {
                        $('#section').append($('<option></option>').val(value.Id).html(value.Section));
                    });
                },
                error: function (err) {
                    alert(err.status);
                }
            });

            $('#standard').change(function () {

                $("promoteSuccess").html("");
                $('#studentSearchTable tbody').html('');
                $("#studentSearchTable").dataTable().fnDestroy();

                var searchStudentParams = {};

                if ($("#standard option:selected").val() == "" || $("#academicYear option:selected").val() == "") {
                    searchStudentParams.standardID = null;
                    searchStudentParams.sectionID = null;
                    searchStudentParams.academicYear = null;
                } else {
                    searchStudentParams.standardID = $("#standard option:selected").text();
                    searchStudentParams.academicYear = $("#academicYear option:selected").val();
                    searchStudentParams.sectionID = null;
                }

                searchStudentParams.schoolID = $.cookie("SchoolID");

                $.ajax({
                    url: 'ContentManagement.asmx/SearchStudent',
                    method: 'post',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data: '{searchStudentParams:' + JSON.stringify(searchStudentParams) + '}',
                    success: function (data) {

                        //$("#studentSearchTable").dataTable({
                        //    data: data.d,
                        //    columns: [
                        //       { 'data': 'RegNo' },
                        //    { 'data': 'FirstName' },
                        //    { 'data': 'LastName' },
                        //    { 'data': 'Standard' },
                        //    { 'data': 'Section' },
                        //    { 'data': 'RollNumber' },
                        //    { 'data': 'DOB' },
                        //    { 'data': 'Gender' },
                        //    { 'data': 'AcademicYear' },
                        //    ]
                        //});

                        var checkedRows = [];
                        table = $("#studentSearchTable").DataTable({
                            data: data.d,
                            columns: [
                           { 'data': '' },
                           { 'data': 'RegNo' },
                           { 'data': 'FirstName' },
                           { 'data': 'LastName' },
                           { 'data': 'Standard' },
                           { 'data': 'Section' },
                           { 'data': 'RollNumber' },
                           { 'data': 'DOB' },
                           { 'data': 'Gender' },
                           { 'data': 'AcademicYear' },
                            ],

                            'columnDefs': [{
                                'targets': 0,
                                'searchable': false,
                                'orderable': false,
                                'className': 'dt-body-center',
                                'render': function (data, type, full, meta) {
                                    return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
                                }
                            }],
                            'order': [[1, 'asc']]
                        });

                        $('#example-select-all').on('click', function () {
                            // Get all rows with search applied
                            var rows = table.rows({ 'search': 'applied' }).nodes();
                            // Check/uncheck checkboxes for all rows in the table
                            $('input[type="checkbox"]', rows).prop('checked', this.checked);
                        });

                        $('#studentSearchTable tbody').on('change', 'input[type="checkbox"]', function (e) {


                            //var checkedRows = table.$(".call-checkbox:checked", { "page": "all" });
                            //console.log(checkedRows[0].val());
                            //checkedRows.each(function (index, elem) {
                            //    var checkbox_value = $(elem).val();
                            //    console.log(checkbox_value);
                            //    console.log(checkedRows);
                            //});

                            // If checkbox is not checked
                            if (!this.checked) {
                                var el = $('#example-select-all').get(0);

                                // If "Select all" control is checked and has 'indeterminate' property
                                if (el && el.checked && ('indeterminate' in el)) {
                                    // Set visual state of "Select all" control 
                                    // as 'indeterminate'
                                    el.indeterminate = true;
                                }
                            }
                        });

                    },
                    error: function (err) {
                        alert(err.statusCode);
                    }
                });




            });


            $('#section').change(function () {

                $("#promoteSuccess").html("");
                $('#studentSearchTable tbody').html('');
                $("#studentSearchTable").dataTable().fnDestroy();

                var searchStudentParams = {};

                if ($("#standard option:selected").val() == "" || $("#academicYear option:selected").val() == "" || $("#section option:selected").val() == "") {
                    searchStudentParams.standardID = null;
                    searchStudentParams.sectionID = null;
                    searchStudentParams.academicYear = null;
                } else {
                    searchStudentParams.standardID = $("#standard option:selected").text();
                    searchStudentParams.academicYear = $("#academicYear option:selected").val();
                    searchStudentParams.sectionID = $("#section option:selected").val();
                }

                searchStudentParams.schoolID = $.cookie("SchoolID");

                $.ajax({
                    url: 'ContentManagement.asmx/SearchStudent',
                    method: 'post',
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'json',
                    data: '{searchStudentParams:' + JSON.stringify(searchStudentParams) + '}',
                    success: function (data) {
                        
                        table = $("#studentSearchTable").DataTable({
                            data: data.d,
                            columns: [
                           { 'data': '' },
                           { 'data': 'RegNo' },
                           { 'data': 'FirstName' },
                           { 'data': 'LastName' },
                           { 'data': 'Standard' },
                           { 'data': 'Section' },
                           { 'data': 'RollNumber' },
                           { 'data': 'DOB' },
                           { 'data': 'Gender' },
                           { 'data': 'AcademicYear' },
                            ],

                            'columnDefs': [{
                                'targets': 0,
                                'searchable': false,
                                'orderable': false,
                                'className': 'dt-body-center',
                                'render': function (data, type, full, meta) {
                                    return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
                                }
                            }],
                            'order': [[1, 'asc']]
                        });

                        $('#example-select-all').on('click', function () {
                            // Get all rows with search applied
                            var rows = table.rows({ 'search': 'applied' }).nodes();
                            // Check/uncheck checkboxes for all rows in the table
                            $('input[type="checkbox"]', rows).prop('checked', this.checked);
                        });

                        $('#studentSearchTable tbody').on('change', 'input[type="checkbox"]', function (e) {


                            //var checkedRows = table.$(".call-checkbox:checked", { "page": "all" });
                            //console.log(checkedRows[0].val());
                            //checkedRows.each(function (index, elem) {
                            //    var checkbox_value = $(elem).val();
                            //    console.log(checkbox_value);
                            //    console.log(checkedRows);
                            //});

                            // If checkbox is not checked
                            if (!this.checked) {
                                var el = $('#example-select-all').get(0);

                                // If "Select all" control is checked and has 'indeterminate' property
                                if (el && el.checked && ('indeterminate' in el)) {
                                    // Set visual state of "Select all" control 
                                    // as 'indeterminate'
                                    el.indeterminate = true;
                                }
                            }
                        });

                    },
                    error: function (err) {
                        alert(err.statusCode);
                    }
                });


            });

            $("#classPromotion").click(function () {

                $("input:checked").each(function (index) {

                    var $row = this.closest('tr');
                    var data = table.row($row).data();
                    if (data != undefined )
                        regNoArray.push(data["RegNo"]);

                    // Get row ID

                });

                console.log(regNoArray);

                if (regNoArray.length == 0) {
                    $("#promoteSuccess").html("No Registration Number selected!");
                } else {

                    var jsonRegNoArray = JSON.stringify(regNoArray);
                    var classPromotionParams = {};
                    classPromotionParams.SchoolID = $.cookie("SchoolID");
                    classPromotionParams.StandardId = $("#standard option:selected").val();
                    classPromotionParams.SectionID = $("#section option:selected").val();
                    classPromotionParams.AcademicYearId = $("#academicYear option:selected").val();
                    classPromotionParams.regNoArray = regNoArray;

                    $.ajax({
                        url: 'ContentManagement.asmx/GetClassPromotion',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        data: '{classPromotionEntity:' + JSON.stringify(classPromotionParams) + '}',
                        dataType: 'json',
                        success: function (data) {

                            $('#promoteSuccess').html("Promotion SuccessFully");
                            regNoArray = [];
                        },
                        error: function (err) {
                            alert(err.status);
                        }
                    });
                }
            });

        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="libraryPageBody" runat="server">
    <div id="queryResultContainer">
        <h5 style="margin: 0 auto; width: 20%"><b>Class Promotion</b></h5>
        <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 15px;" />
        <label style="margin-bottom: 10px;">1: Please enter following details for Class Promotion: </label>
        <br />


        <label>Batch:</label>
        <select id="academicYear" class="form-control" style="display: inline-block;margin-bottom:15px;">
        </select>

        <label>Standard:</label>

        <select id="standard" class="form-control" style="display: inline-block;margin-bottom:15px;">
        </select>

        <label>Section:</label>

        <select id="section" class="form-control" style="display: inline-block;margin-bottom:15px;">
        </select>
   


                <div class="table-responsive" style="margin-left: 15px; margin-top: 50px;">
            <table class="table table-bordered table-striped table-hover" id="studentSearchTable" style="border:1px solid rgb(223,224,228);">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" name="select_all" value="1" id="example-select-all" />

                        </th>
                        <th>RegNo</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Standard</th>
                        <th>Section</th>
                        <th>RollNumber</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>AcademicYear</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
        <div id="uploadSectionDiv" style="width: 100px; margin: 0 auto;margin-top:10px;">
            <button id="classPromotion" type="button" class="btn btn-primary btn-sm">Promote</button>
        </div>
        <div id="promoteSuccess" style="font-weight:bold;color:green;text-align:center;">
       
        </div>

    </div>
</asp:Content>
