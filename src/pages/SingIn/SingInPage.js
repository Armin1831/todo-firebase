import React, {useContext, useEffect, useState} from 'react';
import "./SingInPage.css";
import useSingIn from "../../hooks/useSingIn";
import {userContext} from "../../context/userContext";
import {Link, useNavigate} from "react-router-dom";


const SingInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {errors, isPending, handleSingIn} = useSingIn(password, email)
    const {user} = useContext(userContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (user.user) {
            navigate("/tasks/inbox")
        }
    }, [user, navigate]);

    const handleUserSingIn = async (e) => {
        e.preventDefault()
        await handleSingIn()
    }

    return (
        <>
            <div style={{overflowY:"scroll",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",background: "#0078d7"}}>
                <div className="main-w3layouts wrapper" style={{minWidth:"78rem"}}>
                    <h1>Sign In</h1>
                    <div className="main-agileinfo">
                        <div className="agileits-top">
                            <form action="#" method="post" onSubmit={handleUserSingIn}>
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
                                <input type="submit" value={isPending ? "isPending" : "sing in"} disabled={isPending}/>
                            </form>
                            <p>
                                Don't have an Account? <Link to="/sing-up">sing up Now!</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default SingInPage;
