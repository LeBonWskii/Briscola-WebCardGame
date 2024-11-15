<div class="game_container hidden" id="game_container">

    
    <div class="bot_board_container" id="bot_board_container">
        <div class="bot_cards" id="bot-cards">
            <div class="bot_card" id="first_bot_card"></div>
            <div class="bot_card" id="second_bot_card"></div>
            <div class="bot_card" id="third_bot_card"></div>
            <div class="bot_taken_cards" id="bot_taken_cards"></div>
        </div>
        <div class="played_card_bot" id="played_card_bot"></div>
    </div>
    
    <div class="center_board_container" id="center_board_container">
        <span class="remaining_cards_number" id="remaining_cards_number"></span>
        <div class="remaining_deck" id="remaining_deck"></div>
        <div class="briscola_card" id="briscola_card"></div>
    </div>

    
    <div class="player_board_container" id="player_board_container">
        <div class="played_card_player" id="played_card_player"></div>

        <div class="player_cards" id="player-cards">
            <div class="player_card" id="first_player_card"></div>
            <div class="player_card" id="second_player_card"></div>
            <div class="player_card" id="third_player_card"></div>
            <div class="player_taken_cards" id="player_taken_cards"></div>
        </div>
    </div>
</div>


<span class="back_to_home_container hidden" id="back_to_home_container">
    <img src="./images/Home/BackToHome.svg" alt="" class="back_to_home_img" id="back_to_home_img">
</span>



<div class="endgame_container hidden" id="endgame_container">
    <div class="endgame_result_container" id="endgame_result_container">
        <div class="bot_cards_review" id="bot_cards_review"></div>
        <div class="endgame_message_container" id="endgame_message_container"></div>
        <div class="player_cards_review" id="player_cards_review"></div>
    </div>
    <div class="endgame_btn_container" id="endgame_btn_container">
        <button type="button" class="new_game_btn" id="new_game_btn">Nuova Partita</button>
        <button type="button" class="endgame_back_to_home_btn" id="endgame_back_to_home_btn">Torna alla
            Home</button>
    </div>
</div>


<script src="./js/player.js"></script>
<script src="./js/deck.js"></script>
<script src="./js/game.js"></script>