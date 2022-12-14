import {useContext, useEffect, useRef, useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase/firebase.config";
import {userContext} from "../context/userContext";


const useSingIn = (password, email) => {
    const [errors, setErrors] = useState({
        email: undefined,
        password: undefined,
    });
    const [isPending, setIsPending] = useState(false);
    const [fireBaseError, setFireBaseError] = useState("");
    const {userComeIn} = useContext(userContext);

    const isError = useRef(false);

    useEffect(() => {
        const getFormErrors = (password, email) => {
            setErrors({
                email: undefined,
                password: undefined
            })
            isError.current = false
            if (email) {
                if (!String(email)
                    .toLowerCase()
                    .match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    )) {
                    setErrors((prevState) => {
                        return {
                            ...prevState,
                            email: "wrong email format",
                        }
                    })
                    isError.current = true
                }
            }
            if (password) {
                if (!String(password)
                    .toLowerCase()
                    .match(
                        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
                    )) {
                    setErrors((prevState) => {
                        return {
                            ...prevState,
                            password: "The password must be at least six characters long and symbols",
                        }
                    })
                    isError.current = true
                }
            }
        }
        getFormErrors(password, email)
    }, [password, email]);


    const handleSingIn = async () => {
        setIsPending(true)
        setFireBaseError("")
        if (!isError.current) {
            try {
                const res = await signInWithEmailAndPassword(auth, email, password)
                setIsPending(false)
                userComeIn(res.user)
                alert("you are successfully sing up")
                return res.user;
            } catch (e) {
                setFireBaseError(e.message)
                setIsPending(false)
                alert(e.message)
            }
        }
        setIsPending(false)
    }


    return {handleSingIn, errors, isPending, fireBaseError}
}


export default useSingIn;