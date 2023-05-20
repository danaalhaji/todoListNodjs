const readline = require('readline');

function Task(description, dueDate, priority) {
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.completed = false;
}

const todoList = [];

function addTask(description, dueDate, priority) {
  const newTask = new Task(description, dueDate, priority);
  todoList.push(newTask);
  console.log('Task added successfully!');
}

function markTaskCompleted(index) {
  if (index >= 0 && index < todoList.length) {
    todoList[index].completed = true;
    console.log('Task marked as completed!');
  } else {
    console.log('Invalid task index!');
  }
}

function deleteTask(index) {
  if (index >= 0 && index < todoList.length) {
    todoList.splice(index, 1);
    console.log('Task deleted successfully!');
  } else {
    console.log('Invalid task index!');
  }
}

function filterTasksByStatus(status) {
  const filteredTasks = todoList.filter(task => task.completed === status);
  console.log('Filtered tasks:');
  displayTasks(filteredTasks);
}

function sortTasksBy(property) {
  const sortedTasks = [...todoList];
  sortedTasks.sort((task1, task2) => (task1[property] > task2[property] ? 1 : -1));
  console.log('Sorted tasks:');
  displayTasks(sortedTasks);
}

function displayTasks(tasks) {
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.description} (Due: ${task.dueDate}, Priority: ${task.priority}, Completed: ${task.completed})`);
  });
}

function printActions() {
  console.log('==== TO-DO LIST MANAGER ====');
  console.log('Available actions:');
  console.log('1. Add a new task');
  console.log('2. Mark a task as completed');
  console.log('3. Delete a task');
  console.log('4. Filter tasks by status (completed/incomplete)');
  console.log('5. Sort tasks by due date');
  console.log('6. Sort tasks by priority');
  console.log('0. Exit the application');
}

function handleUserInput(input) {
  switch (input) {
    case '0':
      console.log('Exiting the application...');
      rl.close();
      break;
    case '1':
      rl.question('Enter task description: ', description => {
        rl.question('Enter due date: ', dueDate => {
          rl.question('Enter priority level: ', priority => {
            addTask(description, dueDate, priority);
            printActions();
          });
        });
      });
      break;
    case '2':
      rl.question('Enter task index to mark as completed: ', index => {
        markTaskCompleted(Number(index) - 1);
        printActions();
      });
      break;
    case '3':
      rl.question('Enter task index to delete: ', index => {
        deleteTask(Number(index) - 1);
        printActions();
      });
      break;
    case '4':
        rl.question('Filter tasks by status (completed/incomplete): ', status => {
            const isCompleted = status.toLowerCase() === 'completed';
            filterTasksByStatus(isCompleted);
            printActions();
          });
          break;
        case '5':
          sortTasksBy('dueDate');
          printActions();
          break;
        case '6':
          sortTasksBy('priority');
          printActions();
          break;
        default:
          console.log('Invalid action. Please try again.');
          printActions();
          break;
      }
    }
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    printActions();
    
    rl.on('line', input => {
      handleUserInput(input.trim());
    });
    

