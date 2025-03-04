﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LibraryManagementSystemHome.aspx.cs" Inherits="SchoolContentManagement.LibraryManagementSystemHome" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>Library Management System</title>

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
    <link href="css/stylesForStudentPageUnclickedButtons.css" rel="stylesheet" />
    <link href="css/jquery-ui.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css" />
    <script src="js/jquery-ui.min.js"></script>
   
    <%--<!-- <link href="css/stylesAfterLogin.css" rel="stylesheet" /> --> --%>

    <script type="text/javascript">
        $(document).ready(function () {

            //$("img").attr("src", "data:Image/png;base64," + sessionStorage.getItem('studentPhoto' + $.cookie('StudentID')));

            if ($(window).width() > 900) {
                $("#navbar").css("display", "none");
                $("#buttonMenu").css("display", "inline-block");
            } else {
                $("#buttonMenu").css("display", "none");
                $("#navbar").css("display", "block");
            }
           
            $('.newBook').click(function () {
                $.ajax({
                    success: function () {
                        window.location.href = 'LibraryNewBook';
                    }
                });
            });

            $('.parentDetails').click(function () {
                $.ajax({
                    success: function () {
                        window.location.href = 'Parent';
                    }
                });
            });

            $('.feesDetails').click(function () {
                $.ajax({
                    success: function () {
                        window.location.href = 'Fees';
                    }
                });
            });

            $('.resultDetails').click(function () {
                $.ajax({
                    success: function () {
                        window.location.href = 'Result';
                    }
                });
            });

            $('.schoolEvents').click(function () {
                $.ajax({
                    success: function () {
                        window.location.href = 'Events';
                    }
                });
            });


            $('.transportDetails').click(function () {
                $.ajax({
                    success: function () {
                        window.location.href = 'Transport';
                    }
                });
            });


            $('.libraryBooks').click(function () {
                $.ajax({
                    success: function () {
                        window.location.href = 'Library';
                    }
                });
            });

            $('.addressDetails').click(function () {
                $.ajax({
                    success: function () {
                        window.location.href = 'Address';
                    }
                });
            });

            $('.contactDetails').click(function () {
                $.ajax({
                    success: function () {
                        window.location.href = 'Contact';
                    }
                });
            });

            $('.logout').click(function () {
                $.cookie('SchoolID', null);
                $.removeCookie('SchoolID');
                sessionStorage.removeItem("studentPhoto");
                $.ajax({
                    success: function () {
                        window.location.href = 'SchoolLogin';
                    }
                });
            });


        });
    </script>


</head>
<body>
    <form id="form1" runat="server">
        <div class="container-fluid">
            <div class="row" style="padding-top: 15px; margin-bottom: 15px;">
                <div class="col-lg-offset-1 col-lg-10" id="libraryHeader">
                    <button class="btn btn-primary" style="border-radius: 50%; position:absolute;right:18px;top:28px"><span class="glyphicon glyphicon-off" style="color: white; font-size: 20px;"></span></button>
                    <span style="position: absolute; right: 20px; top: 69px; font-size: 10px;"><a class="logout"><b>LOGOUT</b></a></span>

                    <%--<asp:ContentPlaceHolder ID="welcomeLine" runat="server"><h2 style="padding: 0px; margin: 0px;">Welcome to Student page!</h2></asp:ContentPlaceHolder>
                        <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 5px;">--%>
                    <div id="whiteBox">
                        
                            <h2 style="padding: 0px; margin: 0px;">Library Management System</h2>
                     
                       
                    </div>
                    <%--  <asp:ContentPlaceHolder ID="welcomeLine" runat="server"><h2 style="padding: 0px; margin: 0px;">Welcome to Student page!</h2></asp:ContentPlaceHolder>
                        <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 5px;">
                       
                        <div id="detailsWhiteBox">
                            <asp:ContentPlaceHolder ID="basicData" runat="server">
                                <label class="dataLabels">FirstName:</label><asp:Label runat="server" ID="fName"></asp:Label>
                                <label class="dataLabels">LastName:</label><asp:Label runat="server" ID="lName"></asp:Label>
                                <label class="dataLabels">RollNo:</label><asp:Label runat="server" ID="rollNo"></asp:Label><br />
                                <label class="dataLabels">Standard:</label><asp:Label runat="server" ID="standard"></asp:Label>


                            </asp:ContentPlaceHolder>
                        </div>--%>
                </div>
            </div>


        
        <div class="row">
            <div class="col-lg-offset-1 col-lg-10" id="libraryBody" style="padding: 20px;">

                <nav class="navbar navbar-default" id="navbar" style="display: none;">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <button type="button" id="navbar-button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar" style="background-color: transparent !important;">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>

                        </div>
                        <div class="collapse navbar-collapse" id="myNavbar">
                            <ul class="nav navbar-nav">
                                <li class="active"><a class="newBook">Enter New Book</a></li>
                                <li><a class="deleteBook">Delete Book</a></li>
                                <li><a class="issueBook">Issue Book</a></li>
                                <li><a class="searchBook">Search Book</a></li>
                               
                            </ul>

                        </div>
                    </div>
                </nav>
                <div id="buttonMenu">
                    <div class="buttonContainer">
                        <button class="btn btn-primary btn-block newBook">Enter New Book</button>
                    </div>
                    <div class="buttonContainer">
                        <button class="btn btn-primary btn-block deleteBook">Delete Book</button>
                    </div>
                    <div class="buttonContainer">
                        <button class="btn btn-primary btn-block issueBook">Issue Book</button>
                    </div>
                    <div class="buttonContainer">
                        <button class="btn btn-primary btn-block searchBook">Search Book</button>
                    </div>
                    
                </div>
                <asp:
            </div>

        </div>
        <%-- <asp:ContentPlaceHolder ID="studentPageBody" runat="server">
                <div class="row">
                    <div class="col-lg-offset-1 col-lg-10" id="body">

                        <div class="buttonContainer">
                            <button class="btn btn-primary">Attendance Status</button>
                        </div>
                        <div class="buttonContainer">
                            <button class="btn btn-primary">Parent Details</button>
                        </div>
                    </div>
                    <div id="Div1" runat="server" style="display: none; height: 20px; border: 1px solid black"></div>
                    <button id="second">second</button>
                    <div id="Div2" runat="server" style="display: none; height: 20px; border: 1px solid black"></div>
                </div>

            </asp:ContentPlaceHolder>--%>
        </div>
    </form>
</body>
</html>
