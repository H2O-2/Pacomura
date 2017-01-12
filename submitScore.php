<?php
if (isset($_POST['username'])) {

    $inputName = trim($_POST['username']);
    $inputName = strip_tags($inputName);
    $inputName = html_entity_decode($inputName);
    $inputName = urldecode($inputName);
    $inputName = preg_replace('/[;`()[]\/?><\'|"~@#$!%^&*+=…•]/', ' ', $inputName);
    $inputName = trim($inputName);
    $inputName = preg_replace('/ +/', ' ', $inputName);

    if (empty($inputName)) {
        echo "EMPTY";
    } else {
        require_once('../../mysqli_connect.php');

        $inputName = mysqli_real_escape_string($dbc, $inputName);
        $score = mysqli_real_escape_string($dbc, $_POST['score']);

        $query = "INSERT INTO scoreInfo (username, score, playTime) VALUES (?,?,CURRENT_DATE)";

        $stmt = mysqli_prepare($dbc, $query);

        mysqli_stmt_bind_param($stmt, 'si', $inputName, $score);

        mysqli_stmt_execute($stmt);

        $affected_rows = mysqli_stmt_affected_rows($stmt);

        if ($affected_rows == 1) {
            mysqli_stmt_close($stmt);

            mysqli_close($dbc);
        } else {
            echo "Error for affected rows\n";
            echo mysqli_error($dbc);
        }

        echo "SUCCESS";
    }
}

