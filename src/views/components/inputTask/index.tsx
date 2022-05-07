import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

interface InputTaskProps {
    id: string,
    title: string,
    onDone: (id: string) => void,
    onEdit: (id: string, title: string) => void,
    onRemove: (id: string) => void,
}

export const InputTask: React.FC<InputTaskProps>= ({
    id,
    title,
    onDone,
    onEdit,
    onRemove,
}) => {

    const [checked, setChecked] = useState (false)
    const [isEditMode, setisEditMode] = useState (false)
    const [value, setValue] = useState (title)
    const editTitleInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isEditMode) {
            editTitleInputRef?.current?.focus()
        }
    }, [isEditMode])

    return (
        <div className={styles.InputTask }>
            <label className={styles.InputTaskLabel}>
                <input type="checkbox" disabled={isEditMode} checked={checked} className={styles.InputTaskCheckBox} onChange={(evt) => {
                    setChecked(evt.target.checked)

                    if (evt.target.checked) {
                        onDone(id) 
                    }
                }}/>
                {isEditMode ? (
                    <input
                        value={value}
                        ref={editTitleInputRef}
                        onChange={(evt) => {
                            setValue((evt.target.value))
                        }}
                        onKeyDown= {(evt) => {
                            if (evt.key === 'Enter') {
                                onEdit(id, value)
                                setisEditMode(false)
                            }
                        }}
                        className={styles.InputTaskEditTitle}
                    />
                ) : (
                    <h3 className={styles.InputTaskTitle}>{title}</h3>
                )}
            </label>
                
                {isEditMode 
                    ? 
                    (
                        <button aria-label="Save" className={styles.InputTaskSave} onClick={() => {
                            onEdit(id, value)
                            setisEditMode(false)
                        }}></button>
                    )   
                    :
                    (
                        <button aria-label="Edit" className={styles.InputTaskEdit} onClick={() => {
                            setisEditMode(true)
                        }}></button>
                    )}
                    <button aria-label="Remove" className={styles.InputTaskRemove} onClick={() => {
                        if (confirm('Are you sure?')) {
                            onRemove(id)
                        }
                    }}></button>
        </div>
    )
};