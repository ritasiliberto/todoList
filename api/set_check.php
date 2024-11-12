<?php
    include 'conn.php';
    
    $id = (int)$_POST['id'];
    $done = (int)$_POST['done'];

    $sql = "UPDATE tasks
        SET done = $done
        WHERE id = $id";

    $result = mysqli_query($connection, $sql);

    if($result){
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }

    mysqli_close($connection);
?>