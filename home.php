<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To Do List</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="header">
        ToDo List
    </div>

    <div class="add">
        <button id="addBTN">Add new tasks</button>
    </div>

    <div class="table-container">
        <table class="table">
            <thead>
                <tr id="intestazione">
                    <th id="task">TASK</th>
                    <th id="description">DESCRIPTION</th>
                    <th id="done">DONE</th>
                    <th id="edit">EDIT</th>
                    <th id="delete">DELETE</th>
                </tr>
            </thead>
            <tbody class="list">
                
            </tbody>
        </table>
    </div>

    <script src="./js/main.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>
</html>