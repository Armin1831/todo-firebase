import {useEffect, useState, useRef} from "react";
import {db} from "../firebase/firebase.config";
import {collection, query, where, onSnapshot, orderBy} from "firebase/firestore";

const useCollection = (collectionName, _queryWhere, _orderByWhat) => {
    const [docs, setDocs] = useState([]);
    const [error, setError] = useState("");

    const queryWhere = useRef(_queryWhere).current
    const orderByWhat = useRef(_orderByWhat).current


    useEffect(() => {
        const collRef = collection(db, collectionName)
        const q = query(collRef, where(...queryWhere), orderBy(...orderByWhat));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({
                    ...doc.data(),
                    id: doc.id
                });
            });
            setDocs(data)
            setError("")
        }, (error) => {
            setError(error)
            console.log(error.message)
        });

        return () => unsubscribe()

    }, [collectionName, queryWhere, orderByWhat]);

    return {docs, error}
}


export default useCollection;