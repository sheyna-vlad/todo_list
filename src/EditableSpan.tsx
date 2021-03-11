import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMod, setEditMod] = useState(false);
    let [title, setTitle] = useState('');

    const activateEditMod = () =>{
        setEditMod(true)
        setTitle(props.title)
    };
    const activateViewMod = () =>{
        setEditMod(false)
        props.onChange(title)
    };
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    return (editMod
        ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMod} autoFocus/>
        : <span onDoubleClick={activateEditMod}>{props.title}</span>
    )
}