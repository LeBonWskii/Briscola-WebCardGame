<?php
if(!isset($_SESSION))
    session_start();

require_once __DIR__ . "/authentication.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    switch ($_POST["action"]) {
        case "login":
            login($_POST["username"], $_POST["password"]);
            break;
        case "registration":
            registration($_POST["username"], $_POST["password"], $_POST["confirm_password"]);
            break;
        case "logout":
            logout();
            break;
        case "usernameAvailable":
            usernameAvailable($_POST["username"]);
            break;
        default:
            echo json_encode(array("error" => "Azione non supportata"));
            die();
    }
} else {
    echo json_encode(array("error" => "Metodo non supportato"));
    die();
}

?>