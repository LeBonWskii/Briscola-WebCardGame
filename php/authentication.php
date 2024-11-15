<?php

require_once __DIR__ . "/connection.php";

$connection = (new DataBase)->getPDO();

function usernameAvailable($username) 
{
    global $connection;
    $query = "
        SELECT username
        FROM player 
        WHERE username = :username";
    $statement = $connection->prepare($query);
    $statement->bindParam(":username", $username);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);
    if ($result)
        return false;
    else
        return true;  
    


}

function login($username, $password)
{

    if (!isset($username) || !isset($password)) {
        echo json_encode(array("error" => "Dati non inseriti"));
        die();
    }

    global $connection;
    $query = "
        SELECT p.password as password
        FROM player p
        WHERE username = :username";
    $statement = $connection->prepare($query);
    $statement->bindParam(":username", $username);
    $statement->execute();
    $result = $statement->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        $hashedPassword = $result['password'];
        if (password_verify($password, $hashedPassword)) {
            $_SESSION["player"] = $username;
            echo json_encode(array("success" => "Login effettuato"));
            die();
        } else {
            echo json_encode(array("error" => "Password errata"));
            die();
        }
    } else {
        echo json_encode(array("error" => "Utente non trovato"));
        die();
    }
}


function registration($username, $password, $confirm_password)
{


    if (!isset($username) || !isset($password) || !isset($confirm_password)) {
        echo json_encode(array("error" => "Dati non inseriti"));
        die();
    }
    global $connection;

    if ($password != $confirm_password) {
        echo json_encode(array("error" => "Le password non coincidono"));
        die();
    }

    $password_regex = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+|}{\[\];?,.=])[A-Za-z\d!@#$%^&*()_+|}{\[\];?,.=]{8,20}$/';
    if (!preg_match($password_regex, $password)) {
        echo json_encode(array("error" => "Password non valida"));
        die();
    }

    $username_regex = '/^[a-zA-Z0-9_]{5,30}$/';
    if (!preg_match($username_regex, $username)) {
        echo json_encode(array("error" => "Username non valido"));
        die();
    }
    if (!usernameAvailable($username)) {
        echo json_encode(array("error" => "Username già utilizzato"));
        die();
    }

    $passwordHashed = password_hash($password, PASSWORD_BCRYPT);

    $query = "
            INSERT INTO player (username, password)
            VALUES (:username, :password)";
    $statement = $connection->prepare($query);
    $statement->bindParam(":username", $username);
    $statement->bindParam(":password", $passwordHashed);
    $result = $statement->execute();
    if (!$result) {
        echo json_encode(array("error" => "Registrazione fallita"));
        die();
    }
    echo json_encode(array("success" => "Registrazione effettuata"));
}


function logout()
{
    session_unset();
    session_destroy();
    echo json_encode(array("success" => true));
}
?>