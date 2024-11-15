<?php
if (!isset($_SESSION))
    session_start();

require_once __DIR__ . "/connection.php";

$connection = (new DataBase)->getPDO();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $order = $_GET['order'] ?? 'wins';



    $order_by = match ($order) {
        'wins' => 'tw.wins DESC, (tw.wins/COUNT(*)) DESC, tp.points DESC, (tp.points/COUNT(*)) DESC',
        'win_ratio' => '(tw.wins/COUNT(*)) DESC, tw.wins DESC ,tp.points DESC, (tp.points/COUNT(*)) DESC',
        'points' => 'tp.points DESC, (tp.points/COUNT(*)) DESC, tw.wins DESC, (tw.wins/COUNT(*)) DESC',
        'point_ratio' => '(tp.points/COUNT(*)) DESC, tp.points DESC, tw.wins DESC, (tw.wins/COUNT(*)) DESC',
        'games' => 'COUNT(*) DESC, tw.wins DESC, (tw.wins/COUNT(*)) DESC, tp.points DESC, (tp.points/COUNT(*)) DESC',
        'loses' => 'tl.loses ASC, (tl.loses/COUNT(*)) ASC, tp.points DESC, (tp.points/COUNT(*)) DESC',
        'draws' => 'td.draws ASC, (td.draws/COUNT(*)) ASC, tp.points DESC, (tp.points/COUNT(*)) DESC',
        default => 'tw.wins DESC, (tw.wins/COUNT(*)) DESC, tp.points DESC, (tp.points/COUNT(*)) DESC'
    };



    $query = "
        WITH totalwins AS 
        (SELECT g1.playerid, COUNT(*) as wins 
        FROM game g1
        WHERE g1.result = 'W'
        GROUP BY g1.playerid),

        totalloses AS
        (SELECT g2.playerid, COUNT(*) as loses
        FROM game g2
        WHERE g2.result = 'L'
        GROUP BY g2.playerid),

        totaldraws AS
        (SELECT g3.playerid, COUNT(*) as draws
        FROM game g3
        WHERE g3.result = 'D'
        GROUP BY g3.playerid),

        totalpoints AS
        (SELECT g4.playerid, SUM(g4.player_points) as points
        FROM game g4
        GROUP BY g4.playerid)

        SELECT g.playerid as username,COUNT(*) as totalgames ,tw.wins as wins, tl.loses as loses, td.draws as draws, tp.points as points
        FROM game g
        LEFT JOIN totalwins tw ON g.playerid = tw.playerid
        LEFT JOIN totalloses tl ON g.playerid = tl.playerid
        LEFT JOIN totaldraws td ON g.playerid = td.playerid
        LEFT JOIN totalpoints tp ON g.playerid = tp.playerid
        GROUP BY g.playerid
        ORDER BY $order_by";

    $statement = $connection->prepare($query);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
}

?>