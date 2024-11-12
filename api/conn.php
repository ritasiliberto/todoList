<?php
    $connection = mysqli_connect('localhost', 'root', '', 'todolist');
    mysqli_set_charset($connection, "utf8");
    if (!$connection) {
        die("Connection failed: ". mysqli_connect_error());
    }
?>