import { useState } from 'react';

import styles from './TaskComponent.module.css';

const TaskComponent = () => {
    
    const [inputContentValue, setInputContentValue] = useState(['']);
    const [inputPriorityValue, setInputPriorityValue] = useState('');
    
    const [tasks, setTasks] = useState([
        {
            content: 'Wyprowadzić psa na spacer', 
            priority: 12,
            priorityName: "heigh"
        },
        {
            content: 'Zrobić zakupy', 
            priority: 12,
            priorityName: "heigh"
        }
    ]);
    
    const addTask = (contentValue, priorityValue) => {
        if(contentValue != "" && priorityValue != "none"){
            let priorityNameValue;
            if(priorityValue == 3){
                priorityNameValue = "small";
            }
            else if(priorityValue == 6){
                priorityNameValue = "normal";
            }
            else if(priorityValue == 9){
                priorityNameValue = "medium";
            }
            else if(priorityValue == 12){
                priorityNameValue = "high";
            }

            const task = {
                content: contentValue,
                priority: parseInt(priorityValue),
                priorityName: priorityNameValue,
            }
            setTasks((previousTasks) => [...previousTasks, task]);
            setInputContentValue("");
            setInputPriorityValue("none");
        }
    }
    
    const deleteTask = (value) => {
        console.log(value);
        setTasks(tasks.filter(task => task !== value.task));
    }

    const handleChangeContentValue = (event) => {
        setInputContentValue(event.target.value);
    }

    
    const handleChangePriorityValue = (event) => {
        setInputPriorityValue(event.target.value);
    }
    
    return (
        <div className={`${styles.TaskComponent}`}>
            <h2> Create your the future with <span className={`${styles.text_blue}`}>myTask.com</span></h2>
            
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

            <span className={`${styles.blue_title}`}> My tasks </span>

            {
                tasks.sort( (a,b) => {return b.priority - a.priority}),
                tasks.map((task, index) => (
                    <div className={`${styles.task}`} key={index}>
                        <p> Task priority: {task.priorityName} </p>
                        <p> {task.content} </p>
                        <button onClick={ () => deleteTask({task})}> Make as completed </button>
                    </div>
                ))
            }
        </div>
    );
}
 
export default TaskComponent;