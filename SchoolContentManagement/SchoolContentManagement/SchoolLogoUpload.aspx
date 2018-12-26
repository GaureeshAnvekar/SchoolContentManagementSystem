<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SchoolLogoUpload.aspx.cs" Inherits="SchoolContentManagement.SchoolLogoUpload" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body style="font-family: Arial">
    <form id="form1" runat="server">
        <div>
            <asp:Label  runat="server">SchoolID:</asp:Label><asp:TextBox ID="SchoolID" runat="server"></asp:TextBox>
            <br />
            <asp:Label ID="lblLogo" runat="server">Logo:</asp:Label><asp:FileUpload ID="FileUpload1" runat="server" />
            <br />
            <asp:Button ID="Button1" runat="server" OnClick="btnUpload_Click" Text="Upload" />
            <br />
            <br />
            <asp:Label ID="lblMessage" runat="server"></asp:Label>
            <br />
            <br />
        </div>
    </form>
</body>
</html>
