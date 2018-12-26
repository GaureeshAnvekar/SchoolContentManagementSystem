<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SchoolInformationToUpdate.aspx.cs" Inherits="SchoolContentManagement.SchoolInformationToUpdate" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    
    <%-- Style 
    <link href="css/bootstrap-theme.css" rel="stylesheet" />
    <link href="css/bootstrap-theme.min.css" rel="stylesheet" />
    <link href="css/bootstrap.css" rel="stylesheet" />
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <%-- End -

    <%-- Script     <script src="js/bootstrap.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/npm.js"></script>
    <script src="js/jquery-1.11.3.js"></script>
    <script src="js/jquery.cookie.js"></script>
    <script src="js/jquery.validate.min.js"></script>
    <%-- End --%>

     <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet nofollow" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css?parameter=1">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <link href="css/styles.css" rel="stylesheet" />

    
    <script src="js/bootstrap.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/npm.js"></script>
        
    <script src="js/jquery-1.11.3.js"></script>
    <script src="js/jquery.cookie.js"></script>
    <script src="js/jquery.validate.min.js"></script>
    <link href="css/stylesAfterLogin.css" rel="stylesheet" />
    

    <%-- <style>
        h2 {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: white;
            text-align: center;
            margin-top: 100px;
        }

        #lblSelect, #lblInfo {
            color: firebrick;
        }
    </style> --%>
<%-- 
    <!--
    <script type="text/javascript">
        $(document).ready(function () {
            $('#lblStatus').hide();
            $('#ddlSelect').change(function () {
                var selectedId = $(this).val();
                $('#lblStatus').val('');
                $('#lblStatus').css('display', 'none');
                var sectionValue = {};
                sectionValue.SchoolId = $.cookie('SchoolID');
                sectionValue.SectionId = selectedId;
                if (selectedId != 0) {
                    $.ajax({
                        url: 'ContentManagement.asmx/GetSelectedSectionValue',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        data: '{schoolSectionIDEntity:' + JSON.stringify(sectionValue) + '}',
                        success: function (data) {
                            if (data.d != null) {
                                $('#txtinfo').val(data.d.SectionValue);
                            }
                            else {
                                $('#txtinfo').val('');
                            }
                        },
                        error: function (err) {                            
                            alert(err.status);
                        }
                    });
                }
                else {
                    $('#txtinfo').val('');
                }
            });

            $('#btnSubmit').click(function () {

                var ddlSelectedVal = $('#ddlSelect').val();
                if (ddlSelectedVal > 0) {
                    var sectionToUpdate = {};
                    sectionToUpdate.SectionId = $('#ddlSelect').val();
                    sectionToUpdate.SectionValue = $('#txtinfo').val();
                    sectionToUpdate.SchoolId = $.cookie('SchoolID');

                    $.ajax({
                        url: 'ContentManagement.asmx/InsertUpdateSectionToUpdate',
                        method: 'post',
                        contentType: 'application/json;charset=utf-8',
                        data: '{schoolSectionValuesEntity:' + JSON.stringify(sectionToUpdate) + '}',
                        success: function () {
                            $('#lblStatus').html('Information Updated Successfully.');
                            $('#lblStatus').show();
                            $('#lblStatus').css('color', 'green');
                        },
                        error: function (err) {
                            alert(err.status);
                        }
                    });
                }
                else {
                    var lblStatusDet = $('#lblStatus');
                    lblStatusDet.html('Please select a section to update');
                    lblStatusDet.css('color', 'red');
                    lblStatusDet.show();
                }

            });

            $('#btnReset').click(function () {
                $("#ddlSelect option").prop('selected', false).filter(function () {
                    return $(this).text() == 'Select A Section To Update';
                }).prop('selected', true);

                $('#txtinfo').val('');
                $('#lblStatus').hide();
            });

            $('#btnLogout').click(function () {
                $.cookie('SchoolID', null);
                $.removeCookie('SchoolID');
                window.location.href = 'SchoolLogin';

            });

            function disableBack() { window.history.forward() }
            window.onload = disableBack();
            window.onpageshow = function (evt) { if (evt.persisted) disableBack(); }

        });
    </script>  --> --%>
</head>
<body>
    <form id="form1" runat="server">
      <div class="container-fluid">
            <div class="row" style="padding-top:15px; margin-bottom:15px;">
                <div class="col-lg-offset-2 col-lg-8" id="header">
                    <img src="images/photo.png" />
                    <div id="userBasicDetails">
                    <h2 style="padding:0px;margin:0px;">Welcome to <asp:label runat="server" id="loginPageType" style="font-size:28px;"></asp:label> page!</h2>
                    <hr style="height:1px;background-color:black;color:black;margin-top:5px;margin-bottom:5px;">
                    <div id="detailsWhiteBox">
                        <label>FirstName:</label><asp:label runat="server" id="fName"></asp:label><br />
                        <label>LastName:</label><asp:Label runat="server" id="lName"></asp:Label><br />
                        <label>RollNo:</label><asp:Label runat="server" ID="rollNo"></asp:Label>
                    </div>
                </div>
                </div>
                
             
            </div>
            <div class="row">
                <div class="col-lg-offset-2 col-lg-8" id="body">
                    <button id="first">first</button>
                    <div runat="server" style="display:none;height:20px;border:1px solid black"></div>
                    <button id="second">second</button>
                    <div runat="server" style="display:none;height:20px;border:1px solid black"></div>
            </div>
        </div>
        </div>














<%-- 

       <!--
        <div class="container">
            <div class="row">
                <div>
                    <img src="images/Daikoku_Logo.jpg" class="col-xs-3" style="opacity: 0.7; padding-top: 20px;" />
                    <h2 class="col-xs-12"><b>SCHOOL INFORMATION TO UPDATE</b></h2>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="well">
                        <asp:Label runat="server" ID="lblSelect" Text="Information to update :" Style="text-align: left; font-weight: bold;"></asp:Label>
                        <asp:DropDownList runat="server" class="form-control" ID="ddlSelect" Style="text-align: left;">
                        </asp:DropDownList>
                        <br />

                        <asp:Label runat="server" ID="lblInfo" Text="Provide Information :" Style="text-align: left; font-weight: bold;"></asp:Label>
                        <asp:TextBox runat="server" ID="txtinfo" TextMode="MultiLine" class="col-xs-12" Style="height: 130px;"></asp:TextBox>

                        <div id="lblStatus" runat="server" class="col-xs-12" style="text-align: center; margin-top: 5px; font-weight: bold;"></div>
                        <div style="text-align: center;">
                            <input type="button" id="btnSubmit" class="btn btn-danger btn-md" value="SUBMIT" style="text-align: center; margin-top: 5px" />
                            <input type="button" id="btnReset" class="btn btn-danger btn-md" value="RESET" style="text-align: center; margin-top: 5px" />
                            <input type="button" id="btnLogout" class="btn btn-danger btn-md" value="LOGOUT" style="text-align: center; margin-top: 5px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>--> --%>
    </form>
</body>
</html>
