<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ImportExcelDataIntoDB.aspx.cs" Inherits="SchoolContentManagement.ImportExcelDataIntoDB" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Import Excel Data into DB</title>
    <script src="js/jquery-1.11.3.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>

    <script type="text/javascript">

        $(document).ready(function () {


            $("#uploadStudentDetails").click(function(e){
                var files = $('#excelData')[0].files;
                if (files.length > 0) {
                    var formData = new FormData();
                    for (var i = 0; i < files.length; i++) {
                        formData.append(files[i].name, files[i]);
                    }
                }

                $.ajax({
                    url: 'UploadExcelDataHandler.ashx',
                    method: 'post',
                    data: formData,
                    contentType: false,
                    processData: false,
                    success: function () {
                        $("#uploadSuccessStudent").html("Uploaded Successfully!");
                    },
                    error: function (err) {
                        alert(err.statusCode);
                    }
                });
                e.preventDefault();
            });
        });
            

    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <label>Select StudentDetails Excel Sheet:</label>
    <asp:FileUpload runat="server" id="excelData"/><br />
    <button type="button" id="uploadStudentDetails">Upload StudentDetails</button>
     <label id="uploadSuccessStudent"></label>
    </div>
    </form>
</body>
</html>
