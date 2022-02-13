const TaskList = ({ tasks, onDelete, styles }) => {
    return (
            tasks.sort( (a,b) => {return b.priority - a.priority}),
            tasks.map((task, index) => (
                <div className={`${styles.task}`} key={index}>
                    <p> Task priority: {task.priorityName} </p>
                    <p> {task.content} </p>
                    <button onClick={ () => onDelete({task})}> Make as completed </button>
                </div>
            ))
    );
}

export default TaskList;