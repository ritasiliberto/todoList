window.addEventListener('DOMContentLoaded', () => {

    const list = document.querySelector('.list');
    const addBTN = document.querySelector("#addBTN");

    addBTN.addEventListener("click", showAddTask);    


    getTasks();

    function checkData(data) {
        if (data.task == '' || data.description == '') {
            console.log('error');
            showError('Missing data');
        }
        else {
            addTask(data);
        }
    }

    async function showList(data) {
        list.innerHTML = ``; 
    
        data.forEach(task => {

            let row = `
                <tr>
                    <td class="task${task.id} ${task.done === '1' ? 'done' : ''}">${task.task}</td>
                    <td class="description${task.id}  ${task.done === '1' ? 'done' : ''}">${task.description}</td>
                    <td class="check${task.id}">
                        <input type="checkbox" id="check${task.id}" class="task-checkbox" ${ task.done === '1' ? 'checked' : '' } value="${task.done}">
                    </td>
                    <td class="edit${task.id}">
                        <button type="button" class="editBTN" id="editBtn${task.id}" data-id="${task.id}"> 
                            <img src='http://localhost/todoList/js/edit-tool-pencil.svg' id="img-edit"> 
                        </button>
                    </td>
                    <td class="delete${task.id}">
                        <button type="button" class="deleteBTN" data-id="${task.id}" id="deleteBtn${task.id}"> 
                            <img src='http://localhost/todoList/js/x-delete.png' id="img-delete"> 
                        </button>
                    </td>
                </tr>
            `;
            
            list.innerHTML += row;            

            // document.getElementById(`editBtn${task.id}`).addEventListener('click', showEditedTask);
            // document.getElementById(`deleteBtn${task.id}`).addEventListener('click', showDeletedTask);
        });

        addCheckboxListeners();
        addListeners();
    }

    async function getTasks() {
        const tasks = await getTaskApi();
        
        showList(tasks);
    }

    async function getTaskApi() {
        try {
            const response = await fetch('http://localhost/todoList/api/get_tasks_list.php');

            data = await response.json();

            return data;
        } catch (error) {
            console.log('Errore');
        }
    }


// CHECK-BTN 
    function addCheckboxListeners() {
        const checkboxes = document.querySelectorAll('.task-checkbox');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const taskId = e.target.id.replace('check', '');

                const taskElement = document.querySelector(`.task${taskId}`).innerHTML;
                const descriptionElement = document.querySelector(`.description${taskId}`).innerHTML;

                if (e.target.checked) {
                    showSuccess('You have completed the task!');
                    taskElement.className = 'done';
                    descriptionElement.className = 'done';
                    setCheck(taskId, 1);
                } else {
                    taskElement.className = '';
                    descriptionElement.className = '';
                    setCheck(taskId, 0);
                }
            });
        });
    }
    
    async function setCheck(taskId, doneValue) {
        const form = new FormData();
        form.append('id', taskId);
        form.append('done', doneValue);

        const data = await setCheckApi(form);
        
        if(data === true) {
            console.log('True');
        }
        else {
            console.log('error');
        }

        list.innerHTML = ``;
        getTasks();
    }

    async function setCheckApi(data) {
        try {
            const url = 'http://localhost/todoList/api/set_check.php';
            const response = await fetch(url, {
                method: 'POST',
                body: data
            });
            
            const result = await response.json();
            console.log("Server response:", result);
            return result;
        } catch (error) {
            console.log("Errore nel fetch:", error); 
            return false; 
        }     
    }


    // EDIT-BTN
    async function showEditedTask(e) {

        const id = this.getAttribute('data-id');
        const task = document.querySelector(`.task${id}`).innerHTML;
        const description = document.querySelector(`.description${id}`).innerHTML;

        const { value: data } = await Swal.fire({
            title: `Update task '${task}'?`,
            html: `
            <form class="updateTaskForm">
                <p>
                    <label for="task">Task: </label>
                    <input type="text" name="task" class="task" value="${task}" />
                </p>
                <p>
                    <label for="description">Description: </label>
                    <input type="text" name="description" class="description" value="${description}" />
                </p>
            </form>
            `,
            preConfirm: () => {
                const task = document.querySelector('.task').value;
                const description = document.querySelector('.description').value;
                const data = {
                    id: id,
                    task: task,
                    description: description
                }
                return data;
            },
            showCancelButton: true
        });
        

        checkUpdatedData(data);
    }

    function checkUpdatedData(data) {
        if (data.task == '' || data.description == '') {
            console.log('error');
            showError('Missing data');
        }
        else {
            updateTask(data);
        }
    }
    
    async function updateTask(taskData) {
        const form = new FormData();
        form.append('id', taskData.id)
        form.append('task', taskData.task);
        form.append('description', taskData.description);

        try {
            const data = await updateTaskApi(form);

            if (data === true) {
                showSuccess('Task updated');
            }
            else {
                showError('Something went wrong');
            }
    
            list.innerHTML = ``;
            getTasks();
        } catch (error) {
            console.error(error);
        }
    }

    async function updateTaskApi(data) {
        try {
            const url = 'http://localhost/todoList/api/edit.php';
            const respose = await fetch(url, {
                method: 'POST',
                body: data
            });

            return await respose.json();
        } catch (error) {
            console.log(error);
        }
    }


    // ADD-BTN
    async function showAddTask() {

        const { value: data } = await Swal.fire({
            title: 'Add New Task',
            html: `
            <form class="addTaskForm">
                <p>
                    <label for="task">Task title: </label>
                    <input type="text" name="task" class="task">
                </p>
                <p>
                    <label for="description">Description: </label>
                    <input type="text" name="description" class="description">
                </p>
            </form>
            `,
            preConfirm: () => {
                const task = document.querySelector('.task').value;
                const description = document.querySelector('.description').value;
                
                const data = {
                    task: task,
                    description: description
                }
                return data;
            },
            showCancelButton: true
        });

        if (data) {
            checkData(data);
        }
    }

    async function addTask(taskData) {

        const form = new FormData();
        form.append('task', taskData.task);
        form.append('description', taskData.description);

        const data = await addTaskApi(form);

        if(data === true) {
            console.log('Task added');
        }
        else {
            console.log('error');
        }

        list.innerHTML = ``;
        getTasks();
    }

    async function addTaskApi(data) {
        try {
            const url = 'http://localhost/todoList/api/set_task.php';
            const response = await fetch(url, {
                method: 'POST',
                body: data
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.log(error);
            return [];
        }
    }


    // DELETE-BTN
    async function showDeletedTask(e) {

        const id = e.currentTarget.getAttribute('data-id');

        const { value: data } = await Swal.fire({
            title: `Are you sure? <br> Task n.${id} will be deleted`,
            html: `
            <form class="deleteUserForm">
            </form>
            `,
            preConfirm: () => {
                const data = {
                    id: id
                }
                return data;
            },
            showCancelButton: true
        });

        if (data) {
            deleteTask(data);
        }
    }

    async function deleteTask(taskData) {
        const form = new FormData();
        form.append('id', taskData.id);

        const data = await deleteTaskApi(form);

        console.log(data);
        
        if (data === true) {
            showSuccess('Task deleted');
            getTasks();
        }
        else {            
            showError('Somethin went wrong');
        }

    }

    async function deleteTaskApi(data) {
        try {
            const url = 'http://localhost/todoList/api/delete_task.php';
            const response = await fetch(url, {
                method: 'POST',
                body: data
            });
            
            const result = await response.json();
            console.log("Server response:", result);
            return result;
        } catch (error) {
            console.log("Errore nel fetch:", error); 
            return false; 
        }
    }

    
    function addListeners() {
        const editBTN = document.querySelectorAll('.editBTN');
        editBTN.forEach(button => {
            button.addEventListener('click', showEditedTask);
        });

        const deleteBTN = document.querySelectorAll('.deleteBTN');
        deleteBTN.forEach(button => {
            button.addEventListener('click', showDeletedTask);
        });
    }

    function showError(msg) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "error",
            title: msg
        });
    }
    
    function showSuccess(msg) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: msg
        });
    }
});