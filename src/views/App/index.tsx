import React, { useEffect } from "react";
import { useToDoStore } from "../../data/stores/useToDoStore"; 
import { InputPlus } from "../components/inputplus";
import { InputTask } from "../components/inputTask";
import styles from './index.module.scss'



export const App: React.FC = () => {
    const [tasks, createTask, updateTask, removeTask] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
    ])

    console.log(tasks);
    
    
    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do App</h1>
            <section className={styles.articleSection}>
                <InputPlus onAdd={(title) => {
                    if (title) {
                        createTask(title)
                    }
                }}></InputPlus>
            </section>

            <section className={styles.articleSection}>
                {!tasks.length && (
                    <p className={styles.articleText}>There is no one task.</p>
                )}
                {tasks.map((task) => (
                    <InputTask key={task.id} id={task.id} title={task.title} onDone={removeTask} onEdit={updateTask} onRemove={removeTask}></InputTask>
                ))}
            </section>
        </article>
    )
}