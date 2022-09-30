import {db} from "../firebase/firebase.config";
import {addDoc, collection, doc, updateDoc,deleteDoc } from "firebase/firestore";

const useFirestore = (collectionName) => {
    const collRef = collection(db, collectionName)

    const createDocument = async (document) => {
        try {
            return await addDoc(collRef, document);
        } catch (e) {
            console.log(e.message)
            alert(e.message)
        }
    }
    const updateDocument = async (id, document) => {
        const docRef = doc(collRef, id);
        try {
            await updateDoc(docRef, document);
        } catch (e) {
            console.log(e.message)
            alert(e.message)
        }
    }
    const deleteDocument = async (id) => {
        const docRef = doc(collRef, id);
        try {
            await deleteDoc(docRef);
        } catch (e) {
            console.log(e.message)
            alert(e.message)
        }
    }

    return {createDocument, updateDocument, deleteDocument}
}


export default useFirestore;