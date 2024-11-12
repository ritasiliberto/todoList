<?php
    include 'conn.php';

    $sql = "SELECT * FROM tasks;";

    $result = mysqli_query($connection, $sql);

    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);

    do {
        $data[] = $row;
    } while($row = mysqli_fetch_array($result, MYSQLI_ASSOC));

    echo json_encode($data);
?>