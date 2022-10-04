import React, {useContext, useState} from 'react';
import {storage} from "../../firebase/firebase.config";
import {ref, uploadBytesResumable, getDownloadURL, deleteObject} from "firebase/storage";
import {taskContext} from "../../context/taskContext";
import useFirestore from "../../hooks/useFirestore";
import "./DetailsAddFile.css";

// icons
import {ReactComponent as AddFileLogo} from "../../assets/images/icons/add-file-logo.svg";
import {ReactComponent as CloseLogo} from "../../assets/images/icons/close-logo.svg";


const DetailsAddFile = () => {
    const {task} = useContext(taskContext);
    const {updateDocument} = useFirestore("tasks");
    const [progress, setProgress] = useState("");

    const uploadFile = (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (file.size > 5000000) return alert("file most be lees then 5 Mb");
        const fileRef = ref(storage, `tasksFiles/${task.userCreator}/${task.id}/${file.name}`);
        const uploadTask = uploadBytesResumable(fileRef, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(String(progress).slice(0, 4) + " %")
            },
            (e) => {
                alert("upload filed")
                console.log(e)
                setProgress("")
                e.target.value = null;
            },
            async () => {
                setProgress("")
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                    await updateDocument(task.id, {
                        file: {
                            downloadURL,
                            name: fileRef.name
                        }
                    })
                    e.target.value = null;
                    alert("file uploaded")
                } catch {
                    e.target.value = null;
                }
            }
        );
    }
    const handleDeleteFile = async () => {
        try {
            await updateDocument(task.id, {
                file: {
                    downloadURL: "",
                    name: ""
                }
            })
            if (task.file.name !== "") {
                const fileRef = ref(storage, `tasksFiles/${task.userCreator}/${task.id}/${task.file.name}`);
                await deleteObject(fileRef)
            }
        } catch (e) {
            alert("delete file filed")
        }

    }
    return (
        <>
            {
                task.file.name !== "" ?
                    <div className="download">
                        <span className="add-file__icon">
                            <AddFileLogo style={{color: "var(--primary-color)"}}/>
                        </span>
                        <a className="add-file__download"
                           style={{color: "var(--primary-color)"}}
                           href={task.file.downloadURL} target="_blank" rel="noreferrer">
                            {`download ${task.file.name}`}
                        </a>
                        <span className="add-toDay__icon" style={{cursor: "pointer"}}
                              onClick={handleDeleteFile}
                        >
                            <CloseLogo style={{color: "#605e5c", width: "12px", height: "12px"}}/>
                        </span>

                    </div> :
                    <div className="add-file p-relative">
                        <span className="add-file__icon">
                            <AddFileLogo/>
                        </span>
                        <input type="file" className="add-file__input"
                               onChange={uploadFile}
                        />
                        <p className="add-file__title"
                           style={{color: progress !== "" ? "var(--primary-color)" : ""}}
                        >{progress !== "" ? progress : "Add file"}</p>
                    </div>
            }
        </>
    );
};

export default DetailsAddFile;
