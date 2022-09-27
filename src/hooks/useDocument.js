import {db} from "../firebase/firebase.config";
import {addDoc, collection} from "firebase/firestore";

const useDocument = (collectionName) => {
    const collRef = collection(db, collectionName)

    const createDocument = async (document) => {
        try {
            return await addDoc(collRef, document);
        } catch (e) {
            console.log(e)
            alert(e.message)
        }
    }

    return {createDocument}
}


export default useDocument;