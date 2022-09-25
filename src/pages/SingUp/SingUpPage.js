import React, {useContext, useEffect, useState} from 'react';
import "./SingUpPage.css";
import {userContext} from "../../context/userContext";
import {Link, useNavigate} from "react-router-dom";
import useSingUp from "../../hooks/useSingUp";


const SingUpPage = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {errors, handleSingUp, isPending} = useSingUp(password, email, confirmPassword, userName)
    const {user} = useContext(userContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (user.user) {
            navigate("/tasks/inbox")
        }
    }, [user, navigate]);

    const handleUserSingUp = async (e) => {
        e.preventDefault()
        await handleSingUp()
    }

    return (
        <>
            <div className="main-w3layouts wrapper" style={{overflowY: "scroll", height: "100%",background: "#0078d7"}}>
                <h1>Sign Up</h1>
                <div className="main-agileinfo">
                    <div className="agileits-top">
                        <form action="#" method="post" onSubmit={handleUserSingUp}>
                            <label form="Username" className="label">Username</label>
                            <input
                                className="text"
                                type="text"
                                name="Username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            {errors.userName && <p className="error">{errors.userName}</p>}
                            <label form="email" className="label">Email</label>
                            <input
                                className="text email"
                                type="text"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <p className="error">{errors.email}</p>}
                            <label form="password" className="label">Password</label>
                            <input
                                className="text"
                                type="text"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password && <p className="error">{errors.password}</p>}
                            <label form="password" className="label">Confirm Password</label>
                            <input
                                className="text w3lpass"
                                type="text"
                                name="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                            <input type="submit" value={isPending ? "isPending" : "sing up"} disabled={isPending}/>
                        </form>
                        <p>
                            Don't have an Account? <Link to="/sing-in">sing in Now!</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>

    );
};

export default SingUpPage;
