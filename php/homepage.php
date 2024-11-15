<?php
if (!isset($_SESSION))
    session_start();
$player = $_SESSION['player'];
?>
<div class="homepage_container" id="homepage_container">
    <div class="homepage_background_container">
        <img src="./images/background/homepage_background.svg" alt="">
    </div>



    <div class="homepage_header_container" id="homepage_header_container">
        <span>Benvenuto
            <?php echo $player ?>
        </span>
        <div class="logout_btn_container hidden" id="logout_btn_container">
            <button type="button" class="logout_btn" id="logout_btn">
                <img src="./images/logout/logout.svg" alt=""> LOGOUT
            </button>
        </div>
    </div>


    <div class="homepage_main_container" id="homepage_main_container">
            <div class="homepage_btn_container" id="homepage_btn_container">
                <button type="button" class="play_btn" id="play_btn">GIOCA</button>
                <button type="button" class="choose_deck_btn" id="choose_deck_btn">Scegli il mazzo</button>
            </div>
            <section class="stats_section" id="stats_section">
                <h2>Statistiche Giocatori</h2>
                <div class="table_stats_container" id="table_stats_container">
                    <label for="order_stats">Ordina la classifica per:</label>
                    <select  id="order_stats">
                        <option value="wins">Numero di vittorie</option>
                        <option value="win_ratio">Win Ratio</option>
                        <option value="points">Numero di punti</option>
                        <option value="point_ratio">Point Ratio</option>
                        <option value="games">Partite Giocate</option>
                        <option value="loses">Numero di sconfitte</option>
                        <option value="draws">Numero di pareggi</option>
                    </select>
                    <table class="stats_table" id="stats_table">
                        <thead>
                            <tr>
                                <th>Posizione</th>
                                <th>Giocatore</th>
                                <th>Partite</th>
                                <th>Vittorie</th>
                                <th>Pareggi</th>
                                <th>Sconfitte</th>
                                <th>Punti</th>
                                <th>Win Ratio</th>
                                <th>Point Ratio</th>
                            </tr>
                        </thead>
                        <tbody class="tbody_stats_container" id="tbody_stats_container"></tbody>
                    </table>
                </div>
            </section>
        <div class="choose_deck_container hidden" id="choose_deck_container">

            <div class="deck_info_container" id="deck_info_container">
                <h1>Scegli il tuo mazzo preferito: </h1>
            </div>
            <div class="show_card_container" id="show_card_container">
                <span class="left_arrow_span" id="left_arrow_span">
                    <img src="./images/arrows/Left_Arrow.svg" alt="" class="change_deck_left" id="change_deck_left">
                </span>
                <span class="choose_deck_span" id="choose_deck_span"></span>
                <span class="right_arrow_span" id="right_arrow_span">
                    <img src="./images/arrows/Right_Arrow.svg" alt="" class="change_deck_right" id="change_deck_right">
                </span>
            </div>
            <div class="show_card_btn_container" id="show_card_btn_container">
                <button type="button" class="back_to_homepage" id="back_to_homepage">Torna indietro</button>
                <button type="button" class="confirm_choise_btn" id="confirm_choise_btn">GIOCA CON QUESTO MAZZO</button>
            </div>
        </div>

    </div>

    <script src="./js/homepage.js"></script>
    <?php
    require("./php/game.php")
        ?>
</div>