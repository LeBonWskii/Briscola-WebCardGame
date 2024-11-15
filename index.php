<?php
if (!isset($_SESSION))
  session_start();
if (isset($_SESSION['player']))
  $logged = true;
else
  $logged = false;
?>

<!DOCTYPE html>
<html lang="it">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Briscola</title>
  <link rel="stylesheet" href="./css/index.css">
  <?php
  if ($logged): ?>
    <link rel="stylesheet" href="./css/homepage.css">
    <link rel="stylesheet" href="./css/game.css">
  <?php else: ?>
    <link rel="stylesheet" href="./css/access_page.css">
  <?php endif; ?>

</head>

<body>

  <?php

  if ($logged)
    require("./php/homepage.php");
  else
    require("./php/access_page.php");


  ?>

  <div id="div_audio">
    <button id="audiobutton">
      <img id=audioicon src="./images/audio/audio_mute.svg" alt="">
    </button>
    <input type="range" class="setvolume hidden" id="setvolume" min="0" max="1" step="0.01" value="0.3">
    <audio loop id="soundtrack">
      <source src="./audio/soundtrack.mp3" type="audio/mpeg">
    </audio>

  </div>

  <div class="more_info" id="more_info">
    <a href="./documentazione.html">
      <img src="./images/info/info.svg" alt="">
    </a>
  </div>

  <script src="./js/music.js"></script>

</body>

</html>