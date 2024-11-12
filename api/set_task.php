<?php
    include 'conn.php';

    if($_POST['task'] == '' || $_POST['description'] == '') {
        echo json_encode(false);
        return;
    }

    $task = $_POST['task'];
    $description = $_POST['description'];

    $sql = "INSERT INTO tasks (`task`, `description`)
            VALUES ('$task', '$description');";

    $result = mysqli_query($connection, $sql);

    if($result) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }

    mysqli_close($connection);
?>