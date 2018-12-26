<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SchoolContentManagementLogin.aspx.cs" Inherits="SchoolContentManagement.SchoolContentManagementLogin" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Control Panel Login</title>

    <meta name="viewport" content="width=device-width, initial-scale=1" />

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


    <link href="css/styles.css" rel="stylesheet" />


    <script type="text/javascript">

        $(document).ready(function()
        {     
            var schoolLogoWithname = {};
            schoolLogoWithname.SchoolID = 1;
            
            $.ajax({
                url: 'ContentManagement.asmx/GetSchoollogoWithName',
                method: 'post',
                contentType: 'application/json;charset=utf-8',
                data: '{schoolLogoInfoEntity:' + JSON.stringify(schoolLogoWithname) + '}',
                success: function (data) {
                    if (data.d != null) {
                        $.cookie('SchoolLogo',data.d.Logo);
                        $.cookie('SchoolName',data.d.SchoolName);
                        if (sessionStorage.getItem('SchoolLogo' + $.cookie('SchoolLogo'))) {
                            SchoolLogo = sessionStorage.getItem('SchoolLogo' + $.cookie('SchoolLogo'));
                        }
                        else {
                            SchoolLogo = data.d.Logo;
                            sessionStorage.setItem('SchoolLogo' + $.cookie('SchoolLogo'), SchoolLogo);
                        }
                        $("img").attr("src", "data:Image/png;base64," + sessionStorage.getItem('SchoolLogo' + $.cookie('SchoolLogo')));
                        $('#schoolname').text($.cookie('SchoolName'));
                          
                    }
                },
                error: function (err) {
                    alert(err.status);
                }
            });
        
            

            $('body').innerHeight("<b>hello</b>");
            $('#form1').validate({
                rules: {
                    <%=txtUserID.UniqueID %>:{
                        required:true
                    },
                    <%=txtPassword.UniqueID %>:{
                        required:true
                    },
                }<%--
                messages:{
         
                    <%=txtUserID.UniqueID %>:{
                        required: "UserID is required."
                    },
                    <%=txtPassword.UniqueID %>:{
                        required:"Password is required."
                    },
                },--%>
            
            });

            $('#btnLogin').click(function(e)
            {
                if( $('#txtUserID').val() == "" ){
                    $('html > head').append($('<style>#txtUserID::-webkit-input-placeholder{ color:red; }</style>'));
                    $('#txtUserID').attr("placeholder","Please enter Username!");
                }

                if( $('#txtPassword').val() == "" ){
                    $('html > head').append($('<style>#txtPassword::-webkit-input-placeholder{ color:red; }</style>'));
                    $('#txtPassword').attr("placeholder","Please enter Password!");
                }

                if( $("input[type='radio']:checked").val() == null ) {
                    $('#uncheckedError').append("Error");
                }


                if($('#form1').valid())
                {
                var loginInformation={};
                <%--loginInformation.AffiliationNumber = $('#txtAffNumber').val(); --%>
                loginInformation.type = $("input[type='radio']:checked").val();
                loginInformation.UserID = $('#txtUserID').val();
                loginInformation.Password = $('#txtPassword').val();
              
                $.ajax({
                    url: 'ContentManagement.asmx/GetLoginEmployeeDetail',
                    method: 'post',
                    contentType: 'application/json;charset=utf-8',
                    data: '{schoolLoginInformationEntity:'+ JSON.stringify(loginInformation) + '}',                    
                    success: function(data){ 
                        if(data.d !=null)
                        {
                            var studentPhoto;
                            var employeePhoto;

                            if(data.d.type == 'student') {

                                $.cookie('SchoolID',data.d.Id);
                                $.cookie('StudentFirstName',data.d.firstName);
                                $.cookie('StudentMiddleName',data.d.middleName);
                                $.cookie('StudentLastName',data.d.lastName);
                                $.cookie('RollNo',data.d.rollNo);
                                $.cookie('StudentStandard',data.d.standard);
                                $.cookie('StudentSection',data.d.section);
                                $.cookie('StudentDOB',data.d.DOB);
                                $.cookie('StudentBloodGroup',data.d.bloodGroup);
                                $.cookie('StudentGender',data.d.gender);
                                $.cookie('Type',data.d.type);
                                $.cookie('StudentID',data.d.studentID);

                              
                                if ( sessionStorage.getItem('studentPhoto'+$.cookie('StudentID')) ) {
                                    studentPhoto = sessionStorage.getItem('studentPhoto'+$.cookie('StudentID'));
                                }
                                else {
                                    studentPhoto = data.d.photoBase64Student;
                                    sessionStorage.setItem('studentPhoto'+$.cookie('StudentID'),studentPhoto);
                                }
                        
                                window.location.href = 'SchoolChangeContent';
                            } else if(data.d.type == 'staff') {
                                $.cookie('SchoolID',data.d.Id);
                                $.cookie('StaffFirstName',data.d.firstName);
                                $.cookie('StaffMiddleName',data.d.middleName);
                                $.cookie('StaffLastName',data.d.lastName);
                                $.cookie('Qualification',data.d.qualification);
                                $.cookie('DateOfJoining',data.d.dateOfJoining);
                                $.cookie('StaffDOB',data.d.DOB);
                                $.cookie('StaffGender',data.d.gender);
                                $.cookie('ClassTeacherOfStd',data.d.classTeacherOfStd);
                                $.cookie('ClassTeacherOfSection',data.d.classTeacherOfSection);
                                $.cookie('EmployeeID',data.d.employeeID);
                                $.cookie('StaffBloodGroup',data.d.bloodGroup);
                               
                                if ( sessionStorage.getItem('EmployeePhoto'+$.cookie('EmployeeID')) ) {
                                    employeePhoto = sessionStorage.getItem('EmployeePhoto'+$.cookie('EmployeeID'));
                                }
                                else {
                                    employeePhoto = data.d.photoBase64Emp;
                                    sessionStorage.setItem('EmployeePhoto'+$.cookie('EmployeeID'),employeePhoto);
                                }

                                window.location.href = 'StaffLogin';
                            } else if (data.d.type == 'librarian') {
                                alert('sfs');
                                $.cookie('SchoolID',data.d.Id);

                                window.location.href = 'LibraryLogin';
                            } else if (data.d.type == 'admin') {
                                $.cookie('SchoolID',data.d.Id);
                                window.location.href = 'AdminLogin';
                            }
                        } 
                        else
                        {
                            alert('Sorry Invalid ID Password !');
                        }
                    },
                    error: function(err){  
                            
                        alert(err.status);
                    }
                });
            }
                
            });
            
            function disableBack(){ window.history.forward()}
            window.onload = disableBack();
            window.onpageshow= function(evt){ if(evt.persisted) disableBack();}
           
           
        });

    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container-fluid">


            <div class="row" style="background-color: /*rgba(54,88,153,1)*/#3b5998; background-image: linear-gradient(#4e69a2, #3b5998 50%); border-bottom: 1px solid #133783; background-attachment: scroll;">
                <div class="col-lg-12" style="padding: 20px;">
                    <img src="alt" id="logo" style="margin: 0 auto; display: block;" />
                    <h1 style="text-align: center; color: white; font-family: Cinzel;" id="schoolname"></h1>
                </div>
            </div>

            <div class="row">
                <div class="col-xs-12  col-sm-12 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6" style="padding-top: 60px;">
                    <div id="detailsBox">
                        <form>
                            <div class="form-group" id="innerDetailsBox">
                                <h2 style="text-align: center;">

                                    <b>WELCOME</b>
                                    <hr style="height: 1px; background-color: black; color: black;">
                                </h2>
                                <div id="userName" style="position: relative;">
                                    <span class="glyphicon glyphicon-user" id="leftUsernameIcon"></span>
                                    <asp:TextBox ID="txtUserID" runat="server" CssClass="form-control" placeholder="Enter Username" Style="margin-bottom: 20px; padding-left: 25px;"></asp:TextBox>
                                    <%-- <input type="text" class="form-control" placeholder="Enter Username" style="margin-bottom: 20px;padding-left:25px;"/> --%>
                                </div>
                                <div id="password" style="position: relative;">
                                    <asp:TextBox ID="txtPassword" TextMode="Password" runat="server" CssClass="form-control" placeholder="Enter Password" Style="margin-bottom: 20px; padding-left: 25px;"></asp:TextBox>
                                    <%-- <input type="password" class="form-control" placeholder="Enter Password" style="margin-bottom:30px;padding-left:25px;" /> --%>
                                    <span class="glyphicon glyphicon-lock" id="leftPasswordIcon"></span>
                                </div>
                            </div>
                        </form>
                        <div id="loginPeople">
                            <label class="radio-inline">
                                <input id="type" type="radio" name="optradio" value="student" /><b>STUDENT</b></label>
                            <label class="radio-inline">
                                <input id="Radio1" type="radio" name="optradio" value="parent" /><b>PARENT</b></label>
                            <label class="radio-inline">
                                <input id="Radio2" type="radio" name="optradio" value="staff" /><b>STAFF</b></label>
                            <label class="radio-inline">
                                <input id="Radio3" type="radio" name="optradio" value="librarian" /><b>LIBRARY</b>
                            </label>
                            <label class="radio-inline">
                                <input id="Radio4" type="radio" name="optradio" value="admin" /><b>ADMIN</b>
                            </label>
                        </div>
                       <%-- <div id="adminRadioDiv" style="">
                            <label class="radio-inline">
                                <input type="radio" id="adminRadio" value="admin" /><b>ADMIN</b>
                            </label>
                        </div>--%>
                        <div>
                            <label id="uncheckedError"></label>
                        </div>
                        <div style="width: 100px; margin: 0 auto;">
                            <button type="button" id="btnLogin" class="btn btn-primary btn-lg" style="width: 100px; background-color: rgba(46,109,164,0.8); border-style: none; margin-bottom: 10PX;"><b>LOGIN</b></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </form>
</body>
</html>
