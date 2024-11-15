<?php
if (!isset($_SESSION))
    session_start();

require_once __DIR__ . "/connection.php";

$connection = (new DataBase)->getPDO();


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $resultset = json_decode(file_get_contents('php://input'));
    $result = $resultset->result;
    $player_points = $resultset->playerPoints;

    if (!isset($result) || !isset($player_points)) {
        echo json_encode(array("error" => "Dati della partita non presenti"));
        die();
    }
    if ($result !== 'W' && $result !== 'L' && $result !== 'D') {
        echo json_encode(array("error" => "Risultato non valido"));
        die();
    }

    $query = "INSERT INTO game (playerid, player_points, result) VALUES (:playerid, :player_points, :result)";

    $statement = $connection->prepare($query);
    $statement->bindParam(':playerid', $_SESSION['player']);
    $statement->bindParam(':player_points', $player_points);
    $statement->bindParam(':result', $result);
    $statement->execute();

    echo json_encode(array("success" => "Partita salvata"));
}

?>