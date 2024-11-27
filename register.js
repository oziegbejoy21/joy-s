
    document.getElementById('registration-form').addEventListener("submit",registerUser);
    
    function registerUser(event){
        event.preventDefault();
        var firstname =
        document.getElementById("firstname").value;
        var lastname =
        document.getElementById("lastname").value;
        var email =
        document.getElementById("email").value;
        var password =
        document.getElementById("password").value;
        var confirmpassword =
        document.getElementById("confirmpassword").value;

        if (password !==confirmpassword){
            alert("passwords do not match");
            return;
        }
        
        
    }
