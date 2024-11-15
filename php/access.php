<div class="main_authentication_container" id="main_authentication_container">
    <div class="authentication_header_container" id="authentication_header_container">
        <span class="login_header" id="login_header" style="color:#62FF00;background-color: #0062FF;">ACCEDI</span>
        <span class="registration_header" id="registration_header" style="color:#F4FFED; background-color:#B3D1FF;">REGISTRATI</span>
    </div>
    <div class="form_container" id="form_container">
        <?php
        require("./php/login_page.php");
        require("./php/registration_page.php");
        ?>
    </div>
    <div class="hidden popup_message" id="popup_message">
        <span class="response_message" id="response_message"></span>
        <button type="button" class="close_popup_btn" id="close_popup_btn">CHIUDI</button>
    </div>
</div>
<script src="./js/access.js"></script>