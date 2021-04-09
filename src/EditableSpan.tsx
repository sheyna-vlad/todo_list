import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    let [editMod, setEditMod] = useState(false);
    let [title, setTitle] = useState('');

    const activateEditMod = () => {
        setEditMod(true)
        setTitle(props.title)
    };
    const activateViewMod = () => {
        setEditMod(false)
        props.onChange(title)
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (editMod
            ? <TextField label={"RER"} variant={"standard"} color={"secondary"} value={title}
                         onChange={onChangeTitleHandler} onBlur={activateViewMod} autoFocus/>
            : <span onDoubleClick={activateEditMod}>{props.title}</span>
    )
})