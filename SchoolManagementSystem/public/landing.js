$(document).ready(function(){
    $("#getFile").change(function() {
        if ($(this)[0].files.length > 0) {
            $("#logoSelected").css("display", "block");
            $("#logoErr").css("display", "none");
            let imgObj = $("#getFile").prop("files")[0];
     
            let read = new FileReader();
            read.readAsDataURL(imgObj);
            read.onloadend = function() {
                window.localStorage.setItem("logo", read.result);
            };

        } else {
            $("#logoSelected").css("display", "none");
            window.localStorage.removeItem("logo");
        }

    
    })

    $("#schoolName").focusout(function() {
        if ($(this).val()) {
            let schoolName = $(this).val();
            window.localStorage.setItem("schoolName", schoolName);  
            $("#schoolNameErr").css("display", "none");  
        } 
        
    });

    $("#schoolUrl").focusout(function() {
        if ($(this).val()) {
            $("#schoolUrlErr").css("display", "none");

            //Only alphanumeric allowed for url
            if (!$(this).val().match(/^[0-9a-z]+$/i)) {
                $("#schoolUrlErr2").css("display", "inline");
                return;
            } else {
                $("#schoolUrlErr2").css("display", "none");
            }

            //Also check if this Url is unique and not present in DB for other school
            let url = "./api/schools/checkUrl?" + "url=" + $(this).val(); 
            fetch(url, {method: "GET"}).then((res) => {
                if (res.status == 400) {
                    $("#schoolUrlErr3").css("display", "inline");
                } else if (res.status == 200) {
                    $("#schoolUrlErr3").css("display", "none");
                }
            });
        }
    });

    $("#adminName").focusout(function() {
        if ($(this).val()) $("#adminNameErr").css("display", "none");
    });

    $("#adminPassword1").focusout(function() {
        if ($(this).val()) $("#adminPassword1Err").css("display", "none");
    });

    $("#adminPassword2").focusout(function() {
        if ($(this).val()) $("#adminPassword2Err").css("display", "none");
    });

    $("#address").focusout(function() {
        if ($(this).val()) $("#addressErr").css("display", "none");
    });

    $("#contact").focusout(function() {
        if ($(this).val()) $("#contactErr").css("display", "none");
    });

    $("#subscriptionPlan").focusout(function() {
        if ($(this).val()) $("#planErr").css("display", "none");
    });

    $("#subscriptionPlan").change(function() {
        window.planId = $(this).val();
        
    })

    $("#adminPassword2").focusout(function() {
        if ($("#adminPassword1").val() !== $(this).val()) {
            $("#mismatchErr").css("display", "inline");
            window.mismatch = true;
        } else {
            $("#mismatchErr").css("display", "none");
            window.mismatch = false;
        }
    });

    $("#adminPassword1").focusout(function() {
        if ($("#adminPassword2").val() !== $(this).val()) {
            $("#mismatchErr").css("display", "inline");
            window.mismatch = true;
        } else {
            $("#mismatchErr").css("display", "none");
            window.mismatch = false;
        }
    });

    window.clearAllErrs = function() {
        $("#mismatchErr").css("display", "none");
        $("#schoolNameErr").css("display", "none");
        $("#schoolUrlErr").css("display", "none");
        $("#adminNameErr").css("display", "none");
        $("#adminPassword1Err").css("display", "none");
        $("#adminPassword2Err").css("display", "none");
        $("#addressErr").css("display", "none");
        $("#contactErr").css("display", "none");
        $("#logoErr").css("display", "none");
        $("#planErr").css("display", "none");
    }

    window.checkAllFieldsEntered = function() {
        let allEntered = true;
        
        if (window.mismatch) {
            allEntered = false;
            $("#mismatchErr").css("display", "inline");
        }
        if (!$("#schoolName").val()) {
            allEntered = false;
            //display label
            $("#schoolNameErr").css("display", "inline");
        }
        if (!$("#schoolUrl").val()) {
            allEntered = false;
            $("#schoolUrlErr").css("display", "inline");
        } 
        if (!$("#adminName").val()) {
            allEntered = false;
            $("#adminNameErr").css("display", "inline");
        }
        if (!$("#adminPassword1").val()) {
            allEntered = false;
            $("#adminPassword1Err").css("display", "inline");
        }
        if (!$("#adminPassword2").val()) {
            allEntered = false;
            $("#adminPassword2Err").css("display", "inline");
        }
        if (!$("#address").val()) {
            allEntered = false;
            $("#addressErr").css("display", "inline");
        }
        if (!$("#contact").val()) {
            allEntered = false;
            $("#contactErr").css("display", "inline");
        }
        if ($("#getFile").get(0).files.length == 0) {
            allEntered = false;
            $("#logoErr").css("display", "inline");
        }
        if (!$("#subscriptionPlan").val()) {
            allEntered = false;
            $("#planErr").css("display", "inline");
        }

        return allEntered;
    }
  });

