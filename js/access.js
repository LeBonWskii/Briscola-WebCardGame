


// Event Listeners per mostrare la sezione login
document.addEventListener("DOMContentLoaded", function(event) { 
document.getElementById("login_header").addEventListener("click", ()=> {
    showHidden("login_container","registration_container");
    document.getElementById("login_header").style.color="#62FF00";
    document.getElementById("registration_header").style.color="#F4FFED";
    document.getElementById("login_header").style.backgroundColor="#0062FF";
    document.getElementById("registration_header").style.backgroundColor="#B3D1FF";

});

//Event Listener per mostrare la sezione registrazione
document.getElementById("registration_header").addEventListener("click", ()=> {
    showHidden("registration_container","login_container");
    document.getElementById("login_header").style.color="#F4FFED";
    document.getElementById("registration_header").style.color="#62FF00";
    document.getElementById("login_header").style.backgroundColor="#B3D1FF";
    document.getElementById("registration_header").style.backgroundColor="#0062FF";

});

//Event Listener per generare una password complessa
document.getElementById("cmplx_pswd_btn").addEventListener("click",  ()=> {
    generateComplexPassword();
    checkPassword(true);
    checkPasswordMatch();
   
});

//Event Listener per mostrare la password nel modulo di login
document.getElementById("password_eye_login").addEventListener("click", ()=> {
    showPassword(document.getElementById("password_login"), document.getElementById("password_eye_login"));
});
//Event Listener per mostrare la password nel modulo di registrazione
document.getElementById("password_eye_registration_first").addEventListener("click", ()=> {
    showPassword(document.getElementById("password_registration"), document.getElementById("password_eye_registration_first"));
});
//Event Listener per mostrare la password di conferma nel modulo di registrazione
document.getElementById("password_eye_registration_second").addEventListener("click", ()=> {
    showPassword(document.getElementById("password_registration_confirm"), document.getElementById("password_eye_registration_second"));
});

//Event Listener per la validazione di pswd e username
document.getElementById("password_registration").addEventListener("keyup", () => {
    checkPassword(false);
});
document.getElementById("password_registration_confirm").addEventListener("keyup", checkPasswordMatch);

document.getElementById("username_registration").addEventListener("keyup", checkUsername);

//Event listerner per la richiesta di login e registrazione
document.getElementById("login_form").addEventListener("submit", (event) => {submitRequest(event, "login")});
document.getElementById("registration_form").addEventListener("submit", (event) => {submitRequest(event, "registration")});

//Event listener per chiudere il popup di accesso
document.getElementById("close_popup_btn").addEventListener("click", () => {
    resetInput("username_message", "username_registration");
    resetInput("password_message", "password_registration");
    resetInput("password_confirm_message", "password_registration_confirm");
    document.getElementById("popup_message").classList.add("hidden");
    document.getElementById("registration_form").classList.remove("hidden");
    document.getElementById("registration_form").reset();
    document.getElementById("login_form").classList.remove("hidden");
    document.getElementById("authentication_header_container").classList.remove("hidden");
    document.getElementById("login_form").reset();
    resetInput("password_message", "password_registration");
    resetInput("password_confirm_message", "password_registration_confirm");

});


});




/*SEZIONE FUNZIONI*/
// FUNZIONI DI UTILITA'
function correctInput(message, input) {
    document.getElementById(message).classList.remove("wrong_message");
    document.getElementById(message).classList.add("correct_message");
    document.getElementById(input).classList.remove("wrong_input");
}
function wrongInput(message, input) {   
    document.getElementById(message).classList.remove("correct_message");
    document.getElementById(message).classList.add("wrong_message");
    document.getElementById(input).classList.add("wrong_input");
}
function resetInput(message, input) {
    document.getElementById(message).innerText = "";
    document.getElementById(message).classList.remove("correct_message");
    document.getElementById(message).classList.remove("wrong_message");
    document.getElementById(input).classList.remove("wrong_input");
}

function showHidden(show, hide) {
    document.getElementById(show).classList.remove ("hidden");
    document.getElementById(hide).classList.add  ("hidden");
}

/*FUNZIONE PER LA GESTIONE DELL'AUTENTICAZIONE*/
function submitRequest(event, action) {
    event.preventDefault();

    
    let form = event.currentTarget;
    let data = new FormData(form);
    data.append("action", action);
    fetch('./php/action.php', {
        method: "POST",
        body: data
    })
    .then(resultset => resultset.json())
    .then(json => {
        if (json["error"] === undefined) {
            if (action === "login") {
                location.reload();
            }
            else {
                document.getElementById("registration_form").classList.add("hidden");
                document.getElementById("popup_message").classList.remove("hidden");
                document.getElementById("close_popup_btn").classList.add("hidden");
                document.getElementById("authentication_header_container").classList.add("hidden");

                document.getElementById("response_message").innerText = "Registrazione avvenuta con successo!\nVerrai reindirizzato al login";
                document.getElementById("response_message").classList.add("correct_message");
                setTimeout(function() {
                    document.getElementById("registration_form").reset();
                    document.getElementById("response_message").classList.remove("correct_message");
                    document.getElementById("response_message").innerText = "";
                    document.getElementById("close_popup_btn").classList.remove("hidden");
                    document.getElementById("authentication_header_container").classList.remove("hidden");
                    document.getElementById("popup_message").classList.add("hidden");
                    document.getElementById("registration_form").classList.remove("hidden");
                    resetInput("password_message", "password_registration");
                    resetInput("password_confirm_message", "password_registration_confirm");
                    resetInput("username_message", "username_registration");
                    
                    showHidden("login_container","registration_container");
                    document.getElementById("login_header").style.color="#62FF00";
                    document.getElementById("registration_header").style.color="#F4FFED";
                    document.getElementById("login_header").style.backgroundColor="#0062FF";
                    document.getElementById("registration_header").style.backgroundColor="#B3D1FF";
                }, 2000);
            }
        }
        else {
                document.getElementById("authentication_header_container").classList.add("hidden");
                document.getElementById("registration_form").classList.add("hidden");
                document.getElementById("login_form").classList.add("hidden");
                document.getElementById("popup_message").classList.remove("hidden");
                document.getElementById("response_message").innerText = "⛔ Errore:\n" + "\n"+json["error"];
                document.getElementById("response_message").classList.add("wrong_message");

        }
    });
    
}



