import { useEffect, useState } from 'react';

import styles from './TaskComponent.module.css';
import TaskList from './TaskList';

const TaskComponent = () => {
    
    const [inputContentValue, setInputContentValue] = useState(['']);
    const [inputPriorityValue, setInputPriorityValue] = useState('');
    
    const [tasks, setTasks] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [errMessage, setErrorMessage] = useState(null);

    const addTask = (contentValue, priorityValue) => {
        if(contentValue !== "" && priorityValue !== "none"){
            let priorityNameValue;
            if(priorityValue === 3){
                priorityNameValue = "small";
            }
            else if(priorityValue === 6){
                priorityNameValue = "normal";
            }
            else if(priorityValue === 9){
                priorityNameValue = "medium";
            }
            else if(priorityValue === 12){
                priorityNameValue = "high";
            }

            const task = {
                content: contentValue,
                priority: parseInt(priorityValue),
                priorityName: priorityNameValue,
            }
            setTasks((previousTasks) => [...previousTasks, task]);

            fetch('http://localhost:8000/tasks', {
                method: 'POST',
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify(task)
            }).then(() => {
                console.log("new task added");
            })

            setInputContentValue("");
            setInputPriorityValue("none");
        }
    }
    
    const deleteTask = (value) => {
        console.log(value.task.id);

        fetch('http://localhost:8000/tasks/'+value.task.id, {
            method: 'DELETE',
        }).then(() => {
            console.log("Task deleted successful");
        })
        
        setTasks(tasks.filter(task => task !== value.task));
    }

    const handleChangeContentValue = (event) => {
        setInputContentValue(event.target.value);
    }
    
    const handleChangePriorityValue = (event) => {
        setInputPriorityValue(event.target.value);
    }
    
    useEffect(() => {
        fetch('http://localhost:8000/tasks')
            .then(res => {
                if(res.ok !== true){
                   throw Error("Error with featching data from this source.");
                }
                return res.json();
            })
            .then(data => {
                setTasks(data);
                setIsPending(false);
                setErrorMessage(null);
            })
            .catch((err) => {
                setIsPending(false);
                setErrorMessage(err.message);
            })
    }, []);

    
    return (

        <div className={styles.TaskComponent}>
            <h2> Create your future with <span className={styles.text_blue}>myTask.com</span></h2>
            
            <p>Content
                <input onChange={handleChangeContentValue} value={inputContentValue}/>
            </p>

            <p>Priority
                <select onChange={handleChangePriorityValue} value={inputPriorityValue}>
                    <option value="none">Choose priority...</option>
                    <option value="12">High priority</option>
                    <option value="9">Medium priority</option>
                    <option value="6">Normal priority</option>
                    <option value="3">Small priority</option>
                </select>
            </p>

            <button onClick={ () => addTask(inputContentValue, inputPriorityValue)}> Create task </button>

            <span className={styles.blue_title}> My tasks </span>
            {   errMessage && <div> { errMessage } </div>}
            {   isPending && <div> Loading... </div>  }
            {   tasks && <TaskList tasks={ tasks } onDelete={deleteTask} styles={styles} ></TaskList>   }
        </div>
    );
}
 
export default TaskComponent;