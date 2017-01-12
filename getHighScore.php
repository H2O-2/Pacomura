<?php

require_once('../../mysqli_connect.php');

$query = "SELECT username, score, playTime FROM scoreInfo ORDER BY score DESC";

$response = @mysqli_query($dbc, $query);

if ($response) {
    /*
    while ($array = mysqli_fetch_array($response)) {
        echo json_encode($array);
    }
    */
    $arr = array();

    while ($row = mysqli_fetch_row($response)) {
        array_push($arr, $row);
    }
    echo json_encode($arr);
} else {
    echo "RESPONSE ERROR";
}