import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';

export type AddItemFormPropsType = {
    addItem: (title: string) => void

}

export const AddItemForm = React.memo ((props: AddItemFormPropsType) => {

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
            <TextField
                label={"Title"}
                variant={"outlined"}
                value={title}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onNewTitleKeyPressHandler}
                error={!!error}
                helperText={error}
            />


            <IconButton onClick={addTask} color={"primary"}>
                <AddBoxRoundedIcon/>
            </IconButton>

        </div>
    )
})