function generateComplexPassword  () {
let passwordLength = 16; // lunghezza password
let passwordResult = ""; //password finale
let passwordCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+|}{[];?,.="; //charset con cui generare la password
let passwordFields = document.getElementsByClassName("password_fill") // campi password del form da riempire
// fare in modo che contenga almeno un numero, una lettera maiuscola e un carattere speciale
let numberCharacters = "0123456789";
passwordResult += numberCharacters.charAt(Math.floor(Math.random() * numberCharacters.length));
let uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
passwordResult += uppercaseCharacters.charAt(Math.floor(Math.random() * uppercaseCharacters.length));
let specialCharacters = "!@#$%^&*()_+|}{[];?,.=";
passwordResult += specialCharacters.charAt(Math.floor(Math.random() * specialCharacters.length));
let lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";
passwordResult += lowercaseCharacters.charAt(Math.floor(Math.random() * lowercaseCharacters.length));


for (let i=0; i<passwordLength; i++) {
    passwordResult += passwordCharacters.charAt(Math.floor(Math.random() * passwordCharacters.length));
}//a ogni iterazione aggiungo un carattere alla password preso casulaemente dal charset

//inverto casualmente l'ordine dei caratteri della password in modo che non parta sempre con un numero, una lettera maiuscola e un carattere speciale
passwordResult = passwordResult.split('');
for (let i = passwordResult.length - 1; i > 0; i--) { //si parte dell'ultimo elemento dell'array
    let j = Math.floor(Math.random() * (i + 1)); //si sceglie un elemento casuale tra quelli precedenti
    [passwordResult[i], passwordResult[j]] = [passwordResult[j], passwordResult[i]];//si scambiano i due elementi
}
passwordResult = passwordResult.join('');

for (let i=0; i<passwordFields.length; i++) {
    passwordFields[i].value = passwordResult;
} //riempio i campi password del form con la password generata

}


function showPassword (passwordInput, passwordEye) {
    //se la password è nascosta la mostro cambiando tipo dell'input e cambio l'icona dell'occhio e viceversa
    passwordInput.type === "password" ? (passwordInput.type = "text", passwordEye.src = "./images/password/eye_password_hide.svg") : (passwordInput.type = "password", passwordEye.src = "./images/password/eye_password_show.svg");
}


function checkPassword(call_with_cmplx) {
    if (!call_with_cmplx) {
    if(document.getElementById("password_registration_confirm").value !== "") {
        document.getElementById("password_registration_confirm").value = "";
        resetInput("password_confirm_message", "password_registration_confirm");
    }
    }
    let password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+|}{\[\];?,.=])[A-Za-z\d!@#$%^&*()_+|}{\[\];?,.=]{8,20}$/;      
    if (!password_regex.test(document.getElementById("password_registration").value)) {
        document.getElementById("password_message").innerText="La password deve contenere 8-20 caratteri tra cui una lettera maiuscola, una minuscola, un numero e un carattere speciale";
        wrongInput("password_message", "password_registration");

       }
       else{
        document.getElementById("password_message").innerText="La password è valida";
        correctInput("password_message", "password_registration");
       }

    if(document.getElementById("password_registration").value ===""){
        resetInput("password_message", "password_registration");

    }

}

function checkPasswordMatch() {
    if(document.getElementById("password_registration_confirm").value!==""){
    if(document.getElementById("password_registration").value !== document.getElementById("password_registration_confirm").value) {
        document.getElementById("password_confirm_message").innerText="Le password non coincidono";
        wrongInput("password_confirm_message", "password_registration_confirm");
    }
    else{
        document.getElementById("password_confirm_message").innerText="Le password coincidono";
        correctInput("password_confirm_message", "password_registration_confirm");
    }
}
else
    resetInput("password_confirm_message", "password_registration_confirm");


}

function checkUsername (){

    let username_regex = /^[a-zA-Z0-9_]{5,30}$/;
    if(document.getElementById("username_registration").value ==="")
        resetInput("username_message", "username_registration");
    else {
    if(!username_regex.test(document.getElementById("username_registration").value)){
        document.getElementById("username_message").innerText="Lo username deve contenere 5-30 caratteri, solo lettere, numeri e _";
        wrongInput("username_message", "username_registration");
    }
    else
    {
        document.getElementById("username_message").innerText="Lo username è valido";
        correctInput("username_message", "username_registration");
    }
   
}
}


