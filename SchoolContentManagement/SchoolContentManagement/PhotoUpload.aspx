<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PhotoUpload.aspx.cs" Inherits="SchoolContentManagement.PhotoUpload" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
           <asp:Label runat="server">SchoolID:</asp:Label> <asp:TextBox ID="schoolID" runat="server"></asp:TextBox><br />
           <asp:Label runat="server">StudentID:</asp:Label><asp:TextBox ID="studentID" runat="server"></asp:TextBox><br />
           <asp:Label runat="server">Photo:</asp:Label><asp:FileUpload ID="FileUpload1" runat="server" /><br />
            <asp:Button runat="server" Text="Upload" OnClick="Upload"/>
           <asp:Label runat="server" ID="msg"></asp:Label>
    </div>
    </form>
</body>
</html>
