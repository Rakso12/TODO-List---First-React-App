import { useState } from 'react';

import styles from './TaskComponent.module.css';

const TaskComponent = () => {
    
    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState([]);
    
    const addTask = (task) => {
        if(task != ""){
            setTasks((previousTasks) => [...previousTasks, task]);
            setInputValue("");
        }
    }
    
    const deleteTask = (value) => {
        console.log(value);
        setTasks(tasks.filter(task => task !== value.task));
    }

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    return (
        <div className={`${styles.TaskComponent}`}>
            <h2> Create your the future with <span className={`${styles.text_blue}`}>myTask.com</span></h2>
            <button onClick={ () => addTask(inputValue)}> Create task </button>

            <input onChange={handleChange} value={inputValue}/>

            {tasks.map((task, index) => (
                <div className={`${styles.task}`} key={index}>
                    <p> Task - {index + 1} </p>
                    <p> {task} </p>
                    <button onClick={ () => deleteTask({task})}> Make as completed </button>
                </div>
            ))}
        </div>
    );
}
 
export default TaskComponent;