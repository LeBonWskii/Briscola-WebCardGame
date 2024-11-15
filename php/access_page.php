<?php
if (!isset($_SESSION))
    session_start();
if (isset($_SESSION['player']))
    $logged = true;
else
    $logged = false;

?>

<div class="main_container" id="main_container">
    <div>
        <h1 class="main_title"><span style="color:#30ff00">Bri</span><span style="color:#ffffff">sc</span><span
                style="color:#ff0000">ola</span></h1>
    </div>



    <div class="main_background_container">
        <div class="background_container" id="backgroun_container">
            <img src="./images/background/background4.svg" alt="">
        </div>
    </div>
    <?php
    require("./php/access.php")
        ?>
</div>