<?php
    include 'conn.php';

    if (!isset($_POST['id']) || !isset($_POST['task']) || !isset($_POST['description'])) {
        echo json_encode(['error' => 'Missing data']);
        return;
    }

    $id = (int)$_POST['id'];
    $task = $_POST['task'];
    $description = $_POST['description'];

    $sql = "UPDATE tasks
            SET task = '$task', description = '$description'
            WHERE id = $id;";

    $result = mysqli_query($connection, $sql);

    if($result){
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }

    mysqli_close($connection);
?>