import './App.css';
import Header from './components/Header';
import {useState, useEffect} from 'react'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import axios from 'axios'

function App() {
  const [tasks, setTasks] = useState([])

  const [showAddTask, setShowAddTask] = useState(false)

  const baseUrl = "http://localhost:5000/tasks"

  const fetchTasks = async () => {
    const{data} = await axios.get(baseUrl)
    setTasks(data)
  }
  useEffect(() => {
    fetchTasks()
  }, [])

  //Delete Task
  const deleteTask = (deleteTaskId) => {
    setTasks(tasks.filter((task)=> task.id !== deleteTaskId))
  }

  //Add Task
  const addTask = (newTask) => {
    const id = Math.floor(Math.random() *100) +1
    const addNewTask = {id, ...newTask}
    setTasks([...tasks, addNewTask])
  }

  //Toggle done
  const toggleDone = (toggleDoneId) =>  {
    setTasks(
      tasks.map((task) => 
      task.id === toggleDoneId ? {...task, isDone: !task.isDone}: task)
    )
  }
  //Show add task
  const toggleShow = () => setShowAddTask(!showAddTask)




  return (
    <div className="container">
      <Header title="TASK TRACKER" showAddTask={showAddTask} toggleShow={toggleShow}/>

      {showAddTask && <AddTask addTask={addTask}/>}

      {tasks.length > 0 ? (
        <Tasks tasks={tasks} deleteTask={deleteTask} toggleDone={toggleDone}/>

      ) : (<p style={{textAlign:"center"}}>No Task To Show</p>)}
    </div>
  );
}

export default App;
