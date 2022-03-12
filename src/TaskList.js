import { BiPencil, BiCheck } from 'react-icons/bi';

const TaskList = ({ tasks, onDelete, styles }) => {
    return (
            tasks.sort( (a,b) => {return b.priority - a.priority}),
            tasks.map((task, index) => (
                
                <div className={styles.task} key={index}>
                    <div className={styles.editTask}>
                        <div className={styles.editTaskIcon}>
                            <BiPencil /> 
                        </div>
                    </div>
                    <div className={styles.priority}>
                        {task.priorityName}
                    </div>
                    
                    <div className={styles.taskContent}> {task.content} </div>
                    
                    <button onClick={ () => onDelete({task})}> <span className={styles.acceptIcon}> <BiCheck /> </span> Complete </button>
                </div>
            ))
    );
}

export default TaskList;