import React, {useContext, useState,useEffect} from 'react';
import "./DetailAddNote.css";
import {taskContext} from "../../context/taskContext";
import useFirestore from "../../hooks/useFirestore";

const DetailAddNote = () => {
    const {task} = useContext(taskContext);
    const {updateDocument} = useFirestore("tasks");
    const [note, setNote] = useState(String(task.note));

    const addNote = async (id) => {
        if (note !== "") {
            await updateDocument(id, {
                note: note
            })
        }
    }

    useEffect(() => {
        setNote(task.note)
    }, [task.note]);

    return (
        <div className="add-note">
              <textarea
                  className="add-note__textarea"
                  placeholder="Add note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
              />
            <button className="add-note__button" onClick={() => addNote(task.id)}>Add Note</button>
        </div>
    );
};

export default DetailAddNote;
