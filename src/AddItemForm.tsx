import React, {ChangeEvent, KeyboardEvent, useState} from "react";

 export type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onNewTitleKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            props.addItem(title);
            setTitle('');
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required')
        }

    }


    return (
        <div>
            <input
                value={title}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onNewTitleKeyPressHandler}
                className={error ? 'error' : ''}/>
            <button onClick={addTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    )
}