import {useContext, useEffect, useRef, useState} from "react";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../firebase/firebase.config";
import {userContext} from "../context/userContext";


const useSingUp = (password, email, confirmPassword, userName) => {
    const [errors, setErrors] = useState({
        userName: undefined,
        email: undefined,
        password: undefined,
        confirmPassword: undefined
    });
    const [isPending, setIsPending] = useState(false);
    const [fireBaseError, setFireBaseError] = useState("");
    const {userComeIn} = useContext(userContext);

    const isError = useRef(false);

    useEffect(() => {
        const getFormErrors = (password, email, confirmPassword, userName) => {
            setErrors({
                userName: undefined,
                email: undefined,
                password: undefined,
                confirmPassword: undefined
            })
            isError.current = false
            if (userName) {
                if (userName.trim().length < 6) {
                    setErrors((prevState) => {
                        return {
                            ...prevState,
                            userName: "userName is to short",
                        }
                    })
                    isError.current = true
                }
            }
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
            if (confirmPassword) {
                if (password !== confirmPassword) {
                    setErrors((prevState) => {
                        return {
                            ...prevState,
                            confirmPassword: "password and confirm password dose not match",
                        }
                    })
                    isError.current = true
                }
            }
        }
        getFormErrors(password, email, confirmPassword, userName)
    }, [password, email, confirmPassword, userName]);

    const handleSingUp = async () => {
        setIsPending(true)
        setFireBaseError("")
        if (!isError.current) {
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password)
                await updateProfile(auth.currentUser, {
                    displayName: userName
                })
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


    return {handleSingUp, errors, isPending, fireBaseError}
}


export default useSingUp;