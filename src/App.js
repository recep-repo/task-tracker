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
    const {data} = await axios.get(baseUrl)
    setTasks(data)
    
  }
  useEffect(() => {
    fetchTasks()
  }, [])


  const addTask = async (newTask) => {
    await axios.post(baseUrl, newTask)
    fetchTasks()
  }

  const deleteTask =async (deletedTaskId) => {
    await axios.delete(`${baseUrl}/${deletedTaskId}`)
    fetchTasks()
  }

  const toggleDone = async (toggleDoneId) => {
    const {data} = await axios.get(`${baseUrl}/${toggleDoneId}`)
    const updateTask = {...data, isDone: !data.isDone}
    await axios.put(`${baseUrl}/${toggleDoneId}`, updateTask)
    fetchTasks()
    

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
