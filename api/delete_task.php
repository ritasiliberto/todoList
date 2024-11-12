
<?php
    include 'conn.php';

    $id = (int)$_POST['id'];

    $sql = "DELETE from tasks
        WHERE id = $id";

    $result = mysqli_query($connection, $sql);

    if($result){
        echo json_encode(true);
    }
    else {
        echo json_encode(false);
    }

    mysqli_close($connection);
?>