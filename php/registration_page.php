<div class="registration_container hidden" id="registration_container">
    <div class="authentication_container">
        <form class="registration_form" id="registration_form">
            <input type="text" name="username" placeholder="Username" required id="username_registration">
            <span id="username_message"></span>
            <span class="password_span">
                <input type="password" name="password" placeholder="Password" required class="password_fill"
                    id="password_registration">
                <span><img src="./images/password/eye_password_show.svg" alt=""
                        id="password_eye_registration_first"></span>
            </span>
            <span id="password_message"></span>
            <span class="password_span">
                <input type="password" name="confirm_password" placeholder="Conferma Password" required
                    class="password_fill" id="password_registration_confirm">
                <span><img src="./images/password/eye_password_show.svg" alt=""
                        id="password_eye_registration_second"></span>
            </span>
            <span id="password_confirm_message"></span>
            <div class="registration_btn_container" id="registration_btn_container">
                <button type="button" class="cmplx_pswd_btn" id="cmplx_pswd_btn">SUGGERISCI PASSWORD</button>
                <button type="submit" id="registration_submit_btn">CONFERMA</button>
            </div>
        </form>

    </div>
</div>