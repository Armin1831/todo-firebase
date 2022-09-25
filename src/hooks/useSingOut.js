import {useContext, useState} from "react";
import {signOut} from "firebase/auth";
import {auth} from "../firebase/firebase.config";
import {userContext} from "../context/userContext";


const useSingOut = () => {
    const [isPending, setIsPending] = useState(false);
    const {userComeOut} = useContext(userContext);

    const handleSingOut = async () => {
        setIsPending(true)
        try {
            await signOut(auth)
            userComeOut()
            setIsPending(false)
            alert("you are successfully sing out")
        } catch (e) {
            setIsPending(false)
            alert(e.message)
        }
        setIsPending(false)
    }


    return {handleSingOut, isPending}
}


export default useSingOut;