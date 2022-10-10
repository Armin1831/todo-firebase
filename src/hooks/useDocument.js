import {useEffect, useState} from "react";
import {db} from "../firebase/firebase.config";
import {collection, onSnapshot, doc} from "firebase/firestore";


const useDocument = (collectionName, id) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const collRef = collection(db, collectionName)
        const document = doc(collRef, id)

        const unsubscribe = onSnapshot(document, (querySnapshot) => {
            try {
                if (querySnapshot.data()) {
                    setData({...querySnapshot.data(), id: querySnapshot.id})
                    setError("")
                }
                if (!querySnapshot.data()) throw new Error("no data found")
            } catch (e) {
                setError(e.message)
            }
        }, (error) => {
            setError(error.message)
        });


        return () => unsubscribe()

    }, [collectionName, id]);

    return {data, error}
}


export default useDocument;