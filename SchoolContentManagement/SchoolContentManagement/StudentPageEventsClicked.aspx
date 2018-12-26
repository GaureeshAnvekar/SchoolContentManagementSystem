<%@ Page Title="" Language="C#" MasterPageFile="~/pageTemplateAfterLogin.Master" AutoEventWireup="true" CodeBehind="StudentPageEventsClicked.aspx.cs" Inherits="SchoolContentManagement.WebForm7" %>

<asp:Content ID="Content1" ContentPlaceHolderID="studentPageHead" runat="server">
    <script type="text/javascript">
        $(document).ready(function () {

            var eventDetailsParams = {};
            eventDetailsParams.schoolID = $.cookie("SchoolID");

            $.ajax({
                url: 'ContentManagement.asmx/GetEventDetails',
                method: 'post',
                contentType: 'application/json;charset=utf-8',
                data: '{eventDetailsParams:' + JSON.stringify(eventDetailsParams) + '}',
                success: function (data) {
                    if (data.d != null) {
                        if(data.d.eventsArray.length > 0 ) {

                            data.d.eventsArray.forEach(function (event) {
                                $("tbody").append('<tr><td><label>' + event.eventName + ':</label></td><td>' + event.eventDate + '</td></tr>');
                            });
                            } else { 
                            $("#emptyTableError").html("No events on schedule!");
                        }
                    }
                },
                error: function (err) {
                    alert("wrong");
                }
            });
        });

    </script>
</asp:Content>


<asp:Content ID="Content4" ContentPlaceHolderID="studentPageBody" runat="server">
    
             <div id="queryResultContainer">
                <h5 style="margin: 0 auto;width:20%"><b>School Events</b></h5>
                <hr style="height: 1px; background-color: black; color: black; margin-top: 5px; margin-bottom: 5px;">
                 <label id="emptyTableError"></label>
                 <div class="table-responsive">
                     <table class="table table-bordered table-striped">
                         <tbody>

                         </tbody>
                     </table>
                 </div>
            </div>
           
   
</asp:Content>
