import {useEffect, useState} from "react";
import {db} from "../firebase/firebase.config";
import {collection, onSnapshot, doc} from "firebase/firestore";


const useCollection = (collectionName, id) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const collRef = collection(db, collectionName)
        const document = doc(collRef, id)

        const unsubscribe = onSnapshot(document, (querySnapshot) => {
            if (querySnapshot.data()) {
                setData({...querySnapshot.data(), id: querySnapshot.id})
                setError("")
            }
        }, (error) => {
            setError("failed to get document")
            console.log(error.message)
        });

        return () => unsubscribe()

    }, [collectionName, id]);

    return {data, error}
}


export default useCollection;