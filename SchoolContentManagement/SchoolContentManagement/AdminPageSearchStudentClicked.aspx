<%@ Page Title="" Language="C#" MasterPageFile="~/AdminPageAfterLogin.Master" AutoEventWireup="true" CodeBehind="AdminPageSearchStudentClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm26" %>

<asp:Content ID="Content1" ContentPlaceHolderID="libraryPageHead" runat="server">
    <script type="text/javascript">

        $(document).ready(function () {

            var table;
            var regNoArray = [];

            $.ajax({
                url: "ContentManagement.asmx/GetStandardDetails",
                method: 'post',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    $.each(data.d, function (key, value) {
                        $('#standard').append($('<option></option>').val(value.Id).html(value.Standard));
                    });
                }
            });


            $.ajax({
                url: "ContentManagement.asmx/GetAcademicYear",
                method: 'post',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    $.each(data.d, function (key, value) {
                        $('#academicYear').append($('<option></option>').val(value.Id).html(value.AcademicYear));
                    });
                }
            });

            $.ajax({
                url: "ContentManagement.asmx/GetSectionDetails",
                method: 'post',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (data) {
                    $.each(data.d, function (key, value) {
                        $('#section').append($('<option></option>').val(value.Id).html(value.Section));
                    });
                }
            });


            $('#standard').change(function () {

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
                           { 'data': 'RegNo' },
                           { 'data': 'FirstName' },
                           { 'data': 'LastName' },
                           { 'data': 'Standard' },
                           { 'data': 'Section' },
                           { 'data': 'RollNumber' },
                           { 'data': 'DOB' },
                           { 'data': 'Gender' },
                           { 'data': 'AcademicYear' },
                           {
                               'data': 'CompleteDetails',
                               'mRender': function (data, type, full) {
                                   return '<button type="button" class="btn btn-xs staffButtons viewButton" id=' + full["RegNo"] + '>View</button>';
                               }
                           },
                           {
                               'data': 'EditDetails',
                               'mRender': function (data, type, full) {
                                   return '<button type="button" class="btn btn-xs staffButtons editButton" id=' + full["RegNo"] + '>Edit</button>';
                               }
                           },
                            ],
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

                        var checkedRows = [];

                        table = $("#studentSearchTable").DataTable({
                            data: data.d,
                            columns: [
                           { 'data': 'RegNo' },
                           { 'data': 'FirstName' },
                           { 'data': 'LastName' },
                           { 'data': 'Standard' },
                           { 'data': 'Section' },
                           { 'data': 'RollNumber' },
                           { 'data': 'DOB' },
                           { 'data': 'Gender' },
                           { 'data': 'AcademicYear' },
                           {
                               'data': 'CompleteDetails',
                               'mRender': function (data, type, full) {
                                   return '<button type="button" class="btn btn-xs staffButtons viewButton" id=' + full["RegNo"] + '>View</button>';
                               }
                           },
                           {
                               'data': 'EditDetails',
                               'mRender': function (data, type, full) {
                                   return '<button type="button" class="btn btn-xs staffButtons editButton" id=' + full["RegNo"] + '>Edit</button>';
                               }
                           },
                            ],
                            'order': [[1, 'asc']]
                        });
                    },
                    error: function (err) {
                        alert(err.statusCode);
                    }
                });



            });

            $(document).delegate(".viewButton","click",function () {

                var regNo = $(this).attr('id');
                var url = "StudentCompleteDetails?regNo=" + encodeURIComponent(regNo);
                window.location.href = url;
            });

            $(document).delegate(".editButton", "click", function () {
                var regNo = $(this).attr('id');
                var url = "EditStudentDetails?regNo=" + encodeURIComponent(regNo);
                window.location.href = url;
            });

      });

    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="libraryPageBody" runat="server">
    <div id="queryResultContainer">
        <h5 style="margin: 0 auto; width: 20%"><b>Search Student</b></h5>
        <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 10px;">
        <label style="margin-bottom: 10px;">1.) To search for students, please enter following details: </label>
        <br />
        <div class="table-responsive" style="margin-left: 15px;">
            <table class="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <td>
                            <label>Academic Year:</label></td>
                        <td>
                            <select id="academicYear" class="form-control" style="display: inline-block;">
                                <option value="">Select AcademicYear</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Standard:</label></td>
                        <td>
                            <select id="standard" class="form-control" style="display: inline-block;">
                                <option value="">Select Standard</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Section:</label></td>
                        <td>
                            <select id="section" class="form-control" style="display: inline-block;">
                                <option value="">Select Section</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <%--<div id="uploadBookDiv" style="width: 100px; margin: 0 auto;">
            <button id="deleteBook" type="button" class="btn btn-primary btn-sm">Delete Book</button>
        </div>
        <div style="width: 150px; margin: 0 auto;">
            <label id="deleteSuccess" style="margin: 0 auto;"></label>
        </div>--%>

        <div class="table-responsive" style="margin-left: 15px; margin-top: 50px;">
            <table class="table table-bordered table-striped table-hover" id="studentSearchTable" style="border: 1px solid rgb(223,224,228);">
                <thead>
                    <tr>
                        <th>RegNo</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Standard</th>
                        <th>Section</th>
                        <th>RollNumber</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>AcademicYear</th>
                        <th>CompleteDetails</th>
                        <th>EditDetails</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>


    </div>

</asp:Content>